<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Pedido;
use Carbon\Carbon;
use App\Detalle;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
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
          return JsonResponse::create(array('message' => "Pedido Enviado correctamente", "request" => $marca), 200);
            
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
