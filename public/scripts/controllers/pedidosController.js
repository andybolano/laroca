app.controller('pedidosController', function($scope,vendedoresService,pedidosService){
    $scope.Pedidos = [];
     $scope.PedidosClientes = {};
     
     $scope.PedidosClientesEspera = {};
     $scope.PedidosClientesConfirmado = {};
     $scope.PedidosClientesDespachado = {};
     
     $scope.DetallePedido = {};
    $scope.active;
    $scope.boton;
    $scope.Vendedor = {};
    loadVendedor();
  loadPedidosEspera();
    loadPedidosConfirmado();
    loadPedidosDespachado();

    function loadVendedor () {
        var promiseGet = vendedoresService.get(187668986); 
        promiseGet.then(function (pl) {
            $scope.Vendedor = pl.data;
            $scope.active = "active";

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
           localStorage.removeItem("carritoVendedor");
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    };

    $scope.verpedido = function(cliente) {
        $scope.DetallePedido = "";
        $scope.DetallePedido = cliente;
        $scope.title = "Gestion de Pedidos";
        if(cliente.estadoPedido == "Espera"){
             $scope.editMode = true;
        $scope.boton = "Confirmar Pedido";
        }else if(cliente.estadoPedido == "Confirmado"){
            $scope.editMode = true;
            $scope.boton = "Despachar Pedido";
        }else{
              $scope.editMode = false;
        }
        $scope.active = "";
        $('#modalPedido').openModal();
          var promiseGet = pedidosService.getPedidosDetalles(cliente.idPedido); 
        promiseGet.then(function (pl) {
          $scope.Pedidos =   pl.data;
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    };  
    
   function loadPedidosEspera (){
          var promiseGet = pedidosService.getPedidos("Espera"); 
        promiseGet.then(function (pl) {
                $scope.PedidosClientesEspera = pl.data; 
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
    function loadPedidosConfirmado(){
          var promiseGet = pedidosService.getPedidos("Confirmado"); 
        promiseGet.then(function (pl) {
                $scope.PedidosClientesConfirmado = pl.data; 
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
     function loadPedidosDespachado(){
          var promiseGet = pedidosService.getPedidos("Despachado"); 
        promiseGet.then(function (pl) {
                $scope.PedidosClientesDespachado = pl.data; 
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
    
    $scope.cambiarEstadoPedido = function (idPedido,estadoPedido){
        var nuevoEstado;
        if(estadoPedido == "Espera"){
            nuevoEstado="Confirmado";
        }else if(estadoPedido == "Confirmado"){
            nuevoEstado="Despachado";
        }
   
       
         var promiseGet = pedidosService.updateEstado(idPedido,nuevoEstado); 
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