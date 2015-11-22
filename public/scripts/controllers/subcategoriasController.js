app.controller('subcategoriasController', function($scope,subcategoriasService,categoriasService) {
    $scope.Subcategorias = [];
    $scope.Categorias = [];
    $scope.Subcategoria = {};
    $scope.title = "Nueva Subcategoria";
    $scope.active = "";
    $scope.editMode = false;
    loadSubcategorias();
    loadCategorias();
   function initialize() {
        
        $scope.Subcategoria={
            id: "",
            nombre: "",
            categoria:""
        };
        
    }
    
     function initSelectCategorias(){ 
        if ($scope.banSelect){
            $scope.banSelect = false;
            $('select').material_select();
        }
    }
    
 $scope.nuevo = function(){
        initialize();
        $scope.editMode = false;
        $scope.title = "Nueva Subcategoria";
        $scope.active = "";
   
        $('#modalSubcategorias').openModal();
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
    
    
    
      $scope.get = function(subcategoria){
        $scope.editMode = true;
        $scope.title = "Editar Subcategoria";
        $scope.active = "active";
        $scope.Subcategoria = subcategoria;
        initSelectCategorias();
        $('#modalSubcategorias').openModal();
        $('#listaCategoria').val(subcategoria.idCategoria).trigger("change");
    };
    
      function loadSubcategorias(){
       
        var promiseGet = subcategoriasService.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            
            $scope.Subcategorias = pl.data;
        },
              function (errorPl) {
                  console.log('failure loading Subcategorias', errorPl);
              });
        
    }
   $scope.guardar = function(){
 
        
         var object = {
            nombre: $scope.Subcategoria.nombre,
            categoria: $scope.Subcategoria.idCategoria
        }; 
     
      
        var promisePost = subcategoriasService.post(object);
        
        promisePost.then(function (d) {
         
            initialize();
            $('#modalSubcategorias').closeModal();
               Materialize.toast(d.data.message,3000,'rounded');
            loadSubcategorias();

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                 $('#modalSubcategorias').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                 
                
            }

            console.log(err);
        });
        
    }; 
    
     $scope.modificar = function(){
        var object = {
            id:$scope.Subcategoria.id,
            nombre: $scope.Subcategoria.nombre,
            categoria: $scope.Subcategoria.idCategoria
        };
        var promisePut  = subcategoriasService.put($scope.Subcategoria.id, object);
        
        promisePut.then(function (d) {

             Materialize.toast(d.data.message,3000,'rounded');
            initialize();
            $('#modalSubcategorias').closeModal();
            loadSubcategorias();
            
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                 $('#modalSubcategorias').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
        
    };
    
      
    
    


});


