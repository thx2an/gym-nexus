<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BuoiTap extends Model
{
    protected $table = 'buoi_taps';
    protected $primaryKey = 'session_id';

    protected $fillable = [
        'member_id',
        'trainer_id',
        'branch_id',
        'start_time',
        'end_time',
        'status',
        'notes',
    ];

    /**
     * Get the member (user) who booked the session.
     */
    public function member()
    {
        return $this->belongsTo(NguoiDung::class, 'member_id', 'user_id');
    }

    /**
     * Get the trainer for the session.
     */
    public function profilePT()
    {
        return $this->belongsTo(ProfilePT::class, 'trainer_id', 'trainer_id');
    }

    /**
     * Get the branch where the session takes place.
     */
    public function chiNhanh()
    {
        return $this->belongsTo(ChiNhanh::class, 'branch_id', 'branch_id');
    }
}
