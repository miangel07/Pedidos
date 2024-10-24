<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class novedade extends Model {

    protected  $table = 'novedades';
    protected $primaryKey = 'id';
    protected $fillable = ['descripcion','estado','fecha_reporte', 'domiciliario_id', 'solicitud_id'];

    // creamos la relacion entre



}
