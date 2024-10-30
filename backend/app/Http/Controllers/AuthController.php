<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('correo', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Correo o contraseña incorrectas'], 401);
        }

        return response()->json(compact('token'));
    }
    public function cambioPassword(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user->validatePassword($request->password_actual)) {
            return response()->json(['error' => 'Contraseña actual incorrecta'], 401);
        }

        $user->password = $request->password_nuevo;
        $user->save();

        return response()->json(['message' => 'Contraseña actualizada con exito']);
        
    }
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Sesion cerrada con exito']);
    }
    public function getUser()
    {
        try {
            
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener el usuario'], 500);
        }
    }
}
