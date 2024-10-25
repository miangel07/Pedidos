<?php

namespace App\Http\Controllers;

use App\Models\reporte_incidencia;
use Illuminate\Http\Request;

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
