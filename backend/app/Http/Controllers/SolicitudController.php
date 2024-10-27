<?php

namespace App\Http\Controllers;

use App\Models\Domiciliario;
use App\Models\solicitud;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{

    private string $mensaje;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(solicitud $solicitud)
    {
        //
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
