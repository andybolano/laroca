app.service('clienteService', function($http){
	this.getAll = function  () {
		var req = $http.get(uri+'/api/clientes');
		return req;
                
	}
	this.getDepartamentos = function  () {
		var req = $http.get(uri+'/api/departamentos');
		return req;
	}
	this.getMunicipios = function  (idDepartamento) {
		var req = $http.get(uri+'/api/municipios/'+ idDepartamento);
		return req;
	}
	this.post = function  (object) {
		var req = $http.post(uri + '/api/clientes', object);
		return req;
	}
	this.get = function  (cedula) {
		var req = $http.get(uri+'/api/clientes/'+ cedula);
		return req;
	}

})