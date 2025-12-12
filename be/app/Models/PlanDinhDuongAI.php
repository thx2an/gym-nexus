<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ProfileMember;
use App\Models\NguoiDung;

class PlanDinhDuongAI extends Model
{
    protected $table = 'plan_dinh_duong_a_i_s';
    protected $primaryKey = 'nutrition_id';

    protected $fillable = [
        'member_id',
        'daily_calories',
        'macro_json',
        'plan_json',
        'created_by',
    ];

    /**
     * Get the member associated with the nutrition plan.
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
