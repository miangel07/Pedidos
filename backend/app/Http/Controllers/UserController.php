<?php

namespace App\Http\Controllers;

use App\Models\Domiciliario;
use App\Models\negocio;
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

        $user = User::create(
            [
                'nombre' => $request->nombre,
                'TipoUsuario' => $request->TipoUsuario,
                'correo' => $request->correo,
                'telefono' => $request->telefono,
                'password' => bcrypt($request->password),
            ]
        );
        if ($request->TipoUsuario === "negocio") {
            negocio::create([
                'nombre' => $request->nombre,
                'banner' => $request->banner,
                'direccion' => $request->direccion,
                'user_id' => $user->id,
            ]);
        }
        if ($request->TipoUsuario === "domiciliario") {

            Domiciliario::create([
                'licencia' => $request->licencia,
                'user_id' => $user->id,
            ]);
        }

        return response()->json([
            "data" => "Usuario creado con exito",
            "request" => $request->all()
        ], 201);
    }
    public function updateUsuario(Request $request, $id)
    {
        try {
            $datos = $request->except('_token', '_method');
            $usuario = User::find($id);
            $usuario->fill($datos);
            $usuario->save();
            return response()->json([
                "mensaje" => "Usuario actualizado",
                "datos" => $datos
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el usuario: ' . $e->getMessage());
            return response()->json([
                "error" => "Hubo un error al actualizar el usuario",
                "datos" => $datos
            ], 500);
        }
    }
    public function updateEstado(Request $request, $id)
    {
        try {
            $datos = $request->except('_token', '_method');
            $usuario = User::find($id);
            $usuario->estado = $request->estado;
            $usuario->save();
            return response()->json([
                "mensaje" => "Estado Actualizado con exito",
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el usuario: ' . $e->getMessage());
            return response()->json([
                "error" => "Hubo un error al actualizar el usuario",
                "datos" => $datos
            ], 500);
        }
    }
}
