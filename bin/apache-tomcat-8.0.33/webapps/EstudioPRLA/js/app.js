var app = angular.module("app", ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute']);

app.directive('ngHtmlCompile', ["$compile", function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngHtmlCompile, function (newValue, oldValue) {
                element.html(newValue);
                $compile(element.contents())(scope);
            });
        }
    }
}]);

app.config(function($routeProvider){

	$routeProvider.when("/", {
		templateUrl : "login.html",
		controller : "loginController"
	})
	.when("/login", {
		templateUrl : "login.html",
		controller : "loginController"
	})
	.when("/caso", {
		templateUrl : "caso.html",
		controller : "casoController"
	})
	.when("/usuario", {
		templateUrl : "usuario.html",
		controller : "usuarioController"
	})
	.when("/configuracion", {
		templateUrl : "configuracion.html",
		controller : "configuracionController"
	})
	.when("/cuenta", {
		templateUrl : "cuenta.html",
		controller : "cuentaController"
	})
	.when("/detalleCaso", {
		templateUrl : "detalleCaso.html",
		controller : "detalleCasoController"
	})
	.when("/detalleUsuario", {
		templateUrl : "detalleUsuario.html",
		controller : "detalleUsuarioController"
	})
	.when("/movimiento", {
		templateUrl : "movimiento.html",
		controller : "movimientoController"
	})
	.otherwise({ reditrectTo : "/login" });
});