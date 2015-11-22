app.controller('vendedoresController', function($scope,vendedoresService){
	$scope.Vendedores = [];
	$scope.Vendedor = {};
    $scope.titulo;
    $scope.active;
    $scope.editMode = false;
	loadVendedores();

	function loadVendedores () {
		var promiseGet = vendedoresService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Vendedores = pl.data;
            console.log(JSON.stringify($scope.Vendedores));
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

    $scope.nuevo = function  () {
        $scope.editMode = false;
        $scope.active = "";
        $scope.Vendedor = {};
        $scope.titulo = "Crear Vendedor"
        $("#modalVendedores").openModal();
    }

    $scope.guardar = function  () {
        var object = {
            cedula : $scope.Vendedor.cedula,
            nombres : $scope.Vendedor.nombres,
            apellidos : $scope.Vendedor.apellidos,
            telefono : $scope.Vendedor.telefono,
            direccion : $scope.Vendedor.direccion,
            correo: $scope.Vendedor.correo,
            clave: $scope.Vendedor.contrasena
        };
     
        var promisePost = vendedoresService.post(object); 
        promisePost.then(function (pl) {
           $("#modalVendedores").closeModal();
           loadVendedores();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.modificar = function  (vendedor) {
        $scope.editMode = true;
        $scope.Vendedor.cedula = vendedor.cedula;
        $scope.Vendedor.nombres = vendedor.nombres;
        $scope.Vendedor.apellidos = vendedor.apellidos;
        $scope.Vendedor.telefono = vendedor.telefono;
        $scope.Vendedor.direccion = vendedor.direccion;
        $scope.Vendedor.correo = vendedor.usuario;
        $scope.Vendedor.contrasena = vendedor.clave;
        $scope.Vendedor.id = vendedor.id;
        $scope.titulo = "Modificar Vendedor"
        $scope.active = "active";
        $("#modalVendedores").openModal();
    };

    $scope.update = function  () {
        var object = {
            cedula : $scope.Vendedor.cedula,
            nombres : $scope.Vendedor.nombres,
            apellidos : $scope.Vendedor.apellidos,
            telefono : $scope.Vendedor.telefono,
            direccion : $scope.Vendedor.direccion,
            correo: $scope.Vendedor.correo,
            clave: $scope.Vendedor.contrasena
        };
        //alert(JSON.stringify(object));
        var promisePut = vendedoresService.put(object,$scope.Vendedor.id); 
        promisePut.then(function (pl) {
           $("#modalVendedores").closeModal();
           loadVendedores();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.eliminar = function  (id) {
        //alert(id);
        var promiseDelete = vendedoresService.delete(id); 
        promiseDelete.then(function (pl) {
           loadVendedores();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    

})