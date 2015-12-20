app.controller('estadisticasVendedor', function($scope,pedidosService){
	$scope.Pedidos = [];
        $scope.PedidosHistorico = [];
        $scope.PedidosDetalle = [];
    $scope.GananciaMes = 0;
    $scope.GananciaPedido = 0;
      $scope.GananciaHistorica = 0;
	loadPedidosMensual();
        loadPedidosHistorico();
        
	function loadPedidosMensual () { 
        $scope.GananciaMes = 0;
        var usuario = JSON.parse(sessionStorage.getItem("session"));
        
       var promiseGet = pedidosService.getPedidosMes(usuario[0].cedula); 
        promiseGet.then(function (pl) {
            $scope.Pedidos = pl.data;
            for (var i = 0; i < $scope.Pedidos.length; i++) {
               $scope.GananciaMes =  $scope.Pedidos[i].ganancia + $scope.GananciaMes;
            };
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}
        
        function loadPedidosHistorico () { 
      
        var usuario = JSON.parse(sessionStorage.getItem("session"));
        $scope.GananciaHistorica =0;
       var promiseGet = pedidosService.getPedidosHistorico(usuario[0].cedula); 
        promiseGet.then(function (pl) {
            $scope.PedidosHistorico = pl.data;
            for (var i = 0; i < $scope.PedidosHistorico.length; i++) {
               $scope.GananciaHistorica =  $scope.PedidosHistorico[i].ganancia + $scope.GananciaHistorica;
            };
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}
        
        $scope.detallePedido = function (idpedido){
              $scope.GananciaPedido = 0;
              $("#modalDetalles").openModal();
             var promiseGet = pedidosService.getPedidosDetallesVendedor(idpedido); 
        promiseGet.then(function (pl) {
            $scope.PedidosDetalle = pl.data;
            for (var i = 0; i < $scope.PedidosDetalle.length; i++) {
               $scope.GananciaPedido =  $scope.PedidosDetalle[i].ganancia + $scope.GananciaPedido;
            };
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
        }
        
})