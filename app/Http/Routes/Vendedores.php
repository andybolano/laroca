<?php 
	Route::resource('api/vendedores', 'VendedorController');
	Route::resource('api/pedidosVendedores', 'PedidoVendedorController');
	Route::get('api/pedidosVendedores/{idVendedor}/ganancia', 'PedidoVendedorController@getGananciaMes');
