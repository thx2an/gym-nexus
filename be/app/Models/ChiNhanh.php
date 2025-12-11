<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChiNhanh extends Model
{
    protected $table = 'chi_nhanhs';
    protected $primaryKey = 'branch_id';

    protected $fillable = [
        'name',
        'address',
        'phone',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];
}
