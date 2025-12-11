<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LichLamViecPT extends Model
{
    protected $table = 'lich_lam_viec_p_t_s';
    protected $primaryKey = 'availability_id';

    protected $fillable = [
        'trainer_id',
        'branch_id',
        'date',
        'start_time',
        'end_time',
        'is_recurring',
        'day_of_week',
        'is_blocked',
    ];

    /**
     * Get the trainer profile.
     */
    public function profilePT()
    {
        return $this->belongsTo(ProfilePT::class, 'trainer_id', 'trainer_id');
    }

    /**
     * Get the branch.
     */
    public function chiNhanh()
    {
        return $this->belongsTo(ChiNhanh::class, 'branch_id', 'branch_id');
    }
}
