<?php

namespace App\Http\Controllers;

use App\Models\solicitud;
use App\Models\Domiciliario;
use App\Models\reporte_incidencia;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Obtiene estadísticas del estado de las solicitudes
     */
    public function getEstadoSolicitudes()
    {
        $estadisticas = solicitud::select('estado', DB::raw('COUNT(*) as total'))
            ->groupBy('estado')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $estadisticas
        ]);
    }

    /**
     * Obtiene el número de solicitudes por domiciliario
     */
    public function getSolicitudesPorDomiciliario()
    {
        $estadisticas = solicitud::select(
            'domiciliarios.id',
            'users.nombre as nombre_domiciliario',
            DB::raw('COUNT(solicituds.id) as total_solicitudes'),
            DB::raw('COUNT(CASE WHEN solicituds.estado = "completada" THEN 1 END) as solicitudes_completadas')
        )
            ->join('domiciliarios', 'domiciliarios.id', '=', 'solicituds.domiciliario_id')
            ->join('users', 'users.id', '=', 'domiciliarios.user_id')
            ->groupBy('domiciliarios.id', 'users.nombre')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $estadisticas
        ]);
    }

    /**
     * Obtiene estadísticas de incidencias por tipo
     */
    public function getIncidenciasPorTipo()
    {
        $estadisticas = reporte_incidencia::select(
            'tipo_incidencia',
            DB::raw('COUNT(*) as total'),
            DB::raw('COUNT(CASE WHEN estado = "resuelto" THEN 1 END) as resueltas')
        )
            ->groupBy('tipo_incidencia')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $estadisticas
        ]);
    }

    /**
     * Obtiene la tendencia de solicitudes por día en el último mes
     */
    public function getTendenciaSolicitudes()
    {
        $fechaInicio = Carbon::now()->subDays(30);
        
        $tendencia = solicitud::select(
            DB::raw('DATE(fecha) as fecha'),
            DB::raw('COUNT(*) as total_solicitudes')
        )
            ->where('fecha', '>=', $fechaInicio)
            ->groupBy('fecha')
            ->orderBy('fecha')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $tendencia
        ]);
    }

    /**
     * Obtiene todas las estadísticas para el dashboard
     */
    public function getDashboardStats()
    {
        $estadoSolicitudes = $this->getEstadoSolicitudes();
        $solicitudesPorDomiciliario = $this->getSolicitudesPorDomiciliario();
        $incidenciasPorTipo = $this->getIncidenciasPorTipo();
        $tendenciaSolicitudes = $this->getTendenciaSolicitudes();

        // Estadísticas generales
        $totalSolicitudes = solicitud::count();
        $totalDomiciliarios = Domiciliario::count();
        $totalIncidencias = reporte_incidencia::count();
        $solicitudesHoy = solicitud::whereDate('fecha', Carbon::today())->count();

        return response()->json([
            'success' => true,
            'data' => [
                'resumen' => [
                    'total_solicitudes' => $totalSolicitudes,
                    'total_domiciliarios' => $totalDomiciliarios,
                    'total_incidencias' => $totalIncidencias,
                    'solicitudes_hoy' => $solicitudesHoy
                ],
                'estado_solicitudes' => $estadoSolicitudes->original['data'],
                'solicitudes_por_domiciliario' => $solicitudesPorDomiciliario->original['data'],
                'incidencias_por_tipo' => $incidenciasPorTipo->original['data'],
                'tendencia_solicitudes' => $tendenciaSolicitudes->original['data']
            ]
        ]);
    }

    /**
     * Obtiene estadísticas de rendimiento de domiciliarios
     */
    public function getRendimientoDomiciliarios()
    {
        $rendimiento = Domiciliario::select(
            'domiciliarios.id',
            'users.nombre',
            DB::raw('COUNT(DISTINCT solicituds.id) as total_servicios'),
            DB::raw('AVG(CASE WHEN solicituds.estado = "completada" THEN 1 ELSE 0 END) * 100 as tasa_completacion'),
            DB::raw('COUNT(DISTINCT ri.id) as total_incidencias')
        )
            ->join('users', 'users.id', '=', 'domiciliarios.user_id')
            ->leftJoin('solicituds', 'solicituds.domiciliario_id', '=', 'domiciliarios.id')
            ->leftJoin('reporte_incidencias as ri', 'ri.solicitud_id', '=', 'solicituds.id')
            ->groupBy('domiciliarios.id', 'users.nombre')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $rendimiento
        ]);
    }
}