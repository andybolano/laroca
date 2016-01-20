<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Correo;
use DB;
class CorreoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
          return Correo::select('*')
                ->orderBy('titulo', 'asc')
                ->get();
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
        $Correo = new Correo();
        $Correo->titulo = $data["titulo"];
        $Correo->descripcion =  htmlspecialchars($data["descripcion"]);
        $Correo->save();
        
        
        $Correo->ruta = "http://".$_SERVER['HTTP_HOST'].'/laroca/img/correo/'.$Correo->id.".jpg";
        $Correo->save();
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/correo", $Correo->id.".jpg");
            }
            
        return JsonResponse::create(array('message' => "Guardado Correctamente", "request" =>json_encode($data)), 200);  
    }
    
 public function storeImage(Request $request){
        
        try {
            $data = $request->all();
            
            $id = $data["id"];
            
            $correo = Correo::find($id);
            $correo->ruta = "http://".$_SERVER['HTTP_HOST'].'/laroca/img/correo/'.$id.".jpg";
            $correo->save();
            
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/correo", $id.".jpg");
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
        $Correo = Correo::find($id);
        $Correo->titulo = $data["titulo"];
        $Correo->descripcion = $data["descripcion"];
        //$Correo->estado = "Activo";
        $Correo->save();
        return JsonResponse::create(array('message' => "Modificado Correctamente", "request" =>json_encode($data)), 200);  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function enviarCorreo(Request $request){
        try {
            
           $data = $request->all();

        $titulo = $data["titulo"];
        $descripcion = $data["descripcion"];
        $ruta = $data["ruta"];
        

   
      
        $mensaje = "
        <html>
        <head>
          <title>Grupo ferretero la roca</title>
        </head>
        <body>
        </br></br>
        <img style='width:200px;' src='http://www.gflarocaferreteria.com/public/images/logoComplete.png' alt=''/>
          <h2>$titulo</h2>
              </br>
              <img src='$ruta' style='padding:0;margin: 0;'  width='400px;' alt='' />
                   </br>
                   <p>$descripcion</p>
  
        </body>
        </html>
        ";
       
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
       
    
        
        $para = "";
          $clientes = DB::select(DB::raw(
                        "Select correo from clientes"
                    ));
          
           foreach ($clientes as $c) {
                $para =  $c->correo;
                
                  $cabeceras .= 'To: '.$titulo.' <'.$para.'>' . "\r\n";
                  $cabeceras .= 'From: GF La Roca Ferreteria <asesores@gflarocaferreteria.com>' . "\r\n";        

                  mail($para, $titulo, $mensaje, $cabeceras);
        
              }

      
        
       
        
        return JsonResponse::create(array('message' => $titulo. ":Correos han sido enviados exitosamente"), 200);  
          
            
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se enviar correo", "exception"=>$exc->getMessage()), 401);
        }
 
    }
    
    public function destroy($id)
    {
        $Correo = Correo::find($id);
        $Correo->estado = "Inactivo";
        return JsonResponse::create(array('message' => "Eliminado Correctamente"), 200);  
    }
}
