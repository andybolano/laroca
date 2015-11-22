<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Usuario;
use DB;

class UsuarioController extends Controller
{
     public function autenticar(Request $request){
        try {                                 
           $data = $request->all();
            $usuario = $data['username'];
             $clave = $data['pass'];
              $user = DB::select(DB::raw(
                        "Select usuario,clave,rol,cedula,estado from usuarios 
                         WHERE usuario =  '".$usuario."'  AND clave = '".$clave."'" 
                    ));      
           if (empty($user)){
                return JsonResponse::create(array('message' => "KO", "request" =>json_encode('Datos Incorrectos')), 200);
            }else{     
                 return JsonResponse::create(array('message' =>"OK", "request" =>json_encode($user)), 200);
              
            }
        
           
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se puedo autenticar el usuario", "request" =>json_encode($data)), 401);
        }
    }
}