<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

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
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Sesion cerrada con exito']);
    }
    public function getUser()
    {
        
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user); 
       
    }
}
