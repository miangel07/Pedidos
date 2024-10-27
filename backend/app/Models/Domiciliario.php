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
        return Domiciliario::all();
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
