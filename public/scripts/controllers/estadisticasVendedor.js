app.controller('estadisticasVendedor', function($scope,pedidosService){
	$scope.Pedidos = [];
    $scope.GananciaMes = 0;
	loadPedidosMensual();

	function loadPedidosMensual () { 
        $scope.GananciaMes = 0;
       var promiseGet = pedidosService.getPedidosMes(1); 
        promiseGet.then(function (pl) {
            $scope.Pedidos = pl.data;
            console.log(JSON.stringify($scope.Pedidos));
            for (var i = 0; i < $scope.Pedidos.length; i++) {
               $scope.GananciaMes =  $scope.Pedidos[i].ganancia + $scope.GananciaMes;
            };
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}
})