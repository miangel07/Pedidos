<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class actividade extends Model
{
    protected $table = 'actividades';
    
    protected $fillable = [
        'user_id',
        'descripcion',
        'fecha'
    ];

    protected $casts = [
        'fecha' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}