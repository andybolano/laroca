app.controller('correoController', function($scope, correoService){
	$scope.Correos = [];
        $scope.Correo = [];
	$scope.correo = {};
    $scope.titulo;
    $scope.active;
    $scope.editMode = false;

	loadCorreos();
        
   function initialize() {
        
        $scope.Correos={
            id: "",
            titulo: "",
            descripcion: ""
        };
        
    }
      $scope.get = function(correo){
        $scope.editMode = true;
        $scope.title = "Editar Correo";
        $scope.active = "active";
        document.getElementById("image").innerHTML = ['<img class="thumb" style="width:100%;" src="'+ correo.ruta+ '" title="'+correo.titulo+'"/>'].join('');
        $scope.Correos = correo;
        $('#modalCorreo').openModal();
        
    };
    
    
	function loadCorreos () {
   var promiseGet = correoService.getAll(); 
        promiseGet.then(function (pl) {
            $scope.Correo = pl.data;
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
        $scope.titulo = "Crear Correo"
        $("#modalCorreo").openModal();
    }

    $scope.guardar = function  () {
        var formData=new FormData();
        formData.append('imagen',$scope.Correos.imagen);
        formData.append('titulo', $scope.Correos.titulo);
        formData.append('descripcion', $scope.Correos.descripcion);
        
        var promisePost = correoService.post(formData);
        promisePost.then(function (pl) {
           $("#modalCorreo").closeModal();
           loadCorreos();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.modificar = function  (Correo) {
        $scope.editMode = true;
        $scope.Correos.titulo = correo.titulo;
        $scope.Correos.descripcion = correo.descripcion;
        $scope.Correos.id = correo.id;
         document.getElementById("image").innerHTML = ['<img class="thumb" style="width:100%;" src="'+ correo.ruta+ '" title="'+correo.nombre+'"/>'].join('');
        $scope.titulo = "Modificar Servicio";
        $scope.active = "active";
        $("#modalCorreo").openModal();
    };

    $scope.update = function  () {
        var object = {
            titulo : $scope.Correos.titulo,
            descripcion : $scope.Correos.descripcion,
        };
        var promisePut = correoService.put(object,$scope.Correos.id); 
        promisePut.then(function (pl) {
           $("#modalCorreo").closeModal();
           loadCorreos();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }

    $scope.eliminar = function  (id) {
 
        var promiseDelete = correoService.delete(id); 
        promiseDelete.then(function (pl) {
           loadCorreo();
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
    
      $scope.modificarImagen = function(){
        var formData=new FormData();
        formData.append('imagen',$scope.Correos.imagen);
        formData.append('id', $scope.Correos.id);
        
        var promisePost = correoService.postImagen(formData);
        
        promisePost.then(function (d) {
            
           $('#modalCorreo').closeModal();
            Materialize.toast(d.data.message,3000,'rounded');
            initialize();
            
             loadCorreo();
          
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                 $('#modalCorreo').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                
            }

            console.log(err);
        });
    };
    
    $scope.enviar = function(correo){
         var promisePost = correoService.enviarCorreo(correo);
        promisePost.then(function (pl) {
           Materialize.toast(pl.data.message, 5000, 'rounded');
        },
        function (errorPl) {
            console.log('Error Al Cargar Datos', errorPl);
        });
    }
 
})

