<?php
Route::get("api/producto/getAll","ProductoController@getAll");
Route::resource("api/producto","ProductoController");
Route::post("api/producto/imagen","ProductoController@storeImage");
Route::get('api/subcategoria/{idSubcategoria}/producto', 'ProductoController@getProductosSubcategoria');