<?php

namespace App\Http\Controllers;

use App\Models\Domiciliario;
use App\Models\novedade;
use Illuminate\Http\Request;

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
    public function store(Request $request) {
        try {

            $domiciliarioUser = Domiciliario::where('user_id', $request->domiciliario_id)->get();

            // return $domiciliarioUser[0]['id'];

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
            ],202);

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
    public function show($novedade) {
        try {
            $novedadeId = novedade::with('solicitud')->find($novedade);
            return response()->json($novedadeId);
        }catch (\Exception $e) {
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
