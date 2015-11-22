<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Marca;

class MarcaController extends Controller
{
    

    
    public function show($idMarca){       
        return Marca::find($idMarca); 
    }
    
    public function getAll(){
        return Marca::select('id', 'nombre')
                ->orderBy('nombre', 'asc')
                ->get();
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return Marca::all();   
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    
    public function storeImage(Request $request){
        
        try {
            $data = $request->all();
            
            $id = $data["id"];
            
            $marca = Marca::find($id);
            $marca->ruta = "http://".$_SERVER['HTTP_HOST'].'/laroca/img/marca/'.$id.".jpg";
            $marca->save();
            
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/marca", $id.".jpg");
                return JsonResponse::create(array('message' => "Imagen Guardada Correctamente","request"=>  json_encode($data)), 200);
            }
            return JsonResponse::create(array('message' => "Error al Guardar imagen","request"=>  json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar La imagen", "exception"=>$exc->getMessage()), 401);
        }
        
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        try {           
            $data = $request->all();
        
            $marca = new Marca();
            $marca->nombre = $data["nombre"];
            
            $marca->save();
            
            $marca->ruta = "http://".$_SERVER['HTTP_HOST'].'/laroca/img/marca/'.$marca->id.".jpg";
            $marca->save();
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/marca", $marca->id.".jpg");
            }
            
            return JsonResponse::create(array('message' => "Marca Guardada Correctamente", "request" => $marca), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
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
            
            $marca = Marca::find($id);

            $marca->nombre = $data["nombre"];
            
            $marca->save();
            
        
            
        return JsonResponse::create(array('message' => "Marca Modificada Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
        try {
            $marca = Marca::find($id);
            $marca->delete();
            return JsonResponse::create(array('message' => "Marca Eliminada Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
