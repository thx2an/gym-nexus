<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\GoiTap;

class GoiTapController extends Controller
{
    public function index()
    {
        // #region agent log
        $debugLogPath = storage_path('logs/debug.log');
        $logPayload = json_encode(['location'=>'GoiTapController.php:12','message'=>'Public endpoint accessed - logging test','data'=>['endpoint'=>'/goi-tap','time'=>date('Y-m-d H:i:s')],'timestamp'=>round(microtime(true)*1000),'sessionId'=>'debug-session','hypothesisId'=>'TEST']);file_put_contents($debugLogPath,$logPayload."\n",FILE_APPEND);
        // #endregion

        $packages = GoiTap::where('is_active', 1)->get();
        return response()->json([
            'success' => true,
            'data' => $packages
        ]);
    }

    public function currentMembership(Request $request)
    {
        $user = $request->user();
        if (!$user->memberProfile) {
            return response()->json([
                'success' => true,
                'data' => ['status' => 'None']
            ]);
        }

        $memberId = $user->memberProfile->member_id;

        // Find latest active membership
        $membership = \App\Models\GoiHang::where('member_id', $memberId)
            ->where('status', 'Active')
            ->where('end_date', '>=', now())
            ->orderBy('end_date', 'desc')
            ->first();

        if (!$membership) {
            return response()->json([
                'success' => true,
                'data' => ['status' => 'None'] // Or Expired if we check history
            ]);
        }

        // Get Package Details
        $package = \App\Models\GoiTap::find($membership->package_id);

        $daysRemaining = \Carbon\Carbon::now()->diffInDays(\Carbon\Carbon::parse($membership->end_date), false);

        return response()->json([
            'success' => true,
            'data' => [
                'status' => 'Active',
                'packageName' => $package ? $package->name : 'Unknown',
                'startDate' => $membership->start_date,
                'endDate' => $membership->end_date,
                'daysRemaining' => (int)$daysRemaining,
                'autoRenew' => false
            ]
        ]);
    }

    public function confirmPayment(Request $request)
    {
        $user = $request->user();

        // VALIDATION: Check Member Profile
        if (!$user->memberProfile) {
            return response()->json(['success' => false, 'message' => 'Please update your profile first (Height/Weight).'], 400);
        }
        $memberId = $user->memberProfile->member_id;

        $packageId = $request->input('package_id');
        $package = GoiTap::find($packageId);

        if (!$package) {
            return response()->json(['success' => false, 'message' => 'Package not found'], 404);
        }

        try {
            // 1. Create/Update Membership (GoiHang)
            $startDate = now();
            $endDate = now()->addDays((int)$package->duration_days);

            $membership = \App\Models\GoiHang::create([
                'member_id' => $memberId,
                'package_id' => $packageId,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'Active'
            ]);

            // 2. Create Payment Record (ThanhToan)
            $payment = \App\Models\ThanhToan::create([
                'member_id' => $memberId,
                'amount'    => $package->price,
                'currency'  => 'VND',
                'status'    => 'Success', // Changed from completed to match frontend badge
                'method'    => 'qr_bank_transfer',
                'gateway'   => 'manual',
                'gateway_transaction_id' => 'QR-' . time(),
                'membership_id' => $membership->membership_id,
                'session_id' => null, // No session
            ]);

            // 3. Create Invoice Record (HoaDon)
            \App\Models\HoaDon::create([
                'payment_id' => $payment->payment_id,
                'invoice_number' => 'INV-' . strtoupper(uniqid()),
                'issued_at' => now(),
                'total_amount' => $payment->amount,
                'file_path' => null // Can be populated if we generate PDF later
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Payment confirmed successfully!',
                'data' => $membership
            ]);
        } catch (\Exception $e) {
            // #region agent log
            $debugLogPath = storage_path('logs/debug.log');
            $logPayload = json_encode(['location'=>'GoiTapController.php:122','message'=>'Payment error - trace hidden now','data'=>['errorMessage'=>$e->getMessage()],'timestamp'=>round(microtime(true)*1000),'sessionId'=>'debug-session','hypothesisId'=>'D','runId'=>'post-fix']);file_put_contents($debugLogPath,$logPayload."\n",FILE_APPEND);
            // #endregion

            // FIX: Don't expose stack trace to client - log it instead
            \Log::error('Payment Error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            
            return response()->json([
                'success' => false,
                'message' => 'Payment processing failed. Please try again later.'
            ], 500);
        }
    }
}
