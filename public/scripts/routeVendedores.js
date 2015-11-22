var uri = "../public";
var gl_resultado = {};
var app;
(function(){ 
    app = angular.module("larocaVendedor", ['ngRoute','ui.keypress']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
            .when("/home",{
                        templateUrl: '../vendedores/view/home.html'
                    })
                     .when("/vendedores/pedidos", {
                        templateUrl: '../vendedores/view/catalogo.html'
                    })
                     .when("/vendedores/registro", {
                        templateUrl: '../vendedores/view/registro.html'
                    })
                     .when("/vendedores/estadisticas", {
                        templateUrl: '../vendedores/view/estadisticas.html'
                    })
                    .otherwise({
                        redirectTo:"../vendedores/view/home"
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

   

})();


