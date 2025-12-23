<?php

namespace App\Http\Controllers;

use App\Models\ThanhToan;
use App\Models\GoiTap;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ManagerController extends Controller
{
    // Dashboard Stats
    public function getStats()
    {
        // 1. Calculate Monthly Revenue
        // Assuming 'status' = 'completed' or similar check if needed. 
        // For now, sum all amounts in current month.
        // User requested from payment_id (ThanhToan).

        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        $monthlyRevenue = ThanhToan::whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->sum('amount');

        // 2. Active Memberships / Sold Packages
        // User image says "Membership Packages: 12" and "Monthly Revenue: $24k".
        // "Membership Packages" could mean total active subscriptions OR total distinct users.
        // Let's count "Successful Membership Payments this month" as a proxy for "Sold Memberships".
        // OR better: Count DISTINCT members who have a valid payment this month?
        // Let's stick to "Count of payments (type=membership)" or just "Total Active Packages stored in DB".
        // The user said: "lấy dữ liệu từ các payment_id để tổng hợp membership".
        // This implies deriving it from payments. So let's count distinct users who paid this month OR total transaction count.
        // Let's go with Total Count of Membership Payments (as a proxy for sold packages).

        $membershipCount = ThanhToan::whereYear('created_at', $currentYear)
            ->whereMonth('created_at', $currentMonth)
            ->whereNotNull('membership_id') // Assuming membership_id is set for membership payments
            ->count();

        // 3. Active Members (Total) - For existing widget
        $activeMembers = \App\Models\NguoiDung::whereHas('vaiTros', function ($q) {
            $q->where('role_id', 4); // Member
        })->where('status', 'active')->count();

        return response()->json([
            'monthly_revenue' => $monthlyRevenue,
            'membership_count' => $membershipCount,
            'active_members' => $activeMembers
            // Branch count is removed as per request
        ]);
    }

    // Packages Management
    public function getPackages()
    {
        // "hiển thị các package đã được lên store" -> active packages? or all?
        // Assuming all for manager to manage.
        return response()->json(GoiTap::all());
    }

    public function storePackage(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|string|unique:goi_hang_nguoi_dungs,code',
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'benefits' => 'nullable|string', // JSON or text
            'is_active' => 'boolean'
        ]);

        $package = GoiTap::create($data);

        return response()->json([
            'status' => true,
            'message' => 'Package created successfully',
            'data' => $package
        ]);
    }
}
