<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Producto;
use App\Subcategoria;
use App\Categoria;
use DB;

class ProductoController extends Controller
{
    

    
    public function show($idProducto){       
        return Producto::find($idProducto); 
    }
    
    public function getAll(){
        return Producto::select('id', 'nombre')
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
              $result = DB::select(DB::raw(
                        "Select p.*, c.id as idCategoria, c.nombre as nombreCategoria, s.id as idSubcategoria, s.nombre as nombreSubcategoria, m.id as idMarca, m.nombre as nombreMarca from productos as p, subcategorias as s ,categorias as c, marcas as m
                        WHERE p.categoria = c.id AND p.marca = m.id AND p.subcategoria = s.id"
                         

                    ));
          return $result;  
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    
    public function storeImage(Request $request){
        
        try {
            $data = $request->all();
            
            $id = $data["id"];
            
            $producto = Producto::find($id);
            $producto->ruta = "http://".$_SERVER['HTTP_HOST'].'/laroca/img/producto/'.$id.".jpg";
            $producto->save();
            
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/producto", $id.".jpg");
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
        
            $producto = new Producto();
            
            $producto->nombre = $data["nombre"];
            $producto->marca = $data["marca"];
            $producto->categoria = $data["categoria"];
            $producto->subcategoria = $data["subcategoria"];
            $producto->precio = $data["precio"];
            $producto->precioVenta = $data["precioVenta"];
            $producto->presentacion = $data["presentacion"];
            $producto->descripcion = $data["descripcion"];
            $producto->visitas = 0;
            $producto->calificacion = 0;
            $producto->estado = "ACTIVO";
            $producto->save();
            
            $producto->ruta = "http://".$_SERVER['HTTP_HOST'].'/laroca/img/producto/'.$producto->id.".jpg";
            $producto->save();
            
            if ($request->hasFile('imagen')) {
                $request->file('imagen')->move("../img/producto", $producto->id.".jpg");
            }
            
            return JsonResponse::create(array('message' => "Producto Guardada Correctamente", "request" => $producto), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar la producto", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            
            $producto = Producto::find($id);

            $producto->nombre = $data["nombre"];
  
            $producto->categoria = $data["categoria"];
            $producto->subcategoria = $data["subcategoria"];
            $producto->precio = $data["precio"];
            $producto->precioVenta = $data["precioVenta"];
            $producto->presentacion = $data["presentacion"];
            $producto->descripcion = $data["descripcion"];
            
            $producto->save();
            
        
            
        return JsonResponse::create(array('message' => "Producto Modificada Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la producto", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            $producto = Producto::find($id);
            $producto->delete();
            return JsonResponse::create(array('message' => "Producto Eliminada Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la producto", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }

    public function getProductosSubcategoria($idSubcategoria)
    {
        
          $result = DB::select(DB::raw(
                        "Select p.*, m.id as idMarca, m.nombre as nombreMarca from productos as p, marcas as m
                        WHERE  p.marca = m.id AND p.subcategoria = $idSubcategoria"
                         

                    ));
          return $result; 
          
          /*
        return Producto::select('*')->where('subcategoria',$idSubcategoria)->get();*/
    }
}
