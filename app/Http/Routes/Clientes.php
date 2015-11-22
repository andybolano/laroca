<?php 
	Route::resource('api/clientes', 'ClienteController');
	Route::get('api/departamentos', 'ClienteController@getDepartamentos');
	Route::get('api/municipios/{idDepartamento}', 'ClienteController@getMunicipios');