<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoiHang extends Model
{
    protected $table = 'goi_hangs';
    protected $primaryKey = 'membership_id';

    protected $fillable = [
        'member_id',
        'package_id',
        'start_date',
        'end_date',
        'status',
    ];

    /**
     * Get the member that owns the membership.
     */
    public function nguoiDung()
    {
        return $this->belongsTo(NguoiDung::class, 'member_id', 'user_id');
    }

    /**
     * Get the package associated with the membership.
     */
    public function goiHangNguoiDung()
    {
        return $this->belongsTo(GoiHangNguoiDung::class, 'package_id', 'package_id');
    }
}
