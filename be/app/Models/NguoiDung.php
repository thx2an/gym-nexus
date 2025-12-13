<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use App\Models\VaiTro;

class NguoiDung extends Model
{
    use HasApiTokens;
    protected $table = 'nguoi_dungs';
    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'password_hash',
        'gender',
        'date_of_birth',
        'status',
        'hash_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password_hash',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
    ];

    /**
     * Set the user's password hash.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordHashAttribute($value)
    {
        $this->attributes['password_hash'] = Hash::make($value);
    }

    public function vaiTros()
    {
        return $this->belongsToMany(VaiTro::class, 'vai_tro_nguoi_dungs', 'user_id', 'role_id');
    }
}
