<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilePT extends Model
{
    protected $table = 'profile_p_t_s';
    protected $primaryKey = 'trainer_id';

    protected $fillable = [
        'user_id',
        'specialization',
        'bio',
        'experience_years',
    ];

    /**
     * Get the user that owns the trainer profile.
     */
    public function user()
    {
        return $this->belongsTo(NguoiDung::class, 'user_id', 'user_id');
    }
}
