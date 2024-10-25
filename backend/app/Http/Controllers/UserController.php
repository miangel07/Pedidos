<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        return User::getUsuario();
    }
    public function createUsurio(Request $request)
    {

        User::create(
            [
                'nombre' => $request->nombre,
                'TipoUsuario' => $request->TipoUsuario,
                'correo' => $request->correo,
                'telefono' => $request->telefono,
                'password' => bcrypt($request->password),
            ]
        );
        return response()->json([
            "data" => "Usuario creado con exito",
            "request" => $request
        ], 201);
    }
}
