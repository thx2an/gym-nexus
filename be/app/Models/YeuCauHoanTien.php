<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ThanhToan;
use App\Models\ProfileMember;
use App\Models\NguoiDung;

class YeuCauHoanTien extends Model
{
    protected $table = 'yeu_cau_hoan_tiens';
    protected $primaryKey = 'refund_id';

    protected $fillable = [
        'payment_id',
        'member_id',
        'reason',
        'status',
        'requested_at',
        'processed_by',
        'processed_at',
    ];

    /**
     * Get the payment associated with the refund request.
     */
    public function thanhToan()
    {
        return $this->belongsTo(ThanhToan::class, 'payment_id', 'payment_id');
    }

    /**
     * Get the member who requested the refund.
     */
    public function member()
    {
        return $this->belongsTo(ProfileMember::class, 'member_id', 'member_id');
    }

    /**
     * Get the admin/user who processed the request.
     */
    public function nguoiXuLy()
    {
        return $this->belongsTo(NguoiDung::class, 'processed_by', 'user_id');
    }
}
