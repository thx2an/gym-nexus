<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaiTro extends Model
{
    protected $table = 'vai_tros';
    protected $primaryKey = 'role_id';

    protected $fillable = [
        'code',
        'name',
    ];
}
