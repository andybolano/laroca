app.controller('catalogoController', function($scope,$location,productosService, categoriasService, subcategoriasService, pedidosService){
	$scope.Productos = [];
    $scope.Producto = {};
	$scope.Categorias = [];
	$scope.subCategorias = [];
	$scope.mostrar = true;
    $scope.Pedidos = [];
    $scope.Pedido = {};
    $scope.mostrarProductos = true;
	loadCategorias();
    loadCarrito();

    function loadCarrito () {
        $scope.Pedidos = JSON.parse(localStorage.getItem("carrito"));
        $scope.PedidosVendedor = JSON.parse(localStorage.getItem("carritoVendedor"));
    }

	function loadCategorias () {
		var promiseGet = categoriasService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Categorias = pl.data;
            $scope.loadSubCategoria($scope.Categorias[0].id);
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
            $scope.loadProductos($scope.subCategorias[0].id);
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}


	$scope.loadProductos = function (idsubCategoria) {
        
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
        var cantidad = $scope.Pedido.cantidad;
        var subtotal = cantidad * producto.precioVenta;
        if ($scope.Pedidos != null) {         
            for (var i = 0; i < $scope.Pedidos.length; i++) {
                if (producto.id == $scope.Pedidos[i].idProducto){
                    alert("El producto ya se encuentra en el carrito de compra, por favor verifique.")
                    return;
                }
            };
        };  
        if ($scope.Pedidos == null) {
            $scope.Pedidos = [];
        }; 
        $scope.Pedidos.push({
            idProducto : producto.id,
            nombre : producto.nombre,
            cantidad : cantidad,
            precio : producto.precioVenta,
            subtotal : subtotal,
        });
        Materialize.toast("Agregado Correctamente", 5000, 'rounded');
        localStorage.setItem("carrito",JSON.stringify($scope.Pedidos));
        $("#modalDetalles").closeModal();
    }


    $scope.agregarCarritoVendedor = function  (producto) {
        var cantidad = $scope.Pedido.cantidad;
        var subtotal = cantidad * producto.precioVenta;
        if ($scope.PedidosVendedor != null) {         
            for (var i = 0; i < $scope.PedidosVendedor.length; i++) {
                if (producto.id == $scope.PedidosVendedor[i].idProducto){
                    alert("El producto ya se encuentra en el carrito de compra, por favor verifique.")
                    return;
                }
            };
        };   
        if ($scope.PedidosVendedor == null) {
            $scope.PedidosVendedor = [];
        }; 
        $scope.PedidosVendedor.push({
            idProducto : producto.id,
            nombre : producto.nombre,
            cantidad : cantidad,
            precio : producto.precio,
            precioVenta : producto.precioVenta,
            subtotal : subtotal,
        });
        Materialize.toast("Agregado Correctamente", 5000, 'rounded');
        localStorage.setItem("carritoVendedor",JSON.stringify($scope.PedidosVendedor));
        $("#modalDetalles").closeModal();
    }


    $scope.cambiarCantidad = function  (index) {
        var precio = $scope.Pedidos[index].precio;
        $scope.Pedidos[index].subtotal = $("#pedido"+index).val() * precio;
    }

    $scope.cambiarCantidadVendedor = function  (index) {
        var precio = $scope.PedidosVendedor[index].precio;
        $scope.PedidosVendedor[index].subtotal = $("#pedido"+index).val() * precio;
    }


    $scope.carrito = function  () {
        $("#modalCarrito").openModal();
    }

    $scope.redireccionar = function  () {
        $location.path("/cliente/registro");
        $("#modalCarrito").closeModal();  
    }

    $scope.redireccionarVendedor = function  () {
        $location.path("/vendedores/registro");
        $("#modalCarrito").closeModal();  
    }


})