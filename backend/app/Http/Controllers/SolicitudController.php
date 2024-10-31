<?php

namespace App\Http\Controllers;

use App\Models\Domiciliario;
use App\Models\solicitud;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * @OA\Get(
 *     path="/api/solicitudes",
 *     summary="Obtener todas las solicitudes",
 *     description="Retorna una lista de todas las solicitudes",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="direccion_recogida", type="string", example="Calle 123"),
 *                 @OA\Property(property="direccion_entrega", type="string", example="Calle 456"),
 *                 @OA\Property(property="descripcion_Producto", type="string", example="Paquete pequeño"),
 *                 @OA\Property(property="user_id", type="integer", example=1),
 *                 @OA\Property(property="domiciliario_id", type="integer", example=1),
 *                 @OA\Property(property="estado", type="string", example="pendiente"),
 *                 @OA\Property(property="fecha", type="string", format="date", example="2023-04-15")
 *             )
 *         )
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/solicitudes",
 *     summary="Crear una nueva solicitud",
 *     description="Crea una nueva solicitud en el sistema",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="direccion_recogida", type="string", example="Calle 123"),
 *             @OA\Property(property="direccion_entrega", type="string", example="Calle 456"),
 *             @OA\Property(property="descripcion_Producto", type="string", example="Paquete pequeño"),
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="fecha", type="string", format="date", example="2023-04-15")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Solicitud creada exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="mensaje", type="string", example="Solicitud creada con éxito")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="No hay domiciliarios disponibles",
 *         @OA\JsonContent(
 *             @OA\Property(property="mensaje", type="string", example="Lo siento no hay domiciliarios disponibles")
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/solicitudes/{idUser}",
 *     summary="Obtener solicitudes de un usuario",
 *     description="Retorna una lista de todas las solicitudes de un usuario específico",
 *     @OA\Parameter(
 *         name="idUser",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="direccion_recogida", type="string", example="Calle 123"),
 *                 @OA\Property(property="direccion_entrega", type="string", example="Calle 456"),
 *                 @OA\Property(property="descripcion_Producto", type="string", example="Paquete pequeño"),
 *                 @OA\Property(property="user_id", type="integer", example=1),
 *                 @OA\Property(property="domiciliario_id", type="integer", example=1),
 *                 @OA\Property(property="estado", type="string", example="pendiente"),
 *                 @OA\Property(property="fecha", type="string", format="date", example="2023-04-15")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="No hay solicitudes registradas",
 *         @OA\JsonContent(
 *             @OA\Property(property="mensaje", type="string", example="No hay solicitudes Registradas")
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/solicitudes/{id}",
 *     summary="Obtener una solicitud por ID",
 *     description="Retorna los detalles de una solicitud específica",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="direccion_recogida", type="string", example="Calle 123"),
 *             @OA\Property(property="direccion_entrega", type="string", example="Calle 456"),
 *             @OA\Property(property="descripcion_Producto", type="string", example="Paquete pequeño"),
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="domiciliario_id", type="integer", example=1),
 *             @OA\Property(property="estado", type="string", example="pendiente"),
 *             @OA\Property(property="fecha", type="string", format="date", example="2023-04-15")
 *         )
 *     )
 * )
 *
 * @OA\Put(
 *     path="/api/solicitudes/{id}",
 *     summary="Actualizar una solicitud",
 *     description="Actualiza los detalles de una solicitud existente",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="estado", type="string", example="asignado"),
 *             @OA\Property(property="domiciliario", type="integer", example=1)
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Solicitud actualizada exitosamente",
 *         @OA\JsonContent(
 *             @OA\Property(property="mensaje", type="string", example="Solicitud Asignada")
 *         )
 *     )
 * )
 */


class SolicitudController extends Controller
{

    private string $mensaje;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return solicitud::getSolicitudes();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        /*  protected $fillable = ['direccion_recogida','direccion_entrega','user_id','domiciliario_id','estado','fecha']; */
        try {
            $datos = $request->except(['_token', '_method']);

            $domiciliariosDisponibles = Domiciliario::where('disponibilidad', 'disponible')
                ->whereHas('user', function ($query) {
                    $query->where('estado', 'activo');
                })
                ->get();

            if ($domiciliariosDisponibles->isEmpty()) {
                return response()->json([
                    "mensaje" => "Lo siento no hay domiciliarios disponibles",
                ], 400);
            }
            $domiciliarioSeleccionado = $domiciliariosDisponibles->random();

            solicitud::create([
                'direccion_recogida' => $datos['direccion_recogida'],
                'direccion_entrega' => $datos['direccion_recogida'],
                'descripcion_Producto' => $datos['descripcion_Producto'],
                'user_id' => $datos['user_id'],
                'domiciliario_id' => $domiciliarioSeleccionado->id,
                'fecha' => $datos['fecha'],
            ]);

            return response()->json([
                "mensaje" => "Solicitud creada con exito",
            ], 201);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($idUser)
    {
        try {

            $results = solicitud::with(['domiciliario.user'])->where('user_id', $idUser)->get();

            if ($results->isEmpty()) {
                return response()->json([
                    "mensaje" => "No hay solicitudes Registradas",
                ], 404);
            }


            $results = $results->map(function ($solicitud) {
                return [
                    'id' => $solicitud->id,
                    'direccion_recogida' => $solicitud->direccion_recogida,
                    'direccion_entrega' => $solicitud->direccion_entrega,
                    'descripcion_Producto' => $solicitud->descripcion_Producto,
                    'estado' => $solicitud->estado,
                    'fecha' => $solicitud->fecha,
                    'domiciliario_nombre' => $solicitud->domiciliario->user->nombre ?? null,
                    'domiciliario_id' => $solicitud->domiciliario_id,
                    'created_at' => $solicitud->created_at,
                ];
            });

            return response()->json($results, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($solicitud)
    {
        return solicitud::find($solicitud);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(solicitud $solicitud)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $solicitud)
    {
        try {
            //return $solicitud;
            $datos = $request->except(['_token', '_method']);


            $solicitudIdFind = solicitud::find($solicitud);


            if (strtolower($datos['estado']) === 'cancelado') {
                $solicitudIdFind->estado = 'cancelado';
                $solicitudIdFind->save();
                $this->mensaje = "Solicitud Cancelada";


                return response()->json(["mensaje" => $this->mensaje], 200);
            }

            if (strtolower($datos['estado']) === 'asignado' || strtolower($datos['estado']) === 'reprogramado') {

                $datosDomiciliario = Domiciliario::where("disponibilidad", "disponible")->get();

                $idDomiciliario = $datosDomiciliario[rand(0, count($datosDomiciliario) - 1)]['id'];

                $solicitudIdFind->estado = $datos['estado'];
                $solicitudIdFind->domiciliario_id = $idDomiciliario;
                $solicitudIdFind->save();

                $this->mensaje = "Solicitud Reprogramada";


                return response()->json([
                    "mensaje" => $this->mensaje
                ], 200);
            }

            $solicitudIdFind->estado = $datos['estado'];

              $solicitudIdFind->domiciliario_id = $datos['domiciliario'];
               $solicitudIdFind->save();

             return response()->json([
                   "mensaje" => "Solicitud" . " " . $datos['estado']
               ], 200);
        } catch (\Exception $exception) {
            return $exception->getMessage();
        }
    }
}
