<?php

namespace App\Http\Controllers;

use App\Models\Domiciliario;
use App\Models\novedade;
use App\Models\solicitud;
use Illuminate\Http\Request;

/**
 * @OA\Get(
 *     path="/api/novedades",
 *     summary="Obtener todas las novedades",
 *     description="Retorna una lista de todas las novedades",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="descripcion", type="string", example="Novedad de prueba"),
 *                 @OA\Property(property="estado", type="string", example="reportada"),
 *                 @OA\Property(property="fecha_reporte", type="string", format="date-time", example="2023-04-15T12:00:00"),
 *                 @OA\Property(property="domiciliario_id", type="integer", example=1),
 *                 @OA\Property(property="solicitud_id", type="integer", example=1)
 *             ))
 *         )
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/novedades",
 *     summary="Crear una nueva novedad",
 *     description="Crea una nueva novedad en el sistema",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="domiciliario_id", type="integer", example=1),
 *             @OA\Property(property="solicitud_id", type="integer", example=1),
 *             @OA\Property(property="descripcion", type="string", example="Novedad de prueba"),
 *             @OA\Property(property="estado", type="string", example="reportada")
 *         )
 *     ),
 *     @OA\Response(
 *         response=202,
 *         description="Novedad creada exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="mensaje", type="string", example="Novedad creada"),
 *             @OA\Property(property="request", type="object")
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
 *
 * @OA\Get(
 *     path="/api/novedades/{id}",
 *     summary="Obtener una novedad por ID",
 *     description="Retorna una novedad específica por su ID",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent()
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


class NovedadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return novedade::getNovedades();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $domiciliarioUser = Domiciliario::where('user_id', $request->domiciliario_id)->get();
            $domiliciariosDisponibles = Domiciliario::where('disponibilidad', 'disponible')->get();
            $solicitud = solicitud::where('id', $request->solicitud_id)->first();

            foreach ($domiciliarioUser as $domiciliario) {
                $domiciliario->disponibilidad = "no disponible";
                $domiciliario->save();
            }

            $idNuevoDomiciliario = $domiliciariosDisponibles[count($domiliciariosDisponibles) - 1]['id'];


            $solicitud->domiciliario_id = $idNuevoDomiciliario;
            $solicitud->estado = "reprogramado";
            $solicitud->save();


            novedade::create([
                'descripcion' => $request->descripcion,
                'estado' => $request->estado,
                'fecha_reporte' => "2024-10-24 19:27:35",
                'domiciliario_id' => $domiciliarioUser[0]['id'],
                'solicitud_id' => $request->solicitud_id
            ]);

            return response()->json([
                "mensaje" => "Novedad creada",
                "request" => $request->all()
            ], 202);
        } catch (\Exception $e) {
            return $e->getMessage();
        }


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($novedade)
    {
        try {
            $novedadeId = novedade::with('solicitud')->find($novedade);
            return response()->json($novedadeId);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(novedade $novedade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, novedade $novedade)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(novedade $novedade)
    {
        //
    }
}
