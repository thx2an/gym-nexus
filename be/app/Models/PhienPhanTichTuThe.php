<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ProfileMember;

class PhienPhanTichTuThe extends Model
{
    protected $table = 'phien_phan_tich_tu_thes';
    protected $primaryKey = 'pose_id';

    protected $fillable = [
        'member_id',
        'exercise_name',
        'started_at',
        'ended_at',
        'result_summary',
        'raw_data_ref',
    ];

    /**
     * Get the member associated with the pose analysis session.
     */
    public function member()
    {
        return $this->belongsTo(ProfileMember::class, 'member_id', 'member_id');
    }
}
