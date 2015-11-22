<?php 
	Route::resource('api/servicios', 'ServicioController');
        Route::post("api/servicio/imagen","ServicioController@storeImage");