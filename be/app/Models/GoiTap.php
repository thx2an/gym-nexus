<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GoiTap extends Model
{
    protected $table = 'goi_hang_nguoi_dungs';
    protected $primaryKey = 'package_id';

    protected $fillable = [
        'code',
        'name',
        'description',
        'duration_days',
        'price',
        'benefits',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];
}
