<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BaoCao extends Model
{
    protected $table = 'bao_caos';
    protected $primaryKey = 'report_id';
    public $timestamps = false; // Only generated_at is used

    protected $fillable = [
        'type',
        'parameters_json',
        'generated_by',
        'generated_at',
        'file_path',
    ];

    protected $casts = [
        'generated_at' => 'datetime',
        'parameters_json' => 'array',
    ];

    public function creator()
    {
        return $this->belongsTo(NguoiDung::class, 'generated_by', 'user_id');
    }
}
