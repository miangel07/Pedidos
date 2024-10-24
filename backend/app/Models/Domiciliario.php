<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Domiciliario extends Model
{
    protected $table = 'domiciliarios';

    protected $fillable = ['licencia','user_id','disponibilidad'];

    public static function getDomiciliario(){
        return Domiciliario::all();
    }
}
