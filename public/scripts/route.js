var uri = "../../public";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("laroca", ['ngRoute','ui.keypress']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
          
                  
                    .when("/vendedores", {
                        templateUrl: 'vendedores.html'
                    })
                    .when("/detallesVendedores", {
                        templateUrl: 'detallesVendedores.html'
                    })
                    .when("/pedidosClientes", {
                        templateUrl: 'pedidosClientes.html'
                    })
                    .when("/correos", {
                        templateUrl: 'correos.html'
                    })
                    .when("/pedidosVendedores", {
                        templateUrl: 'pedidosVendedores.html'
                    })
                    .when("/clientes", {
                        templateUrl: 'clientes.html'
                    })
                    .when("/productos", {
                        templateUrl: 'productos.html'
                    })
                     .when("/categoriasMarcas", {
                        templateUrl: 'categoriasMarcas.html'
                    })
                    .when("/servicios", {
                        templateUrl: 'servicios.html'
                    })
                     .when("/clientes/productos", {
                        templateUrl: '../cliente/view/catalogo.html'
                    })
                    .otherwise({
                        redirectTo:"/pedidosClientes"
                    });
                    
            
    }]);

    app.directive('ngEnter', function () {
        return function (scope, elements, attrs) {
            elements.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
    
    app.filter('ifEmpty', function() {
        return function(input, defaultValue) {
            if (angular.isUndefined(input) || input === null || input === '') {
                return defaultValue;
            }

            return input;
        };
    });
    
    app.directive('uploaderModel',['$parse',function($parse){
        return{
            restrict: 'A',
            link: function(scope,iElement,iAttrs){
                iElement.on('change',function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
                });
            }
        };

    }]);

   app.filter('cut',function(){
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
   });

})();


