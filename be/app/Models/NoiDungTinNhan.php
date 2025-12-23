<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NoiDungTinNhan extends Model
{
    protected $table = 'noi_dung_tin_nhans';
    protected $primaryKey = 'msg_id';
    public $timestamps = false; // Only created_at in schema via useCurrent()

    protected $fillable = [
        'chat_id',
        'sender_id',
        'sender_role',
        'content',
        'created_at'
    ];

    public function chat()
    {
        return $this->belongsTo(PhienTinNhan::class, 'chat_id', 'chat_id');
    }

    public function sender()
    {
        return $this->belongsTo(NguoiDung::class, 'sender_id', 'user_id');
    }
}
