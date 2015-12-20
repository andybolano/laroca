<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Pedido;
use Carbon\Carbon;
use App\Detalle;
use App\Producto;
use DB;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
         $result = DB::select(DB::raw(
                        "Select p.*,p.estado as estadoPedido, c.*, p.id as idPedido  from pedidos as p
                         INNER JOIN clientes as c ON p.idCliente = c.cedula"

                    ));
          return $result;
    }
     public function loadPedidos($estado)
    {
         $result = DB::select(DB::raw(
                        "Select p.*,p.estado as estadoPedido, c.*, p.id as idPedido  from pedidos as p
                         INNER JOIN clientes as c ON p.idCliente = c.cedula WHERE p.estado = '$estado'"

                    ));
          return $result;
    }
    public function detallePedido($idPedido){
         $result = DB::select(DB::raw(
                        "Select  p.id, dp.*, productos.* , marcas.nombre as nombreMarca, marcas.id, marcas.ruta as imagenMarca from pedidos as p 
                         INNER JOIN detallesPedidos as dp ON  dp.idPedido = p.id
                         INNER JOIN productos ON  productos.id =  dp.idProducto 
                         INNER JOIN marcas ON marcas.id = productos.marca
                            WHERE dp.idPedido = '$idPedido'"
                    

                    ));
          return $result;
    }

    public function alterEstado($idPedido,$estado){
         try {
 
            $pedido = Pedido::find($idPedido);
            $pedido->estado = $estado;
            $pedido->save();

        return JsonResponse::create(array('message' => "Estado Actualizado Correctamente",200));
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo cambiar el estado del pedido", "exception"=>$exc->getMessage(), 401));
        }
  
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
       try {  
        $data = $request->all();
        $date = Carbon::now();
        $pedido = new Pedido();
        $pedido->fecha = $date->toDateString();
        $pedido->idCliente = $data["idCliente"];
        $pedido->valor = $data["total"];
        $pedido->estado = "Espera";
        $pedido->domicilio = $data["domicilio"];
        $pedido->save();
        $detalles = json_decode($data["detalles"]);
        foreach ($detalles as $d) {
            $detalle = new Detalle();
            $detalle->idPedido = $pedido->id;
            $detalle->idProducto = $d->idProducto;
            $detalle->cantidad = $d->cantidad;
            $detalle->precioProducto = $d->precio;
            $detalle->subTotal = $d->subtotal;
            $detalle->save();
            $producto = Producto::find($detalle->idProducto);
            $cantidad = $producto->visitas;
            $producto->visitas = $cantidad + 1;
            $producto->save();
              
        }
          return JsonResponse::create(array('message' => "Pedido Enviado correctamente"), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo enviar el pedido", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
        //
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
