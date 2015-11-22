<?php 
	Route::resource('api/subcategoria', 'SubcategoriaController');
	Route::get('api/categoria/{idCategoria}/subcategoria', 'SubcategoriaController@getSubCategoria');