<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLogs extends Model
{
    protected $table = 'audit_logs';
    protected $primaryKey = 'log_id';
    public $timestamps = false; // Only performed_at is used

    protected $fillable = [
        'entity_type',
        'entity_id',
        'action',
        'performed_by',
        'performed_at',
        'details',
    ];

    protected $casts = [
        'performed_at' => 'datetime',
    ];

    public function performer()
    {
        return $this->belongsTo(NguoiDung::class, 'performed_by', 'user_id');
    }
}
