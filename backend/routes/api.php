<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controladores
use App\Http\Controllers\DomiciliarioController;
use App\Http\Controllers\ReporteIncidenciaController;
use App\Http\Controllers\NovedadeController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/domiciliario', [DomiciliarioController::class, 'store']);
Route::get('/domiciliario',[DomiciliarioController::class,'index']);
Route::put('/domiciliario/{id}/', [DomiciliarioController::class, 'update']);


//reportes de incidencias
Route::get('/incidencias',[ReporteIncidenciaController::class,'index']);
Route::put('/incidencias/{id}/', [ReporteIncidenciaController::class, 'update']);


// novedades
Route::get('/novedades',[NovedadeController::class,'index']);
