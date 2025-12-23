<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ThanhToan extends Model
{
    protected $table = 'thanh_toans';
    protected $primaryKey = 'payment_id';

    // The schema requested created_at default getdate, which Laravel handles.
    // However, if we want to manually handle it or if the DB does it,
    // Laravel's timestamps = true is standard.
    // The schema does not strictly mention updated_at, but best practice is to have it.
    // We added it in validation.
    public $timestamps = true;

    protected $fillable = [
        'member_id',
        'amount',
        'currency',
        'status',
        'method',
        'gateway',
        'gateway_transaction_id',
        'membership_id',
        'session_id',
    ];

    /**
     * Get the member who made the payment.
     */
    public function member()
    {
        return $this->belongsTo(MemberProfile::class, 'member_id', 'member_id');
    }

    /**
     * Get the membership associated with the payment.
     */
    public function goiHang()
    {
        return $this->belongsTo(GoiHang::class, 'membership_id', 'membership_id');
    }

    /**
     * Get the training session associated with the payment.
     */
    public function buoiTap()
    {
        return $this->belongsTo(BuoiTap::class, 'session_id', 'session_id');
    }

    /**
     * Get the invoice associated with the payment.
     */
    public function hoaDon()
    {
        return $this->hasOne(HoaDon::class, 'payment_id', 'payment_id');
    }
}
