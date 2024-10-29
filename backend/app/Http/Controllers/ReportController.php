<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\reporte_incidencia;
use App\Models\User;
use App\Models\solicitud;
use App\Models\novedade;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

/**
 * @OA\Get(
 *     path="/api/reportes/incidencias",
 *     summary="Obtener reporte de incidencias",
 *     description="Retorna una lista de todas las incidencias reportadas",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="fecha_incidencia", type="string", format="date-time", example="2023-04-15 12:34:56"),
 *                 @OA\Property(property="fecha_actualizacion", type="string", format="date-time", example="2023-04-15 12:35:10"),
 *                 @OA\Property(property="tipo_incidencia", type="string", example="Retraso en la entrega"),
 *                 @OA\Property(property="descripcion", type="string", example="El domiciliario llegó 2 horas tarde"),
 *                 @OA\Property(property="nombre", type="string", example="Juan Pérez"),
 *                 @OA\Property(property="estado", type="string", example="Pendiente"),
 *                 @OA\Property(property="tiempo_entrega", type="string", example="2 días y 3 horas")
 *             ))
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/reportes/eficiencia-domiciliarios",
 *     summary="Obtener reporte de eficiencia de domiciliarios",
 *     description="Retorna un reporte de la eficiencia de los domiciliarios",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="nombre_domiciliario", type="string", example="Juan Pérez"),
 *                 @OA\Property(property="total_solicitudes", type="integer", example=100),
 *                 @OA\Property(property="entregas_exitosas", type="integer", example=90),
 *                 @OA\Property(property="total_novedades", type="integer", example=10),
 *                 @OA\Property(property="tiempo_promedio_horas", type="number", format="float", example=2.5),
 *                 @OA\Property(property="porcentaje_exito", type="number", format="float", example=90.0),
 *                 @OA\Property(property="porcentaje_disponibilidad", type="number", format="float", example=85.0),
 *                 @OA\Property(property="score_eficiencia", type="number", format="float", example=85.0)
 *             ))
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/reportes/incidencias/grafica",
 *     summary="Obtener gráfica de reporte de incidencias",
 *     description="Retorna los datos para generar una gráfica de incidencias",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="tipo_incidencia", type="string", example="Retraso en la entrega"),
 *                 @OA\Property(property="estado", type="string", example="Pendiente"),
 *                 @OA\Property(property="total", type="integer", example=15)
 *             ))
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/reportes/entregas-mensuales",
 *     summary="Obtener estadísticas de entregas mensuales",
 *     description="Retorna las estadísticas de entregas mensuales",
 *     @OA\Response(
 *         response=200,
 *         description="Operación exitosa",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(property="data", type="array", @OA\Items(
 *                 @OA\Property(property="mes", type="string", example="2023-04"),
 *                 @OA\Property(property="total_entregas", type="integer", example=50),
 *                 @OA\Property(property="entregas_completadas", type="integer", example=45),
 *                 @OA\Property(property="entregas_pendientes", type="integer", example=5),
 *                 @OA\Property(property="total_novedades", type="integer", example=2),
 *                 @OA\Property(property="tiempo_promedio_horas", type="number", format="float", example=2.5),
 *                 @OA\Property(property="tasa_exito", type="number", format="float", example=90.0)
 *             ))
 *         )
 *     )
 * )
 */


