<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class reporte_incidencia extends Model
{
    public $timestamps = false;
    protected $table = 'reporte_incidencias';
    protected $fillable = ['tipo_incidencia', 'descripcion', 'fecha_incidencia', 'user_id', 'solicitud_id'];

    // reporte de incidencias

    public static function getIncidencias()
    {

        // nombre usuario, rol_usuario ,id solicitud, tipo incidencia, fecha, descripcion,

        $incidencia = reporte_incidencia::select('users.nombre' , 'users.TipoUsuario','tipo_incidencia', 'descripcion', 'fecha_incidencia')
            ->join('users', 'users.id', '=', 'reporte_incidencias.user_id')
            ->get();

        return $incidencia;

    }


    //relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function solicitud()
    {
        return $this->belongsTo(solicitud::class);
    }
}
