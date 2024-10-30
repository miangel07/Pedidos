<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\reporte_incidencia;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject

{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'TipoUsuario',
        'correo',
        'telefono',
        'password',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function validatePassword($password)
    {
        return password_verify($password, $this->password);
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public static function getUsuario()
    {
        return User::with(['domiciliario', 'negocio'])->get();
    }
    
    public static function getUsuarioDomiciliario()
    {

        $results = User::where('TipoUsuario', 'domiciliario')
            ->with('domiciliario')
            ->get();


        $results = $results->map(function ($user) {
            return [

                'nombre' => $user->nombre,
                'correo' => $user->correo,
                'telefono' => $user->telefono,
                'estado' => $user->estado,
                'id' => $user->domiciliario->id ?? null,
                'licencia' => $user->domiciliario->licencia ?? null,
                'disponibilidad' => $user->domiciliario->disponibilidad ?? null,

            ];
        });


        return response()->json($results);
    }
    public function domiciliario()
    {
        return $this->hasOne(Domiciliario::class);
    }
    public function negocio()
    {
        return $this->hasOne(negocio::class);
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // relaciones en modelos

    public function reportes()
    {
        return $this->hasMany(reporte_incidencia::class);
    }
}
