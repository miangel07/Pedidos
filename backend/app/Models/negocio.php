<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class negocio extends Model
{
    protected $fillable = [
        'nombre',
        'banner',
        'correo',
        'direccion',
        'user_id',
    ];
}
