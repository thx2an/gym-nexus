<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NoteBuoiTap extends Model
{
    protected $table = 'note_buoi_taps';
    protected $primaryKey = 'note_id';

    protected $fillable = [
        'session_id',
        'trainer_id',
        'member_id',
        'notes',
        'metrics_json',
    ];

    protected $casts = [
        'metrics_json' => 'array',
    ];

    /**
     * Get the session associated with the note.
     */
    public function session()
    {
        return $this->belongsTo(BuoiTap::class, 'session_id', 'session_id');
    }

    /**
     * Get the trainer who wrote the note.
     */
    public function profilePT()
    {
        return $this->belongsTo(ProfilePT::class, 'trainer_id', 'trainer_id');
    }

    /**
     * Get the member who received the session.
     */
    public function member()
    {
        return $this->belongsTo(NguoiDung::class, 'member_id', 'user_id');
    }
}
