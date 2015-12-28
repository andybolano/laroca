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
        var subtotal = cantidad * producto.precio;
      
        if ($scope.Pedidos != null) {         
            for (var i = 0; i < $scope.Pedidos.length; i++) {
                if (producto.id == $scope.Pedidos[i].idProducto){
                     Materialize.toast("El producto ya se encuentra en el carrito de compra, por favor verifique.", 5000, 'rounded');
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
            imagen : producto.ruta,
            marca : producto.nombreMarca,
            cantidad : cantidad,
            precio : producto.precio,
            subtotal : subtotal
        });
        Materialize.toast("Agregado Correctamente al carrito", 5000, 'rounded');
        localStorage.setItem("carrito",JSON.stringify($scope.Pedidos));
        $("#modalDetalles").closeModal();
        javascript:location.reload();
    }


    $scope.agregarCarritoVendedor = function  (producto) {
     
        var cantidad = $scope.Pedido.cantidad;
        var subtotal = cantidad * producto.precio;
        if ($scope.PedidosVendedor != null) {         
            for (var i = 0; i < $scope.PedidosVendedor.length; i++) {
                if (producto.id == $scope.PedidosVendedor[i].idProducto){
                     Materialize.toast("El producto ya se encuentra en el carrito de compra, por favor verifique.", 5000, 'rounded');
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
            imagen : producto.ruta,
            marca : producto.nombreMarca,
            cantidad : cantidad,
            precio : producto.precio,
            porcentajeDescuento : producto.porcentajeDescuento,
            porcentajeVendedor : producto.porcentajeVendedor,
            subtotal : subtotal
        });
          Materialize.toast("Agregado Correctamente al carrito", 5000, 'rounded');
        localStorage.setItem("carritoVendedor",JSON.stringify($scope.PedidosVendedor));
        $("#modalDetalles").closeModal();
        javascript:location.reload();
    }


    $scope.cambiarCantidad = function  (index) {
        var precio = $scope.Pedidos[index].precio;
       
        $scope.Pedidos[index].subtotal = $("#pedido"+index).val() * precio;
        
         var pedido = JSON.parse(localStorage.getItem("carrito"));
         for(i=0; i<pedido.length; i++){
             if(i==index){
                pedido[i].subtotal =  $scope.Pedidos[index].subtotal;
                pedido[i].cantidad =  $("#pedido"+index).val();
                localStorage.removeItem("carrito");
                localStorage.setItem("carrito",JSON.stringify(pedido));
                 var URLactual = window.location.href;
               if(URLactual == 'http://localhost/laroca/cliente/#/cliente/registro'){
                    javascript:location.reload();
                }
                break;
               
             }
         }
        
       
    }

    $scope.cambiarCantidadVendedor = function  (index) {
        var precio = $scope.PedidosVendedor[index].precio;
        $scope.PedidosVendedor[index].subtotal = $("#pedido"+index).val() * precio;
        
          var pedido = JSON.parse(localStorage.getItem("carritoVendedor"));
         for(i=0; i<pedido.length; i++){
             if(i==index){
                pedido[i].subtotal =  $scope.PedidosVendedor[index].subtotal;
                pedido[i].cantidad =  $("#pedido"+index).val();
                localStorage.removeItem("carritoVendedor");
                localStorage.setItem("carritoVendedor",JSON.stringify(pedido));
                       var URLactual = window.location.href;
                if(URLactual == 'http://localhost/laroca/vendedores/index.html#/vendedores/registro'){
                    javascript:location.reload();
                }
                break;
             }
         }
        
        
        
    }


    $scope.carrito = function  () {
        var grantotal=0;
         var pedidos=JSON.parse(localStorage.getItem("carrito"));
       
    
        for(i=0; i<pedidos.length; i++){
            grantotal=grantotal+pedidos[i].subtotal;
        }
        $("#modalCarrito").openModal();
       document.getElementById("grantotal").innerHTML="$"+grantotal;
    }

         $scope.carritoVendedor = function  () {
        var grantotal=0;
         var pedidos=JSON.parse(localStorage.getItem("carritoVendedor"));
       
    
        for(i=0; i<pedidos.length; i++){
            grantotal=grantotal+pedidos[i].subtotal;
        }
        $("#modalCarrito").openModal();
       document.getElementById("grantotal").innerHTML="$"+grantotal;
    }   
            
    $scope.redireccionar = function  () {
        $location.path("/clientes/registro");
        $("#modalCarrito").closeModal();  
    }

    $scope.redireccionarVendedor = function  () {
        $location.path("/vendedores/registro");
        $("#modalCarrito").closeModal();  
    }
    
    
 $scope.comprarVendedor = function () {
          
        var vendedor =   JSON.parse(sessionStorage.getItem('session'));
       
        $scope.Pedidos = JSON.parse(localStorage.getItem("carritoVendedor"));
        var total = 0;
        for (var i = 0; i < $scope.Pedidos.length; i++) {
            total = total + $scope.Pedidos[i].subtotal;
        };
        var domicilio = $('input:radio[name=formaPedido]:checked').val();
        if (domicilio == "domicilio") {
            domicilio = "SI";
        }else{
            domicilio = "NO";
        };
        var object = {
            idVendedor : vendedor[0].cedula,
            total : total,
            detalles : JSON.stringify($scope.Pedidos),
            domicilio : domicilio
        };
        
      
       
        var promisePost = pedidosService.postVendedor(object); 
        promisePost.then(function (pl) {
           Materialize.toast(pl.data.message, 5000, 'rounded');
           localStorage.removeItem("carritoVendedor");
            window.location.href = "./";
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
    
    $scope.buscador = function (){
        // ng-keyup="buscador();"
    }

})