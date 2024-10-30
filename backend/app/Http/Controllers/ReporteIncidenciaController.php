<?php

namespace App\Http\Controllers;

use App\Models\reporte_incidencia;
use Illuminate\Http\Request;

/**
 * @OA\Get(
 *     path="/api/incidencias",
 *     summary="Obtener todas las incidencias",
 *     description="Retorna una lista de todas las incidencias",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="descripcion", type="string", example="Incidencia de prueba"),
 *                 @OA\Property(property="estado", type="string", example="reportada"),
 *                 @OA\Property(property="domiciliario_id", type="integer", example=1)
 *             ))
 *         )
 *     )
 * )
 *
 * @OA\Put(
 *     path="/api/incidencias/{id}",
 *     summary="Actualizar una incidencia",
 *     description="Actualiza una incidencia existente",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="estado", type="string", example="en progreso"),
 *             @OA\Property(property="descripcion", type="string", example="Incidencia actualizada")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Incidencia actualizada exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="mensaje", type="string", example="Incidencia actualizada")
 *         )
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Error interno del servidor",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string")
 *         )
 *     )
 * )
 */



class ReporteIncidenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return reporte_incidencia::getIncidencias();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        try {
            $response = reporte_incidencia::create(
                [
                    'tipo_incidencia' => $request->tipo_incidencia,
                    'descripcion' => $request->descripcion,
                    'fecha_incidencia' => $request->fecha_incidencia,
                    'user_id' => $request->user_id,
                    'solicitud_id' => $request->solicitud_id,
                ]
            );
            if ($response) {
                return response()->json(['mensaje' => 'Incidencia creada correctamente'], 201);
            }
            return response()->json(['mensaje' => 'Hubo un error al crear la incidencia'], 500);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
       
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(reporte_incidencia $reporte_incidencia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(reporte_incidencia $reporte_incidencia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $reporte_incidencia)
    {
        try {
            $datos = $request->except(['_token', '_method']);

            $buscarReporte = reporte_incidencia::find($reporte_incidencia);

            if (!$datos['descripcion']) {
                $buscarReporte->estado = $datos['estado'];
                $buscarReporte->save();
                return response()->json(['mensaje' => 'Incidencia actualizada 1'], 200);
            }

            $buscarReporte->estado = $datos['estado'];
            $buscarReporte->descripcion = $datos['descripcion'];
            $buscarReporte->save();
            return response()->json(['mensaje' => 'Incidencia actualizada 2'], 200);
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(reporte_incidencia $reporte_incidencia)
    {
        //
    }
}
