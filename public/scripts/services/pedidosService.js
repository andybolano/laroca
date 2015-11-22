app.service('pedidosService', function($http){
	this.post = function  (object) {
		var req = $http.post(uri + '/api/pedidos', object);
		return req;
	}
	this.postVendedor = function  (object) {
		var req = $http.post(uri + '/api/pedidosVendedores', object);
		return req;
	}
	this.getPedidosMes = function  (idVendedor) {
		var req = $http.get(uri + '/api/pedidosVendedores/'+ idVendedor + '/ganancia');
		return req;
	}
})