app.service('productosService', function($http){
    
    this.post = function (formData) {
        var req = $http.post(uri+'/api/producto',formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };
    
     this.postImagen = function (formData) {      
        var req = $http.post(uri+'/api/producto/imagen', formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };
    
      this.getAll = function () {
        var req = $http.get(uri+'/api/producto');
        return req;
    };
    
        this.put = function (id,producto) {
        
        var req = $http.put(uri+'/api/producto/' + id,producto);
        return req;
        
    };
    
       this.delete = function(id){
        var req = $http.delete(uri+'/api/producto/' + id);
        return req;
    };

    this.getAllSubcategoria = function  (idsubcategoria) {
        var req = $http.get(uri+'/api/subcategoria/'+idsubcategoria+'/producto' );
        return req;
    };
    
    this.calificar = function (object){
         var req = $http.post(uri+'/api/producto/calificar', object);
        return req;
    }
    
    
    
});


