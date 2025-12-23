<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PhienTinNhan extends Model
{
    protected $table = 'phien_tin_nhans';
    protected $primaryKey = 'chat_id';
    public $timestamps = true; // Table has timestamps

    protected $fillable = [
        'member_id',
        'support_staff_id',
        'status',
        'started_at',
        'ended_at'
    ];

    public function messages()
    {
        return $this->hasMany(NoiDungTinNhan::class, 'chat_id', 'chat_id');
    }

    public function member()
    {
        return $this->belongsTo(MemberProfile::class, 'member_id', 'member_id');
    }

    public function supportStaff()
    {
        return $this->belongsTo(NguoiDung::class, 'support_staff_id', 'user_id');
    }
}
