<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Cliente;
use App\Municipio;
use App\Departamento;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return Cliente::select('*')
                ->orderBy('nombres', 'asc')
                ->get();
    }
    
    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $cliente = new Cliente();
        $cliente->cedula = $data["cedula"];
        $cliente->nombres = $data["nombres"];
        $cliente->apellidos = $data["apellidos"];
        $cliente->direccion = $data["direccion"];
        $cliente->telefono = $data["telefono"];
        $cliente->correo = $data["correo"];
        $cliente->estado = "Activo";
        $busqueda = Cliente::select("cedula")
                    ->where("cedula",$data["cedula"])
                    ->first();
        if ($busqueda == null) {
            $cliente->save();
            return JsonResponse::create(array('message' => "Guardado Correctamente", "cedula" => $cliente->cedula), 200);  
        }else{
           return JsonResponse::create(array('message' => "Existe", "cedula" => $cliente->cedula), 200);   
        }
       

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Cliente::select('*')
                        ->where("cedula",$id)
                        ->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getDepartamentos()
    {
        return Departamento::All();
    }

    public function getMunicipios($idDepartamento)
    {
        return Municipio::select("*")
                        ->where("idDepartamento", $idDepartamento)
                        ->get();
    }

}