class ReportController extends Controller
{
    public function getReporteIncidencias()
    {
        $reportes = reporte_incidencia::select(
                'reporte_incidencias.fecha_incidencia',
                'reporte_incidencias.updated_at',
                'reporte_incidencias.tipo_incidencia',
                'reporte_incidencias.descripcion',
                'users.nombre',
                'reporte_incidencias.estado'
            )
            ->selectRaw('
                TIMESTAMPDIFF(HOUR, reporte_incidencias.fecha_incidencia, reporte_incidencias.updated_at) as horas_totales,
                TIMESTAMPDIFF(DAY, reporte_incidencias.fecha_incidencia, reporte_incidencias.updated_at) as dias_totales
            ')
            ->join('users', 'users.id', '=', 'reporte_incidencias.user_id')
            ->get()
            ->map(function($reporte) {
                // Calculamos días y horas
                $horasTotales = max(0, $reporte->horas_totales);
                $dias = floor($horasTotales / 24);
                $horas = $horasTotales % 24;
                
                // Formateamos el tiempo de entrega con días y horas
                $tiempoEntrega = [];
                if ($dias > 0) {
                    $tiempoEntrega[] = $dias . ($dias == 1 ? " día" : " días");
                }
                if ($horas > 0 || count($tiempoEntrega) == 0) {
                    $tiempoEntrega[] = $horas . ($horas == 1 ? " hora" : " horas");
                }
                $reporte->tiempo_entrega = implode(" y ", $tiempoEntrega);
                
                // Formateamos las fechas para mostrar fecha y hora
                $reporte->fecha_incidencia = Carbon::parse($reporte->fecha_incidencia)->format('Y-m-d H:i:s');
                $reporte->fecha_actualizacion = Carbon::parse($reporte->updated_at)->format('Y-m-d H:i:s');
                
                // Eliminamos los campos que ya no necesitamos
                unset($reporte->updated_at);
                unset($reporte->horas_totales);
                unset($reporte->dias_totales);
                
                return $reporte;
            });
    
        return response()->json([
            'status' => 'success',
            'data' => $reportes
        ], 200);
    }


    public function getReporteEficienciaDomiciliarios()
    {
        $eficiencia = DB::table('domiciliarios')
            ->select([
                'users.nombre as nombre_domiciliario',
                DB::raw('COUNT(DISTINCT s.id) as total_solicitudes'),
                DB::raw('COUNT(DISTINCT CASE WHEN s.estado = "completado" AND n.id IS NULL THEN s.id END) as entregas_exitosas'),
                DB::raw('COUNT(DISTINCT n.id) as total_novedades'),
                DB::raw('AVG(CASE 
                    WHEN s.estado = "completado" 
                    THEN TIMESTAMPDIFF(HOUR, s.fecha, COALESCE(n.fecha_reporte, s.updated_at)) 
                    END) as tiempo_promedio_horas'),
                DB::raw('(COUNT(DISTINCT CASE WHEN s.estado = "completado" AND n.id IS NULL THEN s.id END) * 100.0 / 
                        NULLIF(COUNT(DISTINCT s.id), 0)) as porcentaje_exito'),
                // Calculamos la disponibilidad del domiciliario
                DB::raw('SUM(CASE WHEN domiciliarios.disponibilidad = "disponible" THEN 1 ELSE 0 END) * 100.0 / 
                        COUNT(*) as porcentaje_disponibilidad')
            ])
            ->join('users', 'users.id', '=', 'domiciliarios.user_id')
            ->leftJoin('solicituds as s', 's.domiciliario_id', '=', 'domiciliarios.id')
            ->leftJoin('novedades as n', function($join) {
                $join->on('n.solicitud_id', '=', 's.id')
                     ->on('n.domiciliario_id', '=', 'users.id');
            })
            ->where('users.TipoUsuario', 'domiciliario')
            ->groupBy('domiciliarios.id', 'users.id', 'users.nombre')
            ->get()
            ->map(function($domiciliario) {
                // Calculamos el score de eficiencia
                $scoreEficiencia = $this->calcularScoreEficiencia(
                    $domiciliario->porcentaje_exito ?? 0,
                    $domiciliario->tiempo_promedio_horas ?? 0,
                    $domiciliario->total_solicitudes ?? 0,
                    $domiciliario->porcentaje_disponibilidad ?? 0
                );
    
                return [
                    'nombre_domiciliario' => $domiciliario->nombre_domiciliario,
                    'total_solicitudes' => $domiciliario->total_solicitudes,
                    'entregas_exitosas' => $domiciliario->entregas_exitosas,
                    'total_novedades' => $domiciliario->total_novedades,
                    'tiempo_promedio_horas' => round($domiciliario->tiempo_promedio_horas ?? 0, 2),
                    'porcentaje_exito' => round($domiciliario->porcentaje_exito ?? 0, 2),
                    'porcentaje_disponibilidad' => round($domiciliario->porcentaje_disponibilidad ?? 0, 2),
                    'score_eficiencia' => round($scoreEficiencia, 2)
                ];
            });
    
        return response()->json([
            'status' => 'success',
            'data' => $eficiencia
        ], 200);
    }
    
    private function calcularScoreEficiencia($porcentajeExito, $tiempoPromedio, $totalSolicitudes, $disponibilidad)
    {
        // Normalizamos el tiempo promedio (asumiendo que 24 horas es el máximo aceptable)
        $tiempoNormalizado = max(0, (24 - min($tiempoPromedio, 24)) / 24 * 100);
        
        // Normalizamos el total de solicitudes (asumiendo un máximo de 100 solicitudes como referencia)
        $solicitudesNormalizadas = min(($totalSolicitudes / 100) * 100, 100);
        
        // Calculamos el score final con los siguientes pesos:
        // - 35% porcentaje de éxito
        // - 25% tiempo de entrega
        // - 20% volumen de solicitudes
        // - 20% disponibilidad
        return (
            ($porcentajeExito * 0.35) +
            ($tiempoNormalizado * 0.25) +
            ($solicitudesNormalizadas * 0.20) +
            ($disponibilidad * 0.20)
        );
    }


    public function getGraficaReporteIncidencia()
    {
        $reportes = reporte_incidencia::select(
                'reporte_incidencias.tipo_incidencia',
                'reporte_incidencias.estado',
                DB::raw('COUNT(*) as total')
            )
            ->groupBy('reporte_incidencias.tipo_incidencia', 'reporte_incidencias.estado')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $reportes
        ], 200);
    }


