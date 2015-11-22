<?php
Route::get("api/marca/getAll","MarcaController@getAll");
Route::resource("api/marca","MarcaController");
Route::post("api/marca/imagen","MarcaController@storeImage");