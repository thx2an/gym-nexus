<?php

namespace App\Http\Controllers;

use App\Models\ThanhToan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function revenue(Request $request)
    {
        $fromInput = $request->query('from');
        $toInput = $request->query('to');

        $fromDate = $this->parseDate($fromInput);
        $toDate = $this->parseDate($toInput);

        if ($fromDate && $toDate && $fromDate->gt($toDate)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid date range.',
            ], 422);
        }

        $fromDate = $fromDate?->startOfDay();
        $toDate = $toDate?->endOfDay();

        $paymentQuery = ThanhToan::query()
            ->whereNotNull('membership_id')
            ->whereIn('status', ['Success', 'success']);

        if ($fromDate && $toDate) {
            $paymentQuery->whereBetween('created_at', [$fromDate, $toDate]);
        }

        $totalRevenue = $paymentQuery->sum('amount');

        $packageQuery = DB::table('goi_hangs')
            ->join('goi_hang_nguoi_dungs', 'goi_hangs.package_id', '=', 'goi_hang_nguoi_dungs.package_id')
            ->select(
                'goi_hang_nguoi_dungs.package_id',
                'goi_hang_nguoi_dungs.name',
                'goi_hang_nguoi_dungs.code',
                DB::raw('COUNT(*) as registrations')
            )
            ->groupBy(
                'goi_hang_nguoi_dungs.package_id',
                'goi_hang_nguoi_dungs.name',
                'goi_hang_nguoi_dungs.code'
            )
            ->orderByDesc('registrations');

        if ($fromDate && $toDate) {
            $packageQuery->whereBetween('goi_hangs.created_at', [$fromDate, $toDate]);
        }

        $packages = $packageQuery->get();

        return response()->json([
            'success' => true,
            'data' => [
                'from' => $fromDate?->toDateString(),
                'to' => $toDate?->toDateString(),
                'total_revenue' => $totalRevenue,
                'packages' => $packages,
            ],
        ]);
    }

    private function parseDate($value)
    {
        if (!$value) {
            return null;
        }

        $formats = ['Y-m-d', 'd/m/Y'];
        foreach ($formats as $format) {
            try {
                return Carbon::createFromFormat($format, $value);
            } catch (\Throwable $e) {
                // try next format
            }
        }

        try {
            return Carbon::parse($value);
        } catch (\Throwable $e) {
            return null;
        }
    }
}
