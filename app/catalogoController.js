app.controller('catalogoController', function($scope,productosService, categoriasService, subcategoriasService, pedidosService){
	$scope.Productos = [];
    $scope.Producto = {};
	$scope.Categorias = [];
	$scope.subCategorias = [];
	$scope.mostrar = true;
    $scope.Pedidos = [];
    $scope.Pedido = {};
    $scope.mostrarProductos = true;
	loadCategorias();

	function loadCategorias () {
		var promiseGet = categoriasService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Categorias = pl.data;
            console.log(JSON.stringify($scope.Categorias));
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

	$scope.loadSubCategoria = function  (idCategoria) {
		var promiseGet = subcategoriasService.getAllCategoria(idCategoria); 
        promiseGet.then(function (pl) {
        	$scope.mostrar = false;
            $scope.subCategorias = pl.data;
            console.log(JSON.stringify($scope.subCategorias));
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}


	$scope.loadProductos = function (idsubCategoria) {
        //alert("Hola");
		var promiseGet = productosService.getAllSubcategoria(idsubCategoria); 
        promiseGet.then(function (pl) {
            $scope.Productos = pl.data;
            $scope.mostrarProductos = false;
            console.log(JSON.stringify($scope.Productos));
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

    $scope.detallesProducto = function  (producto) {
        $scope.Producto = producto;
        $("#modalDetalles").openModal();
    }

    $scope.agregarCarrito = function  (producto) {
        console.log(JSON.stringify(producto));
        var cantidad = $scope.Pedido.cantidad;
        var subtotal = cantidad * producto.precioVenta;
        $scope.Pedidos.push({
            idProducto : producto.id,
            nombre : producto.nombre,
            cantidad : cantidad,
            precio : producto.precioVenta,
            subtotal : subtotal,
        });
        localStorage.setItem("carrito",JSON.stringify($scope.Pedidos));
        $("#modalDetalles").closeModal();
    }

    $scope.carrito = function  () {
        $("#modalCarrito").openModal();
    }

    $scope.comprar = function  () {
        var total = 0;
        for (var i = 0; i < $scope.Pedidos.length; i++) {
            total = total + $scope.Pedidos[i].subtotal;
        };
        var object = {
            total : total,
            detalles : JSON.stringify($scope.Pedidos),
        };
        console.log(JSON.stringify(object));
        var promisePost = pedidosService.post(object); 
        promisePost.then(function (pl) {
           $("#modalCarrito").closeModal();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

})