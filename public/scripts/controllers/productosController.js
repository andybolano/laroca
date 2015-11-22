app.controller('productosController', function($scope,productosService,categoriasService,marcasService) {
    $scope.Productos = [];
    $scope.Producto = {};
    $scope.title = "Nueva Producto";
    $scope.active = "";
    $scope.editMode = false;
    loadProductos();
    loadCategorias();
    loadMarcas();
   function initialize() {
        
        $scope.Producto={
            id: "",
            nombre: "",
        };
        
    }
    
    function loadMarcas(){
       
        var promiseGet = marcasService.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            
            $scope.Marcas = pl.data;
        },
              function (errorPl) {
                  console.log('failure loading Marcas', errorPl);
              });
        
    }
     function loadCategorias(){
       
        var promiseGet = categoriasService.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            
            $scope.Categorias = pl.data;
            $scope.Producto.idCategoria = pl.data[0].id;
            $scope.loadSubcategorias();
        },
              function (errorPl) {
                  console.log('failure loading Categorias', errorPl);
              });
        
    }
    
     $scope.loadSubcategorias = function (){
    
       var promiseGet = categoriasService.getSubcategorias($scope.Producto.idCategoria); 
        promiseGet.then(function (pl) {
            
            $scope.Subcategorias = pl.data;
        },
              function (errorPl) {
                  console.log('failure loading Subcategorias', errorPl);
              });
        
    }
    
    function initSelectCategorias(){
        if ($scope.banSelect){
            $scope.banSelect = false;
            $('select').material_select();
        }
    }
    
    $scope.nuevo = function(){
        initialize();
        document.getElementById("image").innerHTML ="";
        $scope.editMode = false;
        $scope.title = "Nuevo Producto";
        $scope.active = "";
        $('#modalProductos').openModal();
    };
    
 
    
    
      $scope.get = function(producto){
        $scope.editMode = true;
        $scope.title = "Editar Producto";
        $scope.active = "active";
        document.getElementById("image").innerHTML = ['<img class="thumb" style="width:100%;" src="'+ producto.ruta+ '" title="'+producto.nombre+'"/>'].join('');
        $scope.Producto = producto;
        $('#modalProductos').openModal();
       
        $('#listaMarca').val(producto.marca).trigger("change");
         $('#listaCategoria').val(producto.categoria).trigger("change");
          $('#listaSubcategoria').val(producto.subcategoria).trigger("change");
    };
    
      function loadProductos(){
       
        var promiseGet = productosService.getAll(); //The Method Call from service
        promiseGet.then(function (pl) {
            
            $scope.Productos = pl.data;
        },
              function (errorPl) {
                  console.log('failure loading Productos', errorPl);
              });
        
    }
    
   
    
   $scope.guardar = function(){
 
        
           
        var formData=new FormData();
        formData.append('imagen',$scope.Producto.imagen);
        formData.append('nombre', $scope.Producto.nombre);
        formData.append('marca', $scope.Producto.idMarca);
        formData.append('categoria', $scope.Producto.idCategoria);
        formData.append('subcategoria', $scope.Producto.idSubcategoria);
        formData.append('precio', $scope.Producto.precio);
        formData.append('precioVenta', $scope.Producto.precioVenta);
        formData.append('presentacion', $scope.Producto.presentacion);
        formData.append('descripcion', $scope.Producto.descripcion);
        
        var promisePost = productosService.post(formData);
        
        promisePost.then(function (d) {
         
            initialize();
            $('#modalProductos').closeModal();
               Materialize.toast(d.data.message,3000,'rounded');
            loadProductos();

        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                 $('#modalProductos').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                 
                
            }

            console.log(err);
        });
        
    }; 
    
     $scope.modificar = function(){
     
        var object = {
            id:$scope.Producto.id,
            nombre: $scope.Producto.nombre,
        categoria:$scope.Producto.idCategoria,
        subcategoria: $scope.Producto.idSubcategoria,
        precio: $scope.Producto.precio,
        precioVenta: $scope.Producto.precioVenta,
        presentacion: $scope.Producto.presentacion,
        descripcion: $scope.Producto.descripcion
        };
     console.log(object)
        var promisePut  = productosService.put($scope.Producto.id, object);
        
        promisePut.then(function (d) {
          $('#modalProductos').closeModal();
             Materialize.toast(d.data.message,3000,'rounded');
            initialize();
            loadProductos();
            
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                 $('#modalProductos').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                
            }

            console.log("Some Error Occured "+ JSON.stringify(err));
        });
        
    };
    
       $scope.modificarImagen = function(){
        var formData=new FormData();
        formData.append('imagen',$scope.Producto.imagen);
        formData.append('id', $scope.Producto.id);
        
        var promisePost = productosService.postImagen(formData);
        
        promisePost.then(function (d) {
            
           $('#modalProductos').closeModal();
            Materialize.toast(d.data.message,3000,'rounded');
            initialize();
            
             loadProductos();
          
        }, function (err) {
            
            if(err.status == 401){
                alert(err.data.message);
                console.log(err.data.exception);
                
            }else{
                
                 $('#modalProductos').closeModal();
                 Materialize.toast("Error al procesar la solicitud",3000,'rounded');
                
            }

            console.log(err);
        });
    };
    
    


});


