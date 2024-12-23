<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domiciliario extends Model
{
    use HasFactory;
    protected $table = 'domiciliarios';

    protected $fillable = ['licencia', 'user_id', 'disponibilidad'];

    public static function getDomiciliario()
    {
        return Domiciliario::select(
            'domiciliarios.id',
            'domiciliarios.licencia',
            'domiciliarios.user_id',
            'domiciliarios.disponibilidad',
            'users.nombre'
        )
            ->join('users', 'users.id', '=', 'domiciliarios.user_id')
            ->get();
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function solicitudes()
    {
        return $this->hasMany(solicitud::class);
    }

}
