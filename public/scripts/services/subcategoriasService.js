app.service('subcategoriasService', function($http){
    
    this.post = function (subcategoria) {
        var req = $http.post(uri+'/api/subcategoria',subcategoria); 
        return req;
        
    };
     
      this.getAll = function () {
        var req = $http.get(uri+'/api/subcategoria');
        return req;
    };
    
        this.put = function (id,subcategoria) {   
        var req = $http.put(uri+'/api/subcategoria/' + id,subcategoria);
        return req;
        
    };
    
       this.delete = function(id){
        var req = $http.delete(uri+'/api/subcategoria/' + id);
        return req;
    };

    this.getAllCategoria = function(id){
        var req = $http.get(uri+'/api/categoria/' + id + '/subcategoria');
        return req;
    };

    
    
    
});

