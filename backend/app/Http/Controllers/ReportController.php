<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\reporte_incidencia;
use App\Models\User;
use App\Models\solicitud;
use App\Models\novedade;

class ReportController extends Controller
{
    public function getReporteIncidencias()
    {
        $reportes = reporte_incidencia::select(
                'reporte_incidencias.fecha_incidencia',
                'reporte_incidencias.tipo_incidencia',
                'reporte_incidencias.descripcion',
                'users.nombre',
                'solicituds.estado'
            )
            ->join('users', 'users.id', '=', 'reporte_incidencias.user_id')
            ->join('solicituds', 'solicituds.id', '=', 'reporte_incidencias.solicitud_id')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $reportes
        ], 200);
    }

    public function getReporteNovedades()
    {
        $novedades = novedade::select(
                'novedades.descripcion',
                'novedades.estado',
                'novedades.fecha_reporte',
                'users.nombre',
                'solicituds.direccion_recogida',
                'solicituds.direccion_entrega'
            )
            ->join('users', 'users.id', '=', 'novedades.domiciliario_id')
            ->join('solicituds', 'solicituds.id', '=', 'novedades.solicitud_id')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $novedades
        ], 200);
    }
}