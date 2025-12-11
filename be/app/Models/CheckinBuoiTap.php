<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CheckinBuoiTap extends Model
{
    protected $table = 'checkin_buoi_taps';
    protected $primaryKey = 'checkin_id';

    protected $fillable = [
        'session_id',
        'member_id',
        'scanned_at',
        'is_valid',
    ];

    /**
     * Get the session associated with the checkin.
     */
    public function session()
    {
        return $this->belongsTo(BuoiTap::class, 'session_id', 'session_id');
    }

    /**
     * Get the member who checked in.
     */
    public function member()
    {
        return $this->belongsTo(NguoiDung::class, 'member_id', 'user_id');
    }
}
