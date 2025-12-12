<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ProfileMember;
use App\Models\NguoiDung;

class HoSoTienDo extends Model
{
    protected $table = 'ho_so_tien_dos';
    protected $primaryKey = 'record_id';

    protected $fillable = [
        'member_id',
        'record_date',
        'metric_type',
        'value',
        'unit',
        'source',
        'created_by',
    ];

    /**
     * Get the member associated with the progress record.
     */
    public function member()
    {
        return $this->belongsTo(ProfileMember::class, 'member_id', 'member_id');
    }

    /**
     * Get the user (PT/Admin) who created the record.
     */
    public function nguoiTao()
    {
        return $this->belongsTo(NguoiDung::class, 'created_by', 'user_id');
    }
}
