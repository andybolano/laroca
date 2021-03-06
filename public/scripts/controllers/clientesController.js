app.controller('clientesController', function($scope,clienteService,pedidosService){
	$scope.Clientes = [];
	$scope.Departamentos = [];
    $scope.Municipios = [];
    $scope.Cliente = {};
     $scope.solicitud = {};
    $scope.Pedidos = [];
    $scope.active;
    loadClientes();
    loadDepartamentos();


	function loadClientes () { 
       var promiseGet = clienteService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Clientes = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

    function loadDepartamentos () {
       var promiseGet = clienteService.getDepartamentos(); 
        promiseGet.then(function (pl) {
            $scope.Departamentos = pl.data;
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        }); 
    }

    $scope.loadMunicipios = function  () {

        var promiseGet = clienteService.getMunicipios($scope.Cliente.idDepartamento); 
        promiseGet.then(function (pl) {
            $scope.Municipios = pl.data;
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        }); 
    }	

    $scope.buscar = function  () {
        cedula = $scope.Cliente.cedula;
        var promiseGet = clienteService.get(cedula); 
        promiseGet.then(function (pl) {
            console.log(JSON.stringify(pl.data));
            if (pl.data == "") {
                $scope.Cliente.cedula = cedula;
            }else{
                $scope.Cliente = pl.data;
                $scope.active = "active";
            };

        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.Guardar = function  () {
         object = {
            cedula : $scope.Cliente.cedula,
            nombres : $scope.Cliente.nombres,
            apellidos : $scope.Cliente.apellidos,
            telefono : $scope.Cliente.telefono,
            direccion : $scope.Cliente.direccion,
            correo : $scope.Cliente.correo,
        };

        var promiseGet = clienteService.post(object); 
        promiseGet.then(function (pl) {
            comprar(pl.data.cedula);
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    function comprar (cedula) {
        $scope.Pedidos = JSON.parse(localStorage.getItem("carrito"));
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
            idCliente : cedula,
            total : total,
            detalles : JSON.stringify($scope.Pedidos),
            domicilio : domicilio
        };
       
        var promisePost = pedidosService.post(object); 
        promisePost.then(function (pl) {
           Materialize.toast(pl.data.message, 5000, 'rounded');
           localStorage.removeItem("carrito");
            window.location.href = "../cliente/";
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    
  $scope.enviarSolicitud = function (){
        var object = {
            nombre : $scope.solicitud.nombre,
            telefono : $scope.solicitud.celular,
            correo : $scope.solicitud.correo

        };
        var promiseGet = clienteService.postSolicitudVendedor(object); 
        promiseGet.then(function (pl) {
            Materialize.toast(pl.data.message, 10000, 'rounded');
            $scope.solicitud.nombre="";
            $scope.solicitud.celular="";
            $scope.solicitud.correo=""
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
    
    $scope.solicitudServicio = function (cliente){
        
       var servicio = JSON.parse(localStorage.getItem('servicio'));

        var object = {
            nombres:cliente.nombres+" "+cliente.apellidos,
            cedula:cliente.cedula,
            direccion:cliente.direccion,
            telefono:cliente.telefono,
            correo:cliente.correo,
            servicio:servicio.nombre,
            imagen:servicio.ruta
            
        }
          var promiseGet = clienteService.postSolicitudServicio(object); 
        promiseGet.then(function (pl) {
            Materialize.toast(pl.data.message, 10000, 'rounded');
            $("#modalRegistro").closeModal(); 
            localStorage.removeItem('servicio');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
        
    }

})