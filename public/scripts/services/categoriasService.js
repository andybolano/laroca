app.service('categoriasService', function($http){
    
    this.post = function (categoria) {
        var req = $http.post(uri+'/api/categoria',categoria); 
        return req;
        
    };
    
    
      this.getAll = function () {
        var req = $http.get(uri+'/api/categoria');
        return req;
    };
    
        this.put = function (id,categoria) {       
        var req = $http.put(uri+'/api/categoria/' + id,categoria);
        return req;
        
    };
    
       this.delete = function(id){
        var req = $http.delete(uri+'/api/categoria/' + id);
        return req;
    };
    
     this.getSubcategorias = function(id){
        var req = $http.get(uri+'/api/categoria/subcategoria/' + id);
        return req;
    };
    
    
    
    
});
