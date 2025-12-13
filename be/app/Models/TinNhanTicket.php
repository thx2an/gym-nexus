<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TinNhanTicket extends Model
{
    protected $table = 'tin_nhan_tickets';
    protected $primaryKey = 'msg_id';
    public $timestamps = false; // Only created_at is used

    protected $fillable = [
        'ticket_id',
        'sender_id',
        'sender_role',
        'content',
        'created_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function ticket()
    {
        return $this->belongsTo(TicketNhanVien::class, 'ticket_id', 'ticket_id');
    }

    public function sender()
    {
        return $this->belongsTo(NguoiDung::class, 'sender_id', 'user_id');
    }
}
