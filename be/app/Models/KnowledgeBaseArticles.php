<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KnowledgeBaseArticles extends Model
{
    protected $table = 'knowledge_base_articles';
    protected $primaryKey = 'article_id';

    protected $fillable = [
        'title',
        'content',
        'category',
        'status',
        'created_by',
    ];

    public function author()
    {
        return $this->belongsTo(NguoiDung::class, 'created_by', 'user_id');
    }
}
