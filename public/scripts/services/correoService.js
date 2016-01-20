app.service('correoService', function($http){
	this.getAll = function  () {
		var req = $http.get(uri + '/api/correo');
		return req;
	}
        
this.post = function (formData) {
        var req = $http.post(uri+'/api/correo',formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };
    this.enviarCorreo = function (correo) {
        var req = $http.post(uri+'/api/correo/enviar',correo) 
        return req;
    };
     this.postImagen = function (formData) {      
        var req = $http.post(uri+'/api/correo/imagen', formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}});
        return req;
        
    };
    
	this.put = function  (object,id) {
		var req = $http.put(uri + '/api/correo/' + id, object)
		return req;
	}
	this.delete = function  (id) {
		var req = $http.delete(uri + '/api/correo/' + id)
		return req;
	}
})


