app.controller('serviciosController', function($scope, serviciosService){
	$scope.Servicios = [];
	$scope.Servicio = {};
    $scope.titulo;
    $scope.active;
    $scope.editMode = false;
	loadServicios();
        
   function initialize() {
        
        $scope.Servicio={
            id: "",
            nombre: "",
            descripcion: ""
        };
        
    }
      $scope.get = function(servicio){
        $scope.editMode = true;
        $scope.title = "Editar Servicio";
        $scope.active = "active";
        document.getElementById("image").innerHTML = ['<img class="thumb" style="width:100%;" src="'+ servicio.ruta+ '" title="'+servicio.nombre+'"/>'].join('');
        $scope.Servicio = servicio;
        $('#modalServicios').openModal();
        
    };
    
    
	function loadServicios () {
   
		var promiseGet = serviciosService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Servicios = pl.data;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

    $scope.nuevo = function  () {
         initialize();
              document.getElementById("image").innerHTML ="";
        $scope.editMode = false;
        $scope.active = "";
        $scope.Servicio = {};
        $scope.titulo = "Crear Servicio"
        $("#modalServicios").openModal();
    }

    $scope.guardar = function  () {
        var formData=new FormData();
        formData.append('imagen',$scope.Servicio.imagen);
        formData.append('nombre', $scope.Servicio.nombre);
        formData.append('descripcion', $scope.Servicio.descripcion);
        
        var promisePost = serviciosService.post(formData);
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
         document.getElementById("image").innerHTML = ['<img class="thumb" style="width:100%;" src="'+ servicio.ruta+ '" title="'+servicio.nombre+'"/>'].join('');
        $scope.titulo = "Modificar Servicio";
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
    
      $scope.modificarImagen = function(){
        var formData=new FormData();
        formData.append('imagen',$scope.Servicio.imagen);
        formData.append('id', $scope.Servicio.id);
        
        var promisePost = serviciosService.postImagen(formData);
        
        promisePost.then(function (d) {
            
           $('#modalServicios').closeModal();
            Materialize.toast(d.data.message,3000,'rounded');
            initialize();
            
             loadServicios();
          
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                 $('#modalServicios').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                
            }

            console.log(err);
        });
    };
})