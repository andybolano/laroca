app.controller('serviciosController', function($scope, serviciosService){
	$scope.Servicios = [];
	$scope.Servicio = {};
    $scope.titulo;
    $scope.active;
    $scope.editMode = false;
	loadServicios();

	function loadServicios () {
		var promiseGet = serviciosService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Servicios = pl.data;
            console.log(JSON.stringify($scope.Servicios));
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

    $scope.nuevo = function  () {
        $scope.editMode = false;
        $scope.active = "";
        $scope.Servicio = {};
        $scope.titulo = "Crear Servicio"
        $("#modalServicios").openModal();
    }

    $scope.guardar = function  () {
        var object = {
            nombre : $scope.Servicio.nombre,
            descripcion : $scope.Servicio.descripcion,
           
        };
        console.log(JSON.stringify(object));
        var promisePost = serviciosService.post(object); 
        promisePost.then(function (pl) {
           $("#modalServicios").closeModal();
           loadServicios();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.modificar = function  (Servicio) {
        $scope.editMode = true;
        $scope.Servicio.nombre = Servicio.nombre;
        $scope.Servicio.descripcion = Servicio.descripcion;
        $scope.Servicio.id = Servicio.id;
        $scope.titulo = "Modificar Servicio"
        $scope.active = "active";
        $("#modalServicios").openModal();
    };

    $scope.update = function  () {
        var object = {
            nombre : $scope.Servicio.nombre,
            descripcion : $scope.Servicio.descripcion,
        };
        var promisePut = serviciosService.put(object,$scope.Servicio.id); 
        promisePut.then(function (pl) {
           $("#modalServicios").closeModal();
           loadServicios();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.eliminar = function  (id) {
 
        var promiseDelete = serviciosService.delete(id); 
        promiseDelete.then(function (pl) {
           loadServicios();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
})