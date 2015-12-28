<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\PedidoVendedor;
use Carbon\Carbon;
use App\DetallePedidoVendedor;
use App\Producto;
use DB;
class PedidoVendedorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    
public function loadPedidos($estado)
    {
         $result = DB::select(DB::raw(
                        "Select p.*,p.estado as estadoPedido, c.*, p.id as idPedido  from pedidosvendedores as p
                         INNER JOIN vendedores as c ON p.idVendedor = c.cedula WHERE p.estado = '$estado'"

                    ));
          return $result;
    }
     public function detallePedido($idPedido){
         $result = DB::select(DB::raw(
                        "Select  p.id, dp.*, productos.* , marcas.nombre as nombreMarca, marcas.id, marcas.ruta as imagenMarca from pedidosvendedores as p 
                         INNER JOIN detallespedidosvendedores as dp ON  dp.idPedidoVendedores = p.id
                         INNER JOIN productos ON  productos.id =  dp.idProducto 
                         INNER JOIN marcas ON marcas.id = productos.marca
                            WHERE dp.idPedidoVendedores = '$idPedido'"
                    

                    ));
          return $result;
    }
    
       public function alterEstado($idPedido,$estado){
         try {
 
            $pedido = PedidoVendedor::find($idPedido);
            $pedido->estado = $estado;
            $pedido->save();

        return JsonResponse::create(array('message' => "Estado Actualizado Correctamente",200));
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo cambiar el estado del pedido", "exception"=>$exc->getMessage(), 401));
        }
  
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function newPedido(Request $request)
    {   
        $ganancia = 0;
        $data = $request->all();
        $date = Carbon::now();
        $pedido = new PedidoVendedor();
        $pedido->fecha = $date->toDateString();
        $pedido->idVendedor = $data["idVendedor"];
        $pedido->valor = $data["total"];
        $pedido->estado = "Espera";
        $pedido->domicilio = $data["domicilio"];
        $pedido->estadoPago = "SIN LIQUIDAR";
        $pedido->save();
        $detalles = json_decode($data["detalles"]);
     
        foreach ($detalles as $d) {
            $detalle = new DetallePedidoVendedor();
            $detalle->idPedidoVendedores = $pedido->id;
            $detalle->idProducto = $d->idProducto;    
            $detalle->precio = $d->precio;
            $detalle->porcentajeVendedor = $d->porcentajeVendedor;
            $detalle->porcentajeDescuento = $d->porcentajeDescuento;
            $detalle->ganancia = ($d->precio * $d->porcentajeVendedor/100) * $d->cantidad;
            $detalle->cantidad = $d->cantidad;
            $detalle->subTotal = $d->subtotal;
            $detalle->save();
            $ganancia = $ganancia + $detalle->ganancia;
            $producto = Producto::find($detalle->idProducto);
            $cantidad = $producto->visitas;
            $producto->visitas = $cantidad + 1;
            $producto->save();
      }
       $pedido->ganancia = $ganancia;
       $pedido->save();
        return JsonResponse::create(array('message' => "Guardado Correctamente"), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = DB::select(DB::raw(
            "Select d.*, p.nombre as producto from detallespedidosvendedores as d inner join producto as p
            on p.id = d.idProducto where d.idPedidoVendedores = '" .$id."'"
        ));
        return $result;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getGananciaMes($idVendedor)
    {

        $date = Carbon::now(); 
        $mes = $date->format('m');
        $año = "20".$date->format('y');
        $result = DB::select(DB::raw(
            "Select * from pedidosvendedores
             WHERE Month(fecha) = ".$mes." and Year(fecha) = ".$año." and idVendedor = '".$idVendedor."' and estadoPago ='SIN LIQUIDAR'" 
        ));
        return $result;
        //return $año;
    }
    public function getGananciaHistorico($idVendedor)
    {

        $date = Carbon::now(); 
        $result = DB::select(DB::raw(
            "Select * from pedidosvendedores
             WHERE  idVendedor = '".$idVendedor."'and estadoPago ='LIQUIDADO'" 
        ));
        return $result;
        //return $año;
    }
    
    public function getPedidosAll($idVendedor)
    {

     
        $result = DB::select(DB::raw(
            "Select * from pedidosvendedores
             WHERE  idVendedor = '".$idVendedor."'" 
        ));
        return $result;
        //return $año;
    }
    
    
     public function alterEstadoPago($idPedido){
         try {
 
            $pedido = PedidoVendedor::find($idPedido);
            $pedido->estadoPago = "LIQUIDADO";
            $pedido->save();

        return JsonResponse::create(array('message' => "Estado Actualizado Correctamente",200));
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo cambiar el estado del pedido", "exception"=>$exc->getMessage(), 401));
        }
  
    }
}
