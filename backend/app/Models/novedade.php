<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class novedade extends Model {

    use HasFactory;

    protected $table = 'novedades';
    protected $primaryKey = 'id';
    protected $fillable = ['descripcion', 'estado', 'fecha_reporte', 'domiciliario_id', 'solicitud_id'];

    // creamos la relacion entre


    public static function getNovedades()
    {
        return novedade::select('id','descripcion', 'estado', 'fecha_reporte', 'domiciliario_id', 'solicitud_id')->orderBy('fecha_reporte', 'desc')->get();
    }


    // relacion
    public function solicitud(){
        return $this->belongsTo(solicitud::class);
    }

}
