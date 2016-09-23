app.controller("configuracionController", ['$scope', '$location', '$window', '$rootScope', '$http', function ($scope, $location, $window, $rootScope, $http){

	$scope.$on('$viewContentLoaded', function(){
		if($rootScope.token == undefined || $rootScope.token == ""){
			$location.url("/login");
		}
		if($rootScope.vistasPermitidas.configuracion == undefined || $rootScope.vistasPermitidas.configuracion == ''){
			alert("No tienes los permisos para ver esta pagina.");
			$location.url("/caso");
		}
		$scope.cargarAcciones();
		$scope.cargarUsuarios();
	});

	$scope.cargarAcciones = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerAcciones?usrKey=' + $rootScope.token
		}).success(function(data, status, headers, config) {
			if(data != [] && data != "" && data != "No hay acciones"){
				$rootScope.acciones = data;
				$scope.cargarUsuarios();
			} else {
				$rootScope.acciones = '';
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cargarUsuarios = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerUsuarios?usrKey=' + $rootScope.token
		}).success(function(data, status, headers, config) {
			if(data != "" && data != "No hay usuarios"){
				for(var i in data){
					for(var x in $rootScope.acciones){
						if($rootScope.acciones[x].idUsuario == data[i].id){
							$rootScope.acciones[x].usuarioString = data[i].usuario;
						}
					}
				}
				for(var z in $rootScope.acciones){
					if($rootScope.acciones[z].usuarioString == undefined || $rootScope.acciones[z].usuarioString == ""){
						$rootScope.acciones[z].usuarioString = "idUsuario(" + $rootScope.acciones[z].idUsuario + ")";
					}
				}
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}
	
}]);