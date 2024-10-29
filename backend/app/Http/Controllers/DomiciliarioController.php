<?php

namespace App\Http\Controllers;


use App\Models\Domiciliario;
use Illuminate\Http\Request;


/**
 * @OA\Get(
 *     path="/api/domiciliarios",
 *     summary="Obtener todos los domiciliarios",
 *     description="Retorna una lista de todos los domiciliarios",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="licencia", type="string", example="ABC123"),
 *                 @OA\Property(property="user_id", type="integer", example=1),
 *                 @OA\Property(property="disponibilidad", type="boolean", example=true)
 *             ))
 *         )
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/domiciliarios",
 *     summary="Crear un nuevo domiciliario",
 *     description="Crea un nuevo domiciliario en el sistema",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="licencia", type="string", example="ABC123"),
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="disponibilidad", type="boolean", example=true)
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Domiciliario creado exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="data", type="string", example="Domiciliario creado con éxito"),
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
 * @OA\Put(
 *     path="/api/domiciliarios/{id}",
 *     summary="Actualizar un domiciliario",
 *     description="Actualiza la información de un domiciliario existente",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="licencia", type="string", example="ABC123"),
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="disponibilidad", type="boolean", example=true)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Domiciliario actualizado exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="data", type="string", example="Domiciliario actualizado con éxito"),
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
 */


class DomiciliarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Domiciliario::getDomiciliario();
        //return Domiciliario::getDomiciliario();


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

//        $this->validate ($request,[
//            'licencia' => 'required',
//            'user_id' => 'required',
//            'disponibilidad' => 'required',
//        ]);

        Domiciliario::create([
            'licencia' => $request->licencia,
            'user_id' => $request->user_id,
            'disponibilidad' => $request->disponibilidad,
        ]);

        return response()->json([
            "data" => "Domiciliario creado con exito",
            "request" => $request
        ], 201);

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
    public function show(domiciliario $domiciliario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(domiciliario $domiciliario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $domiciliario) {
        try {
            $datos = $request->except('_token', '_method');
            $dataDomiciliarioFind = Domiciliario::find($domiciliario);

            if (!$datos['licencia'] && !$datos['user_id']) {
                $dataDomiciliarioFind->disponibilidad = $datos['disponibilidad'];
                $dataDomiciliarioFind->save();
                return response()->json([
                    "data" => "Domiciliario actualizado con exito",
                    "request" => $datos
                ]);
            }

            $dataDomiciliarioFind->update($datos);
            return response()->json([
                "data" => "Domiciliario actualizado con exito",
                "request" => $datos
            ]);

        } catch (\Exception $exception) {
            return response()->json(["error" => $exception->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(domiciliario $domiciliario)
    {
        //
    }
}
