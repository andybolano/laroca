<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Subcategoria;
use App\Categoria;
use DB;

class SubcategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
 
          $result = DB::select(DB::raw(
                        "Select s.*, c.id as idCategoria, c.nombre as nombreCategoria from subcategorias as s ,categorias as c
                         WHERE s.categoria = c.id"

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
        $Subcategoria = new Subcategoria();
        $Subcategoria->nombre = $data["nombre"];
        $Subcategoria->categoria = $data["categoria"];
        $Subcategoria->save();
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
        //
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
        try {
            
            $data = $request->all();
            
            $subcategoria = Subcategoria::find($id);          
            $subcategoria->nombre = $data["nombre"];
            $subcategoria->categoria = $data["categoria"];
            $subcategoria->save();
            
        
            
        return JsonResponse::create(array('message' => "Subcategoria Modificada Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la subcategoria", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }

    public function getSubCategoria($idCategoria)
    {
        $result = DB::select(DB::raw(
                        "Select * from subcategorias WHERE categoria = '".$idCategoria."'"
                    ));
          return $result;
    }
}
