<?php

namespace App\Http\Controllers;

use App\Models\reporte_incidencia;
use Illuminate\Http\Request;

class ReporteIncidenciaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
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
    public function update(Request $request, reporte_incidencia $reporte_incidencia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(reporte_incidencia $reporte_incidencia)
    {
        //
    }
}
