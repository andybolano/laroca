var uri = "../public";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("larocaCliente", ['ngRoute','ui.keypress']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
            .when("/home",{
                templateUrl: '../cliente/view/home.html'
            })
             .when("/clientes/productos", {
                templateUrl: '../cliente/view/catalogo.html'
            })
             .when("/clientes/servicios", {
                templateUrl: '../cliente/view/servicios.html'
            })
             .when("/clientes/registro", {
                templateUrl: '../cliente/view/registro.html'
            })
            .when("/clientes/quienesSomos", {
                templateUrl: '../cliente/view/construcion.html'
            })
            .when("/clientes/trabajaConNosotros", {
                templateUrl: '../cliente/view/trabajaConNosotros.html'
            })
            .when("/clientes/contactenos", {
                templateUrl: '../cliente/view/construcion.html'
            })
            .otherwise({
                redirectTo:"/home"
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