app.controller('marcasController', function($scope,marcasService) {
    $scope.Marcas = [];
    $scope.Marca = {};
    $scope.title = "Nueva Marca";
    $scope.active = "";
    $scope.editMode = false;
 loadMarcas();
 
   function initialize() {
        
        $scope.Marca={
            id: "",
            nombre: "",
        };
        
    }
    
    
 $scope.nuevo = function(){
        initialize();
        document.getElementById("image").innerHTML ="";
        $scope.editMode = false;
        $scope.title = "Nueva Marca";
        $scope.active = "";
        $('#modalMarcas').openModal();
    };
    
 
    
    
      $scope.get = function(marca){
        $scope.editMode = true;
        $scope.title = "Editar Marca";
        $scope.active = "active";
        document.getElementById("image").innerHTML = ['<img class="thumb" style="width:100%;" src="'+ marca.ruta+ '" title="'+marca.nombre+'"/>'].join('');
        $scope.Marca = marca;
        $('#modalMarcas').openModal();
        
    };
    
      function loadMarcas(){
       
        var promiseGet = marcasService.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            
            $scope.Marcas = pl.data;
        },
              function (errorPl) {
                  console.log('failure loading Marcas', errorPl);
              });
        
    }
   $scope.guardar = function(){
 
        
           
        var formData=new FormData();
        formData.append('imagen',$scope.Marca.imagen);
        formData.append('nombre', $scope.Marca.nombre);
        
        var promisePost = marcasService.post(formData);
        
        promisePost.then(function (d) {
         
            initialize();
            $('#modalMarcas').closeModal();
               Materialize.toast(d.data.message,3000,'rounded');
            loadMarcas();

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                 $('#modalMarcas').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                 
                
            }

            console.log(err);
        });
        
    }; 
    
     $scope.modificar = function(){
        var object = {
            id:$scope.Marca.id,
            nombre: $scope.Marca.nombre
        };
        
        var promisePut  = marcasService.put($scope.Marca.id, object);
        
        promisePut.then(function (d) {
          $('#modalMarcas').closeModal();
             Materialize.toast(d.data.message,3000,'rounded');
            initialize();
            loadMarcas();
            
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                 $('#modalMarcas').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
        
    };
    
       $scope.modificarImagen = function(){
        var formData=new FormData();
        formData.append('imagen',$scope.Marca.imagen);
        formData.append('id', $scope.Marca.id);
        
        var promisePost = marcasService.postImagen(formData);
        
        promisePost.then(function (d) {
            
           $('#modalMarcas').closeModal();
            Materialize.toast(d.data.message,3000,'rounded');
            initialize();
            
             loadMarcas();
          
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                 $('#modalMarcas').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                
            }

            console.log(err);
        });
    };
    
    
$scope.marcasHome = function(){
        var item = "";
        var cont = 0;
        var lista = "";
         var promiseGet = marcasService.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            
            $scope.Marcas = pl.data;
              for(var i = 0; i < $scope.Marcas.length ; i++){
                  item = '<img src="'+$scope.Marcas[i].ruta+'?dummy=8484744" style="height:100px;" alt="" class="col s2" />';
                  lista = item + lista;  
                  cont=cont+1;
                  if(cont==6){
                      $("#marcas").append("<div style='display:none;'>"+lista+"</div>");
                      cont = 0;
                      lista="";
                  }
              }
            
        },
              function (errorPl) {
                  console.log('failure loading Marcas', errorPl);
              });
                   
}

});

