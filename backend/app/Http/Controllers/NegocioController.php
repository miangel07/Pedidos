<?php

namespace App\Http\Controllers;

use App\Models\negocio;
use Illuminate\Http\Request;

class NegocioController extends Controller
{
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
    public function show($userId)
    {
       
        $negocio = Negocio::where('user_id', $userId)->first();

        if (!$negocio) {
            return response()->json([
                'success' => false,
                'message' => 'Negocio no encontrado.',
            ], 404);
        }

        return response()->json([
            
             $negocio,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(negocio $negocio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, negocio $negocio)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(negocio $negocio)
    {
        //
    }
}