    public function getEstadisticasEntregasMensuales()
    {
        $estadisticas = DB::table('solicituds')
            ->select([
                DB::raw('DATE_FORMAT(solicituds.fecha, "%Y-%m") as mes'),
                DB::raw('COUNT(*) as total_entregas'),
                DB::raw('COUNT(CASE WHEN solicituds.estado = "completado" THEN 1 END) as entregas_completadas'),
                DB::raw('COUNT(CASE WHEN solicituds.estado = "pendiente" THEN 1 END) as entregas_pendientes'),
                DB::raw('COUNT(DISTINCT n.id) as total_novedades'),
                DB::raw('AVG(TIMESTAMPDIFF(HOUR, solicituds.fecha, 
                    CASE 
                        WHEN solicituds.estado = "completado" THEN solicituds.updated_at
                        ELSE NOW()
                    END)) as tiempo_promedio_horas')
            ])
            ->leftJoin('novedades as n', 'n.solicitud_id', '=', 'solicituds.id')
            ->groupBy(DB::raw('DATE_FORMAT(solicituds.fecha, "%Y-%m")'))
            ->orderBy('mes', 'asc')
            ->get()
            ->map(function($item) {
                return [
                    'mes' => $item->mes,
                    'total_entregas' => $item->total_entregas,
                    'entregas_completadas' => $item->entregas_completadas,
                    'entregas_pendientes' => $item->entregas_pendientes,
                    'total_novedades' => $item->total_novedades,
                    'tiempo_promedio_horas' => round($item->tiempo_promedio_horas ?? 0, 2),
                    'tasa_exito' => round(($item->entregas_completadas / $item->total_entregas) * 100, 2)
                ];
            });
    
        return response()->json([
            'status' => 'success',
            'data' => $estadisticas
        ], 200);
    }


}