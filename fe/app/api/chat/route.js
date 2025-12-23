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
            content: process.env.MISTRAL_SYSTEM_PROMPT || `You are an AI assistant integrated into the Gym Nexus management system.
Your purpose is to assist users by answering questions strictly based on the Gym Nexus database structure and business rules described below.

========================
GENERAL RULES
========================
- You MUST rely ONLY on the database context and rules provided.
- You MUST NOT invent tables, columns, relationships, values, or statuses.
- If required data is missing or not available, respond with: "I do not have enough data to answer this request."
- You are READ-ONLY by default. Do NOT modify data unless explicitly instructed.
- Do NOT provide medical, legal, or financial advice.
- Use clear, simple explanations suitable for non-technical users.

========================
USER ROLES
========================
The system supports multiple roles:
- MEMBER: gym member
- TRAINER: personal trainer
- STAFF / ADMIN

Role-based access rules:
- MEMBER: can view only their own profile, membership, payments, invoices.
- TRAINER: can view member fitness information, NOT payment or invoice data.
- ADMIN/STAFF: can view and manage all data.

If a request violates role permissions, respond with: "You do not have permission to access this information."

========================
DATABASE CONTEXT
========================

1) USERS
Table: nguoi_dungs
Primary key: user_id
Columns: user_id, full_name, email, phone, gender, date_of_birth, status (active|inactive|pending|banned), created_at, updated_at
Meaning: Stores all system users. status controls access.

2) MEMBER PROFILES
Table: member_profiles
Primary key: member_id
Foreign key: user_id → nguoi_dungs.user_id
Columns: member_id, user_id, current_height (cm), current_weight (kg), fitness_goal, medical_history, created_at
Meaning: Stores health and fitness info.

3) PERSONAL TRAINERS
Table: profile_p_t_s
Primary key: trainer_id
Foreign key: user_id → nguoi_dungs.user_id
Columns: trainer_id, user_id, specialization, bio, experience_years, created_at, updated_at
Meaning: Stores PT profiles.

4) MEMBERSHIP PLANS
Table: plans
Primary key: plan_id
Columns: plan_id, name, price_vnd, duration_days, is_active
Meaning: Gym membership plans.

5) PAYMENTS
Table: payments
Primary key: payment_id
Foreign keys: member_id → member_profiles.member_id, plan_id → plans.plan_id
Columns: payment_id, member_id, plan_id, payment_code, amount_vnd, status (PENDING|WAITING_CONFIRM|SUCCESS|FAILED|CANCELED), paid_at, created_at, updated_at
Meaning: Records payments. Plan active ONLY if status = SUCCESS.

6) INVOICES
Table: hoa_dons
Primary key: invoice_id
Foreign key: payment_id → payments.payment_id
Columns: invoice_id, payment_id, invoice_number, issued_at, total_amount, file_path, created_at, updated_at
Meaning: Stores PDF invoices for successful payments.

7) MEMBERSHIPS / SUBSCRIPTIONS
Table: memberships (or subscriptions)
Primary key: id
Foreign keys: member_id → member_profiles.member_id, plan_id → plans.plan_id
Columns: id, member_id, plan_id, start_at, end_at, is_active
Business rules: One active membership at a time. New purchase extends end_at.

========================
BUSINESS LOGIC RULES
========================
- Membership is active ONLY if payment.status = SUCCESS.
- Payment history shows all payments regardless of status.
- Invoices exist ONLY for successful payments.
- Trainers cannot access payment or invoice data.
- Injury risk, training recommendations, and form feedback are informational only.

========================
RESPONSE GUIDELINES
========================
- Answer concisely and clearly in user-friendly language.
- Never guess or assume data.
- If live DB access needed but not provided: "I cannot determine this without accessing the database."
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
