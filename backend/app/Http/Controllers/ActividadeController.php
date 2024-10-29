<?php

namespace App\Http\Controllers;

use App\Models\actividade;
use App\Models\User;
use Illuminate\Http\Request;

class ActividadeController extends Controller
{
    public function index()
    {
        try {
            $actividades = actividade::with('user')
                                   ->orderBy('fecha', 'desc')
                                   ->get()
                                   ->map(function ($actividad) {
                                        return [
                                            'id' => $actividad->id,
                                            'descripcion' => $actividad->descripcion,
                                            'fecha' => $actividad->fecha->format('Y-m-d'),
                                            'usuario' => $actividad->user->nombre
                                        ];
                                   });

            return response()->json([
                'status' => 'success',
                'data' => $actividades
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener las actividades',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'descripcion' => 'required|string|max:255',
                'fecha' => 'required|date'
            ]);

            $user = User::find($request->user_id);
            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuario no encontrado'
                ], 404);
            }

            $actividad = new actividade();
            $actividad->user_id = $request->user_id;
            $actividad->descripcion = $request->descripcion;
            $actividad->fecha = $request->fecha;
            $actividad->save();

            $actividad->load('user:id,nombre');

            return response()->json([
                'status' => 'success',
                'message' => 'Actividad creada exitosamente',
                'data' => [
                    'id' => $actividad->id,
                    'descripcion' => $actividad->descripcion,
                    'fecha' => $actividad->fecha->format('Y-m-d'),
                    'usuario' => $actividad->user->nombre
                ]
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al crear la actividad',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}