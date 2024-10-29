<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class solicitud extends Model
{

    use HasFactory;
    public $table = 'solicituds';
    protected $fillable = ['direccion_recogida', 'direccion_entrega', "descripcion_Producto", 'user_id', 'domiciliario_id', 'estado', 'fecha'];


    public  static function getSolicitudes()
    {

        $data = solicitud::select(
            "solicituds.id as Id_solicitud",
            'direccion_recogida',
            'direccion_entrega',
            'domiciliario_id',
            'users.nombre as nombre_usuario',
            'domiciliarios_users.nombre as nombre_domiciliario',
            'solicituds.estado',
            'fecha'
        )
            ->join('users', 'users.id', '=', 'solicituds.user_id')
            ->join('domiciliarios', 'domiciliarios.id', '=', 'solicituds.domiciliario_id')
            ->join('users as domiciliarios_users', 'domiciliarios_users.id', '=', 'domiciliarios.user_id')
            ->orderBy('fecha', 'desc')->get();

        return $data;
    }

    public function novedads()
    {
        $this->hasMany(novedade::class);
    }
    public function domiciliario()
    {
        return $this->belongsTo(Domiciliario::class, 'domiciliario_id');
    }
}
