<?php 
	Route::resource('api/pedidos', 'PedidoController');
        Route::get("api/{estado}/pedidos","PedidoController@loadPedidos"); 
         Route::get("api/{estado}/pedidosVendedores","PedidoVendedorController@loadPedidos"); 
        Route::get("api/pedidos/{idPedido}/detalle","PedidoController@detallePedido");   
        Route::get("api/pedidos/{idPedido}/detalleVendedor","PedidoVendedorController@detallePedido");   
        Route::put("api/pedidos/alterEstado/{id}/{estado}","PedidoController@alterEstado");
        Route::put("api/pedidos/alterEstadoPago/{id}","PedidoVendedorController@alterEstadoPago");
        Route::put("api/pedidosVendedor/alterEstado/{id}/{estado}","PedidoVendedorController@alterEstado");
 ?>