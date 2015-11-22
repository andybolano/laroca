<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Categoria;
use DB;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
             $result = DB::select(DB::raw(
                        "Select * from categorias ORDER BY id DESC"
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
        $Categoria = new Categoria();
        $Categoria->nombre = $data["nombre"];

        $Categoria->save();
        return JsonResponse::create(array('message' => "Guardado Correctamente", "request" =>json_encode($data)), 200);  
    }
    
    public function getSubcategorias($idCategoria){
         $result = DB::select(DB::raw(
                        "Select s.* from subcategorias as s
                         WHERE s.categoria = $idCategoria" 

                    ));
          return $result;
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
            
            $categoria = Categoria::find($id);

            $categoria->nombre = $data["nombre"];
            
            $categoria->save();
            
        
            
        return JsonResponse::create(array('message' => "Categoria Modificada Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la categoria", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
}
