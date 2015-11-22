<?php 
	Route::resource('api/categoria', 'CategoriaController');
        Route::get('api/categoria/subcategoria/{idCategoria}', 'CategoriaController@getSubcategorias');