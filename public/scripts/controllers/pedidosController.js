app.controller('pedidosController', function($scope,vendedoresService,pedidosService){
    $scope.Pedidos = [];
    $scope.active;
    $scope.Vendedor = {};
    loadVendedor();

    function loadVendedor () {
        var promiseGet = vendedoresService.get(187668986); 
        promiseGet.then(function (pl) {
            $scope.Vendedor = pl.data;
            $scope.active = "active";
            console.log(JSON.stringify($scope.Vendedor));
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.comprar = function () {        
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
            idVendedor : $scope.Vendedor.id,
            total : total,
            detalles : JSON.stringify($scope.Pedidos),
            domicilio : domicilio
        };
        var promisePost = pedidosService.postVendedor(object); 
        promisePost.then(function (pl) {
           Materialize.toast(pl.data.message, 5000, 'rounded');
           localStorage.removeItem("carrito");
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.redireccionar = function  () {
        
    }   




})