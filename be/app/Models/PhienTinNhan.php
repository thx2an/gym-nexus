<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhienTinNhan extends Model
{
    protected $table = 'phien_tin_nhans';
    protected $primaryKey = 'chat_id';

    protected $fillable = [
        'member_id',
        'support_staff_id',
        'status',
        'started_at',
        'ended_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
    ];

    public function member()
    {
        return $this->belongsTo(ProfileMember::class, 'member_id', 'member_id');
    }

    public function supportStaff()
    {
        return $this->belongsTo(NguoiDung::class, 'support_staff_id', 'user_id');
    }
}
