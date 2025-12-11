<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaiTroNguoiDung extends Model
{
    protected $table = 'vai_tro_nguoi_dungs';

    protected $fillable = [
        'user_id',
        'role_id',
    ];
}
