<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketNhanVien extends Model
{
    protected $table = 'ticket_nhan_viens';
    protected $primaryKey = 'ticket_id';

    protected $fillable = [
        'member_id',
        'subject',
        'category',
        'status',
        'priority',
        'assigned_to',
    ];

    public function member()
    {
        return $this->belongsTo(ProfileMember::class, 'member_id', 'member_id');
    }

    public function assignedStaff()
    {
        return $this->belongsTo(NguoiDung::class, 'assigned_to', 'user_id');
    }
}
