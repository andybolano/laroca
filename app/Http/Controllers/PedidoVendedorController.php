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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
        $pedido->save();
        $detalles = json_decode($data["detalles"]);
        //var_dump($detalles);
        foreach ($detalles as $d) {
            $detalle = new DetallePedidoVendedor();
            $detalle->idPedidoVendedores = $pedido->id;
            $detalle->idProducto = $d->idProducto;
            $detalle->cantidad = $d->cantidad;
            $detalle->precio = $d->precio;
            $detalle->precioVenta = $d->precioVenta;
            $detalle->ganancia = $d->precioVenta - $d->precio;
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
             WHERE Month(fecha) = ".$mes." and Year(fecha) = ".$año." and idVendedor = '".$idVendedor."'" 
        ));
        return $result;
        //return $año;
    }
    public function getGananciaHistorico($idVendedor,$mes,$año)
    {

        $date = Carbon::now(); 
        $result = DB::select(DB::raw(
            "Select * from pedidosvendedores
             WHERE Month(fecha) = ".$mes." and Year(fecha) = ".$año." and idVendedor = '".$idVendedor."'" 
        ));
        return $result;
        //return $año;
    }
}
