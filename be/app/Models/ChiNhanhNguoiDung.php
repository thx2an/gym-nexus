<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChiNhanhNguoiDung extends Model
{
    protected $table = 'chi_nhanh_nguoi_dungs';
    // protected $primaryKey = 'user_id'; // Removed single PK
    public $incrementing = false; // user_id is PK and not auto-incrementing in this pivot-like table

    protected $fillable = [
        'user_id',
        'branch_id',
        'primary_flag',
    ];

    /**
     * Get the user that owns the branch assignment.
     */
    public function user()
    {
        return $this->belongsTo(NguoiDung::class, 'user_id', 'user_id');
    }

    /**
     * Get the branch associated with the user.
     */
    public function chiNhanh()
    {
        return $this->belongsTo(ChiNhanh::class, 'branch_id', 'branch_id');
    }
}
