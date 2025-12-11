<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaQRPhienTap extends Model
{
    protected $table = 'ma_q_r_phien_taps';
    protected $primaryKey = 'qr_id';

    protected $fillable = [
        'session_id',
        'token',
        'generated_at',
        'expires_at',
        'is_used',
    ];

    /**
     * Get the session associated with the QR token.
     */
    public function session()
    {
        return $this->belongsTo(BuoiTap::class, 'session_id', 'session_id');
    }
}
