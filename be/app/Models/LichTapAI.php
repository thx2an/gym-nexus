<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ProfileMember;
use App\Models\NguoiDung;

class LichTapAI extends Model
{
    protected $table = 'lich_tap_a_i_s';
    protected $primaryKey = 'plan_id';

    protected $fillable = [
        'member_id',
        'goal',
        'duration_weeks',
        'plan_json',
        'source',
        'created_by',
    ];

    /**
     * Get the member associated with the workout plan.
     */
    public function member()
    {
        return $this->belongsTo(ProfileMember::class, 'member_id', 'member_id');
    }

    /**
     * Get the creator (PT or System/User) of the plan.
     */
    public function nguoiTao()
    {
        return $this->belongsTo(NguoiDung::class, 'created_by', 'user_id');
    }
}
