<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhanHoiTuThe extends Model
{
    protected $table = 'phan_hoi_tu_thes';
    protected $primaryKey = 'feedback_id';

    protected $fillable = [
        'pose_id',
        'timestamp',
        'feedback_type',
        'message',
    ];

    public function poseSession()
    {
        return $this->belongsTo(PhienPhanTichTuThe::class, 'pose_id', 'pose_id');
    }
}
