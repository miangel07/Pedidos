<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class solicitud extends Model {

    use HasFactory;
    public $table = 'solicituds';
    protected $fillable = ['direccion_recogida','direccion_entrega','user_id','domiciliario_id','estado','fecha'];

    public function novedads(){
        $this->hasMany(novedade::class);
    }

}
