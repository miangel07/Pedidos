<?php

namespace App\Http\Controllers;


use App\Models\Domiciliario;
use Illuminate\Http\Request;


class DomiciliarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Domiciliario::getDomiciliario();
        //return Domiciliario::getDomiciliario();


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

//        $this->validate ($request,[
//            'licencia' => 'required',
//            'user_id' => 'required',
//            'disponibilidad' => 'required',
//        ]);

        Domiciliario::create([
            'licencia' => $request->licencia,
            'user_id' => $request->user_id,
            'disponibilidad' => $request->disponibilidad,
        ]);

        return response()->json([
            "data" => "Domiciliario creado con exito",
            "request" => $request
        ], 201);

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
    public function show(domiciliario $domiciliario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(domiciliario $domiciliario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $domiciliario) {
        try {
            $datos = $request->except('_token', '_method');
            $dataDomiciliarioFind = Domiciliario::find($domiciliario);

            if (!$datos['licencia'] && !$datos['user_id']) {
                $dataDomiciliarioFind->disponibilidad = $datos['disponibilidad'];
                $dataDomiciliarioFind->save();
                return response()->json([
                    "data" => "Domiciliario actualizado con exito",
                    "request" => $datos
                ]);
            }

            $dataDomiciliarioFind->update($datos);
            return response()->json([
                "data" => "Domiciliario actualizado con exito",
                "request" => $datos
            ]);

        } catch (\Exception $exception) {
            return response()->json(["error" => $exception->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(domiciliario $domiciliario)
    {
        //
    }
}
