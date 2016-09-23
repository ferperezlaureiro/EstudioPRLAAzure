app.controller("indexController", ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {  
	
	$rootScope.tiposAsignacion = [{ "tipo": "profesional"}, { "tipo": "funcionario" }, { "tipo": "cliente" }];
	$rootScope.juzgados = [{ "juzgado": "familia"}, { "juzgado": "familia primera instancia especializado"}, { "juzgado": "paz capital" }, 
							{ "juzgado": "paz interior" }, { "juzgado": "paz ciudades, villas o pueblos" }, { "juzgado": "paz rurales" }, 
							{ "juzgado": "civil primera instancia" }, { "juzgado": "trabajo primera instancia" }, { "juzgado": "trabajo unica instancia" }, 
							{ "juzgado": "violenacia domestica" }, { "juzgado": "penal primera instancia" }, 
							{ "juzgado": "penal primera instancia crimen organizado" }, { "juzgado": "aduana primera instancia" }, { "juzgado": "conciliacion" }, 
							{ "juzgado": "menores primera instancia" }, { "juzgado": "interior primera instancia" },
							{ "juzgado": "contencioso administrativo primera instancia" }, { "juzgado": "concursos" }, { "juzgado": "faltas" }];
	$scope.navClass = function (page) {
		var currentRoute = $location.path().substring(1) || 'caso';
		return page === currentRoute ? 'active' : '';
	};

	$scope.toCaso = function(){
		$location.url("/caso");
	}
	$scope.toUsuario = function(){
		$location.url("/usuario");
	}
	$scope.toCuenta = function(){
		$location.url("/cuenta");
	}
	$scope.toConfiguracion = function(){
		$location.url("/configuracion");
	}
	$scope.toMovimiento = function(){
		$location.url("/movimiento");
	}

	$scope.cerrarSession = function(){
		$rootScope.token = "";
		$rootScope.vistasPermitidas = '';
		$rootScope.accionesPermitidas = '';
		$rootScope.currentUsr = '';
		$location.url("/login");
	}
}]);