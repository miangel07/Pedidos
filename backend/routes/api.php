<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controladores
use App\Http\Controllers\DomiciliarioController;
use App\Http\Controllers\ReporteIncidenciaController;
use App\Http\Controllers\NovedadeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SolicitudController;
use App\Http\Controllers\ActividadeController;
use App\Http\Controllers\DashboardController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/domiciliario', [DomiciliarioController::class, 'store']);
Route::get('/domiciliario', [DomiciliarioController::class, 'index']);
Route::put('/domiciliario/{id}/', [DomiciliarioController::class, 'update']);
Route::get('/domiciliario/{id}/', [DomiciliarioController::class, 'show']);


//reportes de incidencias
Route::get('/incidencias', [ReporteIncidenciaController::class, 'index']);
Route::put('/incidencias/{id}/', [ReporteIncidenciaController::class, 'update']);
Route::post('/incidencias', [ReporteIncidenciaController::class, 'create']);


// novedades
Route::get('/novedades', [NovedadeController::class, 'index']);
Route::post('/novedades', [NovedadeController::class, 'store']);
Route::get('/novedades/{id}', [NovedadeController::class, 'show']);

//usuarios y login
Route::post('/usuario', [UserController::class, 'createUsurio']);
Route::get('/usuarioDomiciliario', [UserController::class, 'getDomiciliaro']);
Route::put('/usuario/{id}', [UserController::class, 'updateUsuario']);
Route::put('/usuarioEstado/{id}', [UserController::class, 'updateEstado']);
Route::get('/usuario', [UserController::class, 'index']);
Route::put('/cambiar-password', [AuthController::class,'cambioPassword']);
Route::post('/auth', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/info', [AuthController::class, 'getUser']);

// reportes
Route::get('/reportes/incidencias', [ReportController::class, 'getReporteIncidencias']);
Route::get('/reportes/novedades', [ReportController::class, 'getReporteEficienciaDomiciliarios']);



// solicitudes


Route::put('/solicitud/{id}', [SolicitudController::class, 'update']);
Route::post('/solicitud', [SolicitudController::class, 'create']);
Route::get('/solicitud', [SolicitudController::class, 'index']);
Route::get('/solicitud/{id}', [SolicitudController::class, 'show']);
Route::get('/solicitudUser/{id}', [SolicitudController::class, 'store']);



// graficas
Route::get('/grafica/incidencias', [ReportController::class, 'getGraficaReporteIncidencia']);
Route::get('/grafica/novedades', [ReportController::class, 'getEstadisticasEntregasMensuales']);

// actividades
Route::get('/actividades', [ActividadeController::class, 'index']);
Route::post('/actividades', [ActividadeController::class, 'store']);


// graficas para el inicio

    Route::get('/stats', [DashboardController::class, 'getDashboardStats']);
    Route::get('/estado-solicitudes', [DashboardController::class, 'getEstadoSolicitudes']);
    Route::get('/solicitudes-domiciliario', [DashboardController::class, 'getSolicitudesPorDomiciliario']);
    Route::get('/incidencias', [DashboardController::class, 'getIncidenciasPorTipo']);
    Route::get('/tendencia', [DashboardController::class, 'getTendenciaSolicitudes']);
    Route::get('/rendimiento-domiciliarios', [DashboardController::class, 'getRendimientoDomiciliarios']);