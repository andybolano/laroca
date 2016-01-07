<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Servicio;

class ServicioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return Servicio::select('*')->where("estado","Activo")->get();
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
        $Servicio = new Servicio();
        $Servicio->nombre = $data["nombre"];
        $Servicio->descripcion =  htmlspecialchars($data["descripcion"]);
        $Servicio->estado = "Activo";
        $Servicio->save();
        
        
        $Servicio->ruta = "http://".$_SERVER['HTTP_HOST'].'/laroca/img/servicio/'.$Servicio->id.".jpg";
            $Servicio->save();
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/servicio", $Servicio->id.".jpg");
            }
            
        return JsonResponse::create(array('message' => "Guardado Correctamente", "request" =>json_encode($data)), 200);  
    }
    
 public function storeImage(Request $request){
        
        try {
            $data = $request->all();
            
            $id = $data["id"];
            
            $servicio = Servicio::find($id);
            $servicio->ruta = "http://".$_SERVER['HTTP_HOST'].'/laroca/img/servicio/'.$id.".jpg";
            $servicio->save();
            
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/servicio", $id.".jpg");
                return JsonResponse::create(array('message' => "Imagen Guardada Correctamente","request"=>  json_encode($data)), 200);
            }
            return JsonResponse::create(array('message' => "Error al Guardar imagen","request"=>  json_encode($data)), 200);
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar La imagen", "exception"=>$exc->getMessage()), 401);
        }
        
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
        $data = $request->all();
        $Servicio = Servicio::find($id);
        $Servicio->nombre = $data["nombre"];
        $Servicio->descripcion = $data["descripcion"];
        //$Servicio->estado = "Activo";
        $Servicio->save();
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
        $Servicio = Servicio::find($id);
        $Servicio->estado = "Inactivo";
        return JsonResponse::create(array('message' => "Eliminado Correctamente"), 200);  
    }
}
