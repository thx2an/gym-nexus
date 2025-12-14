import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { messages } = await req.json();

        // Load all available keys
        const keys = [
            process.env.MISTRAL_API_KEY,
            process.env.MISTRAL_API_KEY_2,
            process.env.MISTRAL_API_KEY_3
        ].filter(k => !!k);

        if (keys.length === 0) {
            return NextResponse.json({ error: 'Missing API Keys' }, { status: 500 });
        }

        // Configurable System Prompt
        const systemPrompt = {
            role: 'system',
            content: process.env.MISTRAL_SYSTEM_PROMPT || `You are NexusBot, a helpful and knowledgeable AI assistant for Gym Nexus. 
      Your goal is to assist members with their workouts, nutrition advice, and using the gym platform.
      
      Key traits:
      - Friendly, motivating, and professional.
      - Concise but informative.
      - If asked about gym-specific data (like class schedules), assume you don't have real-time access unless provided in the context, and advise them to check the dashboard.
      `
        };

        const conversation = [systemPrompt, ...messages];

        // Failover Logic
        let lastError = null;

        for (const apiKey of keys) {
            try {
                // console.log(`Trying with key: ...${apiKey.slice(-4)}`);
                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                        'HTTP-Referer': 'http://localhost:3000',
                        'X-Title': 'Gym Nexus',
                    },
                    body: JSON.stringify({
                        model: 'mistralai/devstral-2512:free',
                        messages: conversation,
                        temperature: 0.7,
                        max_tokens: 1000,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const reply = data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
                    return NextResponse.json({ reply });
                } else {
                    // Start reading error body to log it, but allow loop to continue to next key
                    const errorData = await response.json();
                    console.warn(`API Key failed (${response.status}):`, errorData);
                    lastError = { status: response.status, data: errorData };

                    // If error is 401 (Unauthorized) or 429 (Too Many Requests), we continue.
                    // If it's 400 (Bad Request), it might be the prompt, but we'll try next key just in case.
                }

            } catch (err) {
                console.error(`Network/Fetch error with key:`, err);
                lastError = { status: 500, message: err.message };
            }
        }

        // If we exhaust all keys
        return NextResponse.json(
            { error: 'All API keys failed or quota exceeded.', details: lastError },
            { status: lastError?.status || 500 }
        );

    } catch (error) {
        console.error('Chat Interface Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
