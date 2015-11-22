app.service('vendedoresService', function($http){
	this.getAll = function  () {
		var req = $http.get(uri + '/api/vendedores');
		return req;
	}
	this.post = function  (object) {
		var req = $http.post(uri + '/api/vendedores', object)
		return req;
	}
	this.put = function  (object,id) {
		var req = $http.put(uri + '/api/vendedores/' + id, object)
		return req;
	}
	this.delete = function  (id) {
		var req = $http.delete(uri + '/api/vendedores/' + id)
		return req;
	}
	this.get = function  (id) {
		var req = $http.get(uri + '/api/vendedores/' + id)
		return req;
	}
})