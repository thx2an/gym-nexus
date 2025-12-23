<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ThanhToan;
use App\Models\HoaDon;
use App\Models\MemberProfile;

class PaymentController extends Controller
{
    public function getHistory(Request $request)
    {
        $user = $request->user();

        // Find member profile using user_id
        $memberProfile = MemberProfile::where('user_id', $user->user_id)->first();


        if (!$memberProfile) {
            return response()->json(['success' => true, 'data' => []]);
        }

        $payments = ThanhToan::where('member_id', $memberProfile->member_id)
            ->with(['goiHang.goiTap', 'hoaDon']) // Eager load Package and Invoice
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $payments->map(function ($payment) {
            // Determine invoice URL/ID
            // For now, we assume if hoaDon exists, we can print it via a frontend route /memberships/history/invoice/{id}
            $invoiceUrl = $payment->hoaDon ? "/memberships/history/invoice/" . $payment->hoaDon->invoice_id : null;

            return [
                'id' => $payment->payment_id,
                'date' => $payment->created_at ? $payment->created_at->toIso8601String() : null,
                'amount' => $payment->amount,
                'method' => $payment->method,
                'status' => $payment->status,
                'packageName' => $payment->goiHang && $payment->goiHang->goiTap ? $payment->goiHang->goiTap->name : 'N/A',
                'invoiceUrl' => $invoiceUrl,
                'invoiceId' => $payment->hoaDon ? $payment->hoaDon->invoice_id : null,
                'transactionId' => $payment->payment_id // API expects transactionId for download
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function getInvoice(Request $request, $id)
    {
        $invoice = HoaDon::with(['thanhToan.member.user', 'thanhToan.goiHang.goiTap'])
            ->find($id);

        // #region agent log
        $debugLogPath = storage_path('logs/debug.log');
        $user = $request->user();
        $logPayload = json_encode(['location'=>'PaymentController.php:55','message'=>'Invoice access IDOR check','data'=>['requestUserId'=>$user?->user_id,'invoiceId'=>$id,'invoiceOwnerId'=>$invoice?->thanhToan?->member?->user_id??'null','memberProfileId'=>$user?->memberProfile?->member_id??'null'],'timestamp'=>round(microtime(true)*1000),'sessionId'=>'debug-session','hypothesisId'=>'B','runId'=>'post-fix']);file_put_contents($debugLogPath,$logPayload."\n",FILE_APPEND);
        // #endregion

        if (!$invoice) {
            return response()->json(['success' => false, 'message' => 'Invoice not found'], 404);
        }

        // FIX: IDOR - Verify invoice belongs to current user
        $invoiceOwnerUserId = $invoice->thanhToan?->member?->user_id;
        if (!$invoiceOwnerUserId || (int) $invoiceOwnerUserId !== (int) $user->user_id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }

        // Return details for the printable page
        return response()->json([
            'success' => true,
            'data' => [
                'invoice_number' => $invoice->invoice_number,
                'issued_at' => $invoice->issued_at,
                'total_amount' => $invoice->total_amount,
                'payment_method' => $invoice->thanhToan->method,
                'customer_name' => $invoice->thanhToan->member->user->full_name,
                'customer_email' => $invoice->thanhToan->member->user->email,
                'package_name' => $invoice->thanhToan->goiHang->goiTap->name ?? 'Service',
                'status' => 'Paid' // Invoices usually mean paid, or check payment status
            ]
        ]);
    }
}
