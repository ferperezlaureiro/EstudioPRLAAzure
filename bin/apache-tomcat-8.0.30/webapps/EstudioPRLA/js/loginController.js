app.controller("loginController", ['$scope', '$location', '$http', '$rootScope', function ($scope, $location, $http, $rootScope) {  
	
	$scope.$on('$viewContentLoaded', function(){
		$scope.limpiarErrores();
	});

	$scope.limpiarErrores = function(){
		$scope.errores = {contraseniaVacia:false, usuarioVacio:false, usuarioNoExistente:false, contraseniaIncorrecta:false};
	}

	$scope.validarCampos = function(){
		if($scope.contrasenia == undefined || $scope.contrasenia == ""){
			$scope.errores.contraseniaVacia = true;
		}
		if($scope.usuario == undefined || $scope.usuario == ""){
			$scope.errores.usuarioVacio = true;	
		}
	}

	$scope.hayErores = function(){
		return ($scope.errores.contraseniaVacia || $scope.errores.usuarioVacio || $scope.errores.usuarioNoExistente || $scope.errores.contraseniaIncorrecta);
	}

	$scope.login = function(){
		$scope.limpiarErrores();
		$scope.validarCampos();
		if(!$scope.hayErores()){
			$http({
					method: 'GET', 
					url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/login?usuario=' + $scope.usuario 
																					+ '&contrasenia=' + $scope.contrasenia
				}).success(function(data, status, headers, config) {
					if (data != "usuario" && data != "|contrasenia" && data != "usuario|contrasenia" 
						&& data != "contrasenia incorrecta" && data != "usuario no encontrado") {
						$scope.tokenAux = data;
						$scope.cargarUsuario();
						$scope.cargarPermisos();
					} else {
						if(data == "usuario"){
							$scope.errores.usuarioNoExistente = true;
						}
						if(data == "usuario|contrasenia"){
							$scope.errores.usuarioNoExistente = true;
						}
						if(data == "usuario no encontrado"){
							$scope.errores.usuarioNoExistente = true;
						}
						if(data == "|contrasenia"){
							$scope.errores.contraseniaIncorrecta = true;
						}
						if(data == "contrasenia incorrecta"){
							$scope.errores.contraseniaIncorrecta = true;
						}
					}
				}).error(function(data, status, headers, config) {
					alert("Ha fallado la petición. Estado HTTP:"+status);
				});
		}
	}

	$scope.cargarUsuario = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerUsuario?usrKey=' + $scope.tokenAux 
																					+ '&usuario=' + $scope.usuario
		}).success(function(data, status, headers, config) {
			$rootScope.currentUsr = data;
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cargarPermisos = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerPermisos?usrKey=' + $scope.tokenAux 
																					+ '&usuario=' + $scope.usuario
		}).success(function(data, status, headers, config) {
			$rootScope.permisos = data;
			$rootScope.vistasPermitidas = {usuario: '', configuracion: '', movimiento: ''};
			$rootScope.accionesPermitidas = {usuarioAgregar: '', usuarioModificar : '', usuarioBorrar : '', casoAgregar : '', casoEliminar : '', casoModificar : '', 
				involucradoAgregar : '', involucradoModificar : '', involucradoBorrar : '', asignarRebocarPermiso : '', asociarDesasociarUsuario : '', 
				obtenerTodosCasos : '', obtenerCasosPorUsuario : '', obtenerUsuariosPorCaso : ''};
			for(var i in data){
				switch (data[i].code) {
				    case "OU":
				        $rootScope.vistasPermitidas.usuario = true;
				        break;
				    case "CON":
				        $rootScope.vistasPermitidas.configuracion = true;
				        break;
				    case "OM":
				        $rootScope.vistasPermitidas.movimiento = true;
				        break;
				    case "AU":
				        $rootScope.accionesPermitidas.usuarioAgregar = true;
				        break;
				    case "EU":
				        $rootScope.accionesPermitidas.usuarioBorrar = true;
				        break;
				    case "MU":
				        $rootScope.accionesPermitidas.usuarioModificar = true;
				        break;
				    case "AC":
				        $rootScope.accionesPermitidas.casoAgregar = true;
				        break;
				    case "EC":
				        $rootScope.accionesPermitidas.casoEliminar = true;
				        break;
				    case "MC":
				        $rootScope.accionesPermitidas.casoModificar = true;
				        break;
				    case "AI":
				        $rootScope.accionesPermitidas.involucradoAgregar = true;
				        break;
				    case "EI":
				        $rootScope.accionesPermitidas.involucradoBorrar = true;
				        break;
				    case "MI":
				        $rootScope.accionesPermitidas.involucradoModificar = true;
				        break;
				    case "ARP":
				        $rootScope.accionesPermitidas.asignarRebocarPermiso = true;
				        break;
				    case "ADUC":
				        $rootScope.accionesPermitidas.asociarDesasociarUsuario = true;
				        break;
				    case "OTC":
				        $rootScope.accionesPermitidas.obtenerTodosCasos = true;
				}
			}
			$rootScope.token = $scope.tokenAux;
			$location.url("/caso");
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

}]);