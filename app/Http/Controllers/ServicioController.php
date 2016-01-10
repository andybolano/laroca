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
    public function solicitarServicio(Request $request){
        try {
            
           $data = $request->all();

        $nombre = $data["nombres"];
        $telefono = $data["telefono"];
        $correo = $data["correo"];
        $cedula = $data["cedula"];
        $direccion = $data["direccion"];
        $servicio = $data["servicio"];
        $imagen = $data["imagen"];
        
        $para  = "asesores@gflarocaferreteria.com";
        $título = 'Solicitud de servicio GF LA ROCA';
   
      
        $mensaje = "
        <html>
        <head>
          <title>Nueva solicitud de servicio/title>
        </head>
        <body>
        </br></br>
        <img style='width:200px;' src='http://www.gflarocaferreteria.com/public/images/logoComplete.png' alt=''/>
          
          <h1>Informacion Del Solicitante</h1>
          
          <br/>  
          <p>Cedula: $cedula</p>
          <p>Nombres: $nombre</p>
          <p>Telefono: $telefono</p>
          <p>Correo: $correo</p>
          <p>Direccion: $direccion</p>
              
          <br/>
          
          <h2>$servicio</h2>
              </br>
              <img src='$imagen' style='padding:0;margin: 0;'  width='400px;' alt='' />
  
        </body>
        </html>
        ";
       
        $cabeceras  = 'MIME-Version: 1.0' . "\r\n";
        $cabeceras .= 'Content-type: text/html; charset=UTF-8' . "\r\n";
       
        $cabeceras .= 'To: '.$nombre.' <'.$para.'>' . "\r\n";
        $cabeceras .= 'From: GF La Roca Ferreteria <asesores@gflarocaferreteria.com>' . "\r\n";        

        mail($para, $título, $mensaje, $cabeceras);
        
        return JsonResponse::create(array('message' => $nombre. ": Su solicitud ha sido enviada correctamente, Por favor este atento a su correo o teléfono móvil", "request" =>json_encode($data)), 200);  
          
            
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo solicitar servicio", "exception"=>$exc->getMessage()), 401);
        }
 
    }
    
    public function destroy($id)
    {
        $Servicio = Servicio::find($id);
        $Servicio->estado = "Inactivo";
        return JsonResponse::create(array('message' => "Eliminado Correctamente"), 200);  
    }
}
