<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhanTichRuiRo extends Model
{
    protected $table = 'phan_tich_rui_ros';
    protected $primaryKey = 'analysis_id';

    protected $fillable = [
        'member_id',
        'analyzed_at',
        'risk_level',
        'score',
        'factors_json',
        'recommendations'
    ];

    protected $casts = [
        'analyzed_at' => 'datetime',
        'factors_json' => 'array',
    ];

    public function member()
    {
        return $this->belongsTo(ProfileMember::class, 'member_id', 'member_id');
    }
}
