app.controller('pedidosVendedoresController', function($scope,vendedoresService,pedidosService){
    $scope.Pedidos = [];
     $scope.PedidosClientes = {};
     
     $scope.PedidosVendedorEspera = {};
     $scope.PedidosVendedorConfirmado = {};
     $scope.PedidosVendedorDespachado = {};
     
     $scope.DetallePedido = {};
    $scope.active;
    $scope.boton;
    $scope.Vendedor = {};
     $scope.liquidarMode = false;
   // loadVendedor();
    loadPedidosEspera();
    loadPedidosConfirmado();
    loadPedidosDespachado();



   

    $scope.verpedido = function(vendedor) {
    
        $scope.DetallePedido = "";
        $scope.DetallePedido = vendedor;
        $scope.title = "Gestion de Pedidos";
        if(vendedor.estadoPedido == "Espera"){
             $scope.editMode = true;
             
        $scope.boton = "Confirmar Pedido";
        }else if(vendedor.estadoPedido == "Confirmado"){
            $scope.editMode = true;
           
            $scope.boton = "Despachar Pedido";
        }else{
              $scope.editMode = false;
             
        }
        $scope.active = "";
        $('#modalPedido').openModal();
          var promiseGet = pedidosService.getPedidosDetallesVendedor(vendedor.idPedido); 
        promiseGet.then(function (pl) {
          $scope.Pedidos =   pl.data;
          if($scope.DetallePedido.estadoPago == "SIN LIQUIDAR" && $scope.DetallePedido.estadoPedido=="Despachado"){
               $scope.liquidarMode = true;
          }
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }; 
    
    $scope.cambiarEstadoPagoPedido = function(idPedido)
    {
           var promiseGet = pedidosService.updateEstadoPagoVendedor(idPedido); 
        promiseGet.then(function (pl) {
             
            $('#modalPedido').closeModal();
          Materialize.toast(pl.data.message, 5000, 'rounded');
         setTimeout(recargar(),5000);
          
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        })
    };
    
  
    
   function loadPedidosEspera (){
          var promiseGet = pedidosService.getPedidosVendedores("Espera"); 
        promiseGet.then(function (pl) {
                $scope.PedidosVendedorEspera = pl.data; 
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
    function loadPedidosConfirmado(){
          var promiseGet = pedidosService.getPedidosVendedores("Confirmado"); 
        promiseGet.then(function (pl) {
                $scope.PedidosVendedorConfirmado = pl.data; 
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
     function loadPedidosDespachado(){
          var promiseGet = pedidosService.getPedidosVendedores("Despachado"); 
        promiseGet.then(function (pl) {
                $scope.PedidosVendedorDespachado = pl.data; 
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
   
    $scope.cambiarEstadoPedidoVendedor = function (idPedido,estadoPedido){
        var nuevoEstado;
        if(estadoPedido == "Espera"){
            nuevoEstado="Confirmado";
        }else if(estadoPedido == "Confirmado"){
            nuevoEstado="Despachado";
        }
   
       
         var promiseGet = pedidosService.updateEstadoVendedor(idPedido,nuevoEstado); 
        promiseGet.then(function (pl) {
             
            $('#modalPedido').closeModal();
          Materialize.toast(pl.data.message, 5000, 'rounded');
         setTimeout(recargar(),5000);
          
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
        
    };

function recargar(){
    javascript:location.reload();
}



})