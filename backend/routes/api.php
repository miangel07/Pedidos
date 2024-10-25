<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controladores
use App\Http\Controllers\DomiciliarioController;
use App\Http\Controllers\ReporteIncidenciaController;
use App\Http\Controllers\NovedadeController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/domiciliario', [DomiciliarioController::class, 'store']);
Route::get('/domiciliario', [DomiciliarioController::class, 'index']);
Route::put('/domiciliario/{id}/', [DomiciliarioController::class, 'update']);


//reportes de incidencias
Route::get('/incidencias', [ReporteIncidenciaController::class, 'index']);
Route::put('/incidencias/{id}/', [ReporteIncidenciaController::class, 'update']);


// novedades
Route::get('/novedades', [NovedadeController::class, 'index']);

//usuarios y login 
Route::post('/usuario', [UserController::class, 'createUsurio']);
Route::get('/usuario', [UserController::class, 'index']);
Route::post('/auth', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/info', [AuthController::class, 'getUser']);
