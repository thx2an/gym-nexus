<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ThanhToan;

class HoaDon extends Model
{
    protected $table = 'hoa_dons';
    protected $primaryKey = 'invoice_id';

    protected $fillable = [
        'payment_id',
        'invoice_number',
        'issued_at',
        'total_amount',
        'file_path',
    ];

    /**
     * Get the payment associated with the invoice.
     */
    public function thanhToan()
    {
        return $this->belongsTo(ThanhToan::class, 'payment_id', 'payment_id');
    }
}
