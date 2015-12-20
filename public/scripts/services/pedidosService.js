app.service('pedidosService', function($http){
	this.post = function  (object) {
		var req = $http.post(uri + '/api/pedidos', object);
		return req;
	}
	this.postVendedor = function  (object) {
		var req = $http.post(uri + '/api/vendedores/pedidos', object);
		return req;
	}
	this.getPedidosMes = function  (idVendedor) {
		var req = $http.get(uri + '/api/pedidosVendedores/'+ idVendedor + '/ganancia');
		return req;
	}
   
        this.getPedidosHistorico = function  (idVendedor) {
		var req = $http.get(uri + '/api/pedidosVendedores/'+ idVendedor + '/historico');
		return req;
	}
         this.getPedidosCliente = function  (idVendedor) {
		var req = $http.get(uri + '/api/pedidosVendedores/'+ idVendedor + '/all');
		return req;
	}
        this.getPedidos =  function (estado){
            var req = $http.get(uri + '/api/'+estado+'/pedidos');
            return req;
        }
        this.getPedidosVendedores =  function (estado){
            var req = $http.get(uri + '/api/'+estado+'/pedidosVendedores');
            return req;
        }
        this.getPedidosDetalles =  function (idPedido){
            var req = $http.get(uri + '/api/pedidos/'+idPedido+'/detalle');
            return req;
        }
         this.getPedidosDetallesVendedor =  function (idPedido){
            var req = $http.get(uri + '/api/pedidos/'+idPedido+'/detalleVendedor');
            return req;
        }
        
        this.updateEstado =  function (id,estado){
            var req = $http.put(uri + '/api/pedidos/alterEstado/'+id+'/'+estado);
            return req;
        }
        this.updateEstadoPagoVendedor =  function (idPedido){
            var req = $http.put(uri + '/api/pedidos/alterEstadoPago/'+idPedido);
            return req;
        }
        
        this.updateEstadoVendedor =  function (id,estado){
            var req = $http.put(uri + '/api/pedidosVendedor/alterEstado/'+id+'/'+estado);
            return req;
        }
})