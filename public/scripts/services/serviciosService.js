app.service('serviciosService', function($http){
	this.getAll = function  () {
		var req = $http.get(uri + '/api/servicios');
		return req;
	}
this.post = function (formData) {
        var req = $http.post(uri+'/api/servicios',formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };
     this.postImagen = function (formData) {      
        var req = $http.post(uri+'/api/servicio/imagen', formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };
    
	this.put = function  (object,id) {
		var req = $http.put(uri + '/api/servicios/' + id, object)
		return req;
	}
	this.delete = function  (id) {
		var req = $http.delete(uri + '/api/servicios/' + id)
		return req;
	}
})