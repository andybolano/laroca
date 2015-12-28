<?php 
	Route::resource('api/vendedores', 'VendedorController');
   Route::post('api/vendedores/solicitud', 'VendedorController@newSolicitud');
	Route::post('api/vendedores/pedidos', 'PedidoVendedorController@newPedido');
	Route::get('api/pedidosVendedores/{idVendedor}/ganancia', 'PedidoVendedorController@getGananciaMes');
        Route::get('api/pedidosVendedores/{idVendedor}/historico', 'PedidoVendedorController@getGananciaHistorico');
        Route::get('api/pedidosVendedores/{idVendedor}/all', 'PedidoVendedorController@getPedidosAll');