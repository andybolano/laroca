<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

include 'Routes/Vendedores.php';
include 'Routes/Marcas.php';
include 'Routes/Categorias.php';
include 'Routes/Subcategorias.php';
include 'Routes/Productos.php';
include 'Routes/Servicios.php';
include 'Routes/Pedidos.php';
include 'Routes/Clientes.php';
include 'Routes/Usuarios.php';
include 'Routes/Correos.php';