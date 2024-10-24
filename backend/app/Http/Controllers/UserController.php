<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::getDomiciliario();
    }
    public function create(Request $request)
    {
       
        return User::create(
            [
                'nombre' => $request->nombre,
                'TipoUsuario' => $request->TipoUsuario,
                'correo' => $request->correo,
                'telefono' => $request->telefono,
                'password' => bcrypt($request->password),
                'estado' => $request->direccion,
               
            ]
        );
        return response()->json([
            "data" => "Usurio creado con exito",
            "request" => $request
        ], 201);
    }  
}
