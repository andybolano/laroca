<?php 
	Route::resource('api/correo', 'CorreoController');
        Route::post("api/correo/imagen","CorreoController@storeImage");
        Route::post("api/correo/enviar","CorreoController@enviarCorreo");