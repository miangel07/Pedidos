<?php

namespace App\Http\Controllers;

use App\Models\actividade;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * @OA\Get(
 *     path="/api/activities",
 *     summary="Obtener todas las actividades",
 *     description="Retorna una lista de todas las actividades ordenadas por fecha de manera descendente",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="descripcion", type="string", example="Actividad de prueba"),
 *                 @OA\Property(property="fecha", type="string", format="date", example="2023-04-15"),
 *                 @OA\Property(property="usuario", type="string", example="Juan Pérez")
 *             ))
 *         )
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/activities",
 *     summary="Crear una nueva actividad",
 *     description="Crea una nueva actividad en el sistema",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="descripcion", type="string", example="Actividad de prueba"),
 *             @OA\Property(property="fecha", type="string", format="date", example="2023-04-15")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Actividad creada exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="message", type="string", example="Actividad creada exitosamente"),
 *             @OA\Property(property="data", type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="descripcion", type="string", example="Actividad de prueba"),
 *                 @OA\Property(property="fecha", type="string", format="date", example="2023-04-15"),
 *                 @OA\Property(property="usuario", type="string", example="Juan Pérez")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=422,
 *         description="Error de validación",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Error de validación"),
 *             @OA\Property(property="errors", type="object")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Usuario no encontrado",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Usuario no encontrado")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error interno del servidor",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Error al crear la actividad"),
 *             @OA\Property(property="error", type="string", example="Mensaje de error")
 *         )
 *     )
 * )
 */






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