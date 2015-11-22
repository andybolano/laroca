app.controller('categoriasController', function($scope,categoriasService) {
    $scope.Categorias = [];
    $scope.Categoria = {};
    $scope.title = "Nueva Categoria";
    $scope.active = "";
    $scope.editMode = false;
 loadCategorias();
 
   function initialize() {
        
        $scope.Categoria={
            id: "",
            nombre: "",
        };
        
    }
    
 $scope.nuevo = function(){
        initialize();
        $scope.editMode = false;
        $scope.title = "Nueva Categoria";
        $scope.active = "";
        $('#modalCategorias').openModal();
    };
    
 
    
    
      $scope.get = function(categoria){
        $scope.editMode = true;
        $scope.title = "Editar Categoria";
        $scope.active = "active";
        $scope.Categoria = categoria;
        $('#modalCategorias').openModal();
        
    };
    
      function loadCategorias(){
       
        var promiseGet = categoriasService.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            
            $scope.Categorias = pl.data;
        },
              function (errorPl) {
                  console.log('failure loading Categorias', errorPl);
              });
        
    }
   $scope.guardar = function(){
 
        
         var object = {
            nombre: $scope.Categoria.nombre
        }; 
     
        
        var promisePost = categoriasService.post(object);
        
        promisePost.then(function (d) {
         
            initialize();
            $('#modalCategorias').closeModal();
               Materialize.toast(d.data.message,3000,'rounded');
            loadCategorias();

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                 $('#modalCategorias').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                 
                
            }

            console.log(err);
        });
        
    }; 
    
     $scope.modificar = function(){
        var object = {
            id:$scope.Categoria.id,
            nombre: $scope.Categoria.nombre
        };
        
        var promisePut  = categoriasService.put($scope.Categoria.id, object);
        
        promisePut.then(function (d) {

             Materialize.toast(d.data.message,3000,'rounded');
            initialize();
            $('#modalCategorias').closeModal();
            loadCategorias();
            
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                 $('#modalCategorias').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
        
    };
    
     
    
    


});