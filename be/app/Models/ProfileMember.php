<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileMember extends Model
{
    protected $table = 'member_profiles';
    protected $primaryKey = 'member_id';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'current_height',
        'current_weight',
        'fitness_goal',
        'medical_history',
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user()
    {
        return $this->belongsTo(NguoiDung::class, 'user_id', 'user_id');
    }
}
