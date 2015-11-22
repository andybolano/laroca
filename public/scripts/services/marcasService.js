app.service('marcasService', function($http){
    
    this.post = function (formData) {
        var req = $http.post(uri+'/api/marca',formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };
    
     this.postImagen = function (formData) {      
        var req = $http.post(uri+'/api/marca/imagen', formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };
    
      this.getAll = function () {
        var req = $http.get(uri+'/api/marca');
        return req;
    };
    
        this.put = function (id,marca) {
        
        var req = $http.put(uri+'/api/marca/' + id,marca);
        return req;
        
    };
    
       this.delete = function(id){
        var req = $http.delete(uri+'/api/marca/' + id);
        return req;
    };
    
    
    
});

