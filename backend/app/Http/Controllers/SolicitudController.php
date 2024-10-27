<?php

namespace App\Http\Controllers;

use App\Models\Domiciliario;
use App\Models\solicitud;
use App\Models\User;
use Illuminate\Http\Request;


class SolicitudController extends Controller
{

    private string $mensaje;

    /**
     * Display a listing of the resource.
     */
    public function index() {
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
                'direccion_entrega' => $datos['direccion_entrega'],
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($solicitud) {
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

                $idDomiciliario = $datosDomiciliario[count($datosDomiciliario) - 1]['id'];

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
