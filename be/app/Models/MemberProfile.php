<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\NguoiDung;

class MemberProfile extends Model
{
    protected $table = 'member_profiles';
    protected $primaryKey = 'member_id';
    public $timestamps = false; // Created_at is handled by DB default, no updated_at

    protected $fillable = [
        'user_id',
        'current_height',
        'current_weight',
        'fitness_goal',
        'medical_history',
    ];

    public function user()
    {
        return $this->belongsTo(NguoiDung::class, 'user_id', 'user_id');
    }
}
