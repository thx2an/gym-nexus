<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhanTichRuiRoController extends Controller
{
    public function calculate(Request $request)
    {
        $data = $request->validate([
            'trainingLoad' => 'required|integer|min:1|max:10', // RPE
            'frequency'    => 'required|integer|min:1|max:7',
            'soreness'     => 'required|integer|min:1|max:10',
            'sleep'        => 'required|integer|min:0|max:24',
            'duration'     => 'required|integer|min:1|max:300', // Minutes
        ]);

        $rpe = $data['trainingLoad'];
        $frequency = $data['frequency'];
        $soreness = $data['soreness'];
        $sleep = $data['sleep'];
        $duration = $data['duration'];

        // --- 1. SESSION LOAD ---
        // Formula: Duration (min) * RPE
        // e.g. 60 min * 5 RPE = 300 AU (Arbitrary Units)
        $sessionLoad = $duration * $rpe;

        // --- 2. ACWR (Acute:Chronic Workload Ratio) ---
        // Acute Load (7 days) = Session Load * Frequency
        $acuteLoad = $sessionLoad * $frequency;

        // Chronic Load (28 days)
        // Since we don't have history, we assume Chronic ~ Acute (Ratio = 1.0)
        // OR we could estimate Chronic based on a heuristic. For now, use Acute as baseline.
        $chronicLoad = $acuteLoad;

        // ACWR = Acute / Chronic
        // If Chronic is 0 (new user), guard div by zero
        $acwr = $chronicLoad > 0 ? ($acuteLoad / $chronicLoad) : 0;

        // --- 3. RULE-BASED ADJUSTMENTS ---
        // Base Threshold for Spike
        $spikeThreshold = 1.3; // Default safe limit

        // Adjust threshold based on Recovery Metrics (Sleep & Soreness)
        if ($sleep < 6) {
            $spikeThreshold -= 0.1; // Reduce tolerance if sleep deprived
        }
        if ($soreness > 5) {
            $spikeThreshold -= 0.1; // Reduce tolerance if sore
        }
        if ($soreness > 8) {
            $spikeThreshold -= 0.2; // Significant reduction if very sore
        }

        // --- 4. RISK CALCULATION (Hybrid Score) ---
        $riskScore = 0;

        // Factor 1: Workload Magnitude (Max 40)
        // Normalize Acute Load. Assume 4000 AU/week is "High" (e.g. 5 days * 100min * 8 RPE = 4000)
        $workloadMagnitude = min(40, ($acuteLoad / 3000) * 40);
        $riskScore += $workloadMagnitude;

        // Factor 2: Recovery Penalty (Max 30)
        $recoveryPenalty = 0;
        if ($sleep < 7) $recoveryPenalty += (7 - $sleep) * 5;
        if ($soreness > 3) $recoveryPenalty += ($soreness - 3) * 3;
        $riskScore += min(30, $recoveryPenalty);

        // Factor 3: ACWR Spike (Max 30)
        // If we had real history, this would be key. For now it's static 1.0/neutral unless logic changes.
        // Let's create a simulated "Warning" if Acute Load is very high relative to "Average User" limits
        // 1.5 Spike -> +20 Risk
        if ($acwr > $spikeThreshold) {
            $riskScore += 20;
        }

        // Visualize "Spike" warning even if ACWR=1 (Simulate Logic check)
        // Ideally we need Past Load input. 

        $riskScore = round(min(100, $riskScore));

        // --- RECOMMENDATIONS ---
        $recommendations = [];
        $analysis = [];

        // ACWR / Load Analysis
        $analysis[] = "Session Load: {$sessionLoad} (RPE x Min)";
        $analysis[] = "Weekly Acute Load: {$acuteLoad}";

        if ($acuteLoad > 3000) {
            $recommendations[] = "High specific volume detected. Ensure adequate calories.";
        }

        // Recovery Rules
        if ($sleep < 6 || $soreness > 6) {
            $recommendations[] = "⚠️ Reduced Threshold: Your recovery is compromised. We lowered the safe workload limit.";
        }

        // Soreness specific
        if ($soreness > 7) {
            $recommendations[] = "High Soreness: Swap heavy lifting for active recovery or mobility work.";
        }

        // Output Status
        $risk = 'Low';
        if ($riskScore >= 75) $risk = 'High';
        else if ($riskScore >= 45) $risk = 'Medium';

        // Generate Recommendations
        $recommendations = [];

        // 1. Specific Metric Warnings
        // Using existing calculated scores for workload, soreness, and sleep impact
        $workloadScore = $workloadMagnitude; // Corresponds to Factor 1
        $sorenessScore = ($soreness > 3) ? ($soreness - 3) * 3 : 0; // Part of recoveryPenalty
        $sleepScore = ($sleep < 7) ? (7 - $sleep) * 5 : 0; // Part of recoveryPenalty

        if ($workloadScore > 30) { // Adjusted threshold for workload magnitude
            $recommendations[] = "Your training load is very high. Consider reducing intensity or frequency.";
        }
        if ($sorenessScore > 10) { // Adjusted threshold for soreness impact
            $recommendations[] = "Significant muscle soreness detected. Focus on active recovery and stretching.";
        }
        if ($sleepScore > 10) { // Adjusted threshold for sleep impact
            $recommendations[] = "Lack of sleep increases injury risk. Aim for at least 8 hours of sleep.";
        }

        // 2. Risk-Level Specific Advice
        if ($risk === 'Low') {
            $recommendations[] = "Low injury risk. You can continue with your current plan.";
            $recommendations[] = "Maintain proper technique, increase load gradually (avoid rapid increase within 1–2 weeks).";
            $recommendations[] = "Warm up for 5–10 minutes and focus on controlling form.";
            $recommendations[] = "Sleep enough and stay hydrated for better recovery.";
            $recommendations[] = "If you feel sharp/unusual pain, stop and check immediately.";
        } elseif ($risk === 'Medium') {
            $recommendations[] = "Medium injury risk. Prioritize recovery and load management.";
            $recommendations[] = "Reduce intensity or volume slightly today (e.g. -10% to -20%).";
            $recommendations[] = "If muscle soreness is high, choose light/technical exercises or light cardio for 15–20 minutes.";
            $recommendations[] = "Increase warm-up time and reduce movement speed to maintain form.";
            $recommendations[] = "Sleep an extra 30–60 minutes if possible and monitor your body for 24–48h.";
        } elseif ($risk === 'High') {
            $recommendations[] = "High injury risk. Reduce load immediately to avoid overtraining.";
            $recommendations[] = "Rest today or do light active recovery (walking, stretching, mobility).";
            $recommendations[] = "Avoid heavy lifts, avoid pushing for PRs; prioritize technique and safe range of motion.";
            $recommendations[] = "If you feel sharp pain, swelling, numbness, or progressive pain: stop training and consider seeing a specialist.";
            $recommendations[] = "Send video/notes to your Personal Trainer for form correction and plan adjustment.";
        }

        if (empty($recommendations)) {
            $recommendations[] = "Your training balance looks good. Keep it up!";
        }
        return response()->json([
            'success' => true,
            'data' => [
                'score' => $riskScore,
                'risk' => $risk,
                'recommendations' => $recommendations,
                'metrics' => [
                    'session_load' => $sessionLoad,
                    'acwr' => round($acwr, 2),
                    'threshold' => $spikeThreshold,
                    'acute_load' => $acuteLoad
                ]
            ]
        ]);
    }
}
