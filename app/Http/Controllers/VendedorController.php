<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Vendedor;
use App\Usuario;
use DB;

class VendedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {   
         $result = DB::select(DB::raw(
                        "Select v.*, u.usuario, u.clave, u.estado from vendedores as v ,usuarios as u
                         WHERE v.cedula = u.cedula"

                    ));
          return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $Vendedor = new Vendedor();
        $Vendedor->cedula = $data["cedula"];
        $Vendedor->nombres = $data["nombres"];
        $Vendedor->apellidos = $data["apellidos"];
        $Vendedor->direccion = $data["direccion"];
        $Vendedor->telefono = $data["telefono"];
        $Vendedor->estado = "ACTIVO";
        
        $Usuario = new Usuario();
        $Usuario->usuario = $data["correo"];
        $Usuario->clave = $data["clave"];
        $Usuario->rol = "VENDEDOR";
        $Usuario->cedula = $data["cedula"];
        $Usuario->estado = "ACTIVO";
       
     
        $Vendedor->save();
        $Usuario->save();
        return JsonResponse::create(array('message' => "Guardado Correctamente", "request" =>json_encode($data)), 200);  
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return Vendedor::select('*')->where("cedula",$id)->first();
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $Vendedor = Vendedor::find($id);
        $Vendedor->cedula = $data["cedula"];
        $Vendedor->nombres = $data["nombres"];
        $Vendedor->apellidos = $data["apellidos"];
        $Vendedor->direccion = $data["direccion"];
        $Vendedor->telefono = $data["telefono"];
        //$Vendedor->estado = "Activo";
        $Vendedor->save();
        return JsonResponse::create(array('message' => "Modificado Correctamente", "request" =>json_encode($data)), 200);  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $Vendedor = Vendedor::find($id);
         $Vendedor->estado = "Inactivo";
         $Vendedor->save();
         return JsonResponse::create(array('message' => "Eliminado Correctamente"), 200);
    }
}
