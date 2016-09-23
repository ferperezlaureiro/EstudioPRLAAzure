app.controller("cuentaController", ['$scope', '$location', '$window', '$rootScope', '$http', function ($scope, $location, $window, $rootScope, $http){

	$scope.$on('$viewContentLoaded', function(){
		if($rootScope.token == undefined || $rootScope.token == ""){
			$location.url("/login");
		}

		$scope.cargarDatosGenerales();

		$scope.limpiarErrores();
		$scope.limpiarErroresContrasenia();
	});

	$scope.limpiarErrores = function(){
		$scope.errores = {usuarioVacio:false, usuarioFormato:false, usuarioDuplicado:false, nombreVacio:false, nombreFormato:false, cedulaVacia:false, 
							cedulaFormato:false, emailVacio:false, emailFormato:false, telFormato:false, celVacio:false, celFormato:false, 
							domicilioFormato:false, domicilioLaboralFormato:false, fechaVacia:false, fechaFormato:false, rutFormato:false};
	}

	$scope.validarCampos = function(){
		if($rootScope.miCuenta.usuario == undefined || $rootScope.miCuenta.usuario == ""){
			$scope.errores.usuarioVacio = true;
		} else {
			var regexUsuario = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{5,15}");
			if(!regexUsuario.test($rootScope.miCuenta.usuario)){
				$scope.errores.usuarioFormato = true;
			}
		}
		if($rootScope.miCuenta.nombre == undefined || $rootScope.miCuenta.nombre == ""){
			$scope.errores.nombreVacio = true;
		} else {
			var regexNombre = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){1,3}$");
			if(!regexNombre.test($rootScope.miCuenta.nombre)){
				$scope.errores.nombreFormato = true;
			}
		}
		if($rootScope.miCuenta.cedula == undefined || $rootScope.miCuenta.cedula == ""){
			$scope.errores.cedulaVacia = true;
		} else {
			var regexCedula = new RegExp("([0-9]{8})");
			if(!regexCedula.test($rootScope.miCuenta.cedula)){
				$scope.errores.cedulaFormato = true;
			}
		}
		if($rootScope.miCuenta.email == undefined || $rootScope.miCuenta.email == ""){
			$scope.errores.emailVacio = true;
		} else {
			var regexEmail = new RegExp("[a-zA-Z0-9._%-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}");
			if(!regexEmail.test($rootScope.miCuenta.email)){
				$scope.errores.emailFormato = true;
			}
		}
		if($rootScope.miCuenta.tel == undefined || $rootScope.miCuenta.tel == ""){

		}else{
			var regexTel = new RegExp("(^([1-9]{1})([0-9]{7})$)");
			if(!regexTel.test($rootScope.miCuenta.tel)){
				$scope.errores.telFormato = true;
			}
		}
		if($rootScope.miCuenta.cel == undefined || $rootScope.miCuenta.cel == ""){
			$scope.errores.celVacio = true;
		} else {
			var regexCel = new RegExp("^09[0-9]{7}$");
			if(!regexCel.test($rootScope.miCuenta.cel)){
				$scope.errores.celFormato = true;
			}
		}
		if($rootScope.miCuenta.domicilio == undefined || $rootScope.miCuenta.domicilio == ""){
			
		} else {
			var regexDomicilio = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){0,3}(([ ])([0-9]{3,4}))$");
			if(!regexDomicilio.test($rootScope.miCuenta.domicilio)){
				$scope.errores.domicilioFormato = true;
			}
		}
		if($rootScope.miCuenta.domicilioLaboral == undefined || $rootScope.miCuenta.domicilioLaboral == ""){
			
		} else {
			var regexdomicilioLaboral = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){0,3}(([ ])([0-9]{3,4}))$");
			if(!regexdomicilioLaboral.test($rootScope.miCuenta.domicilioLaboral)){
				$scope.errores.domicilioLaboralFormato = true;
			}
		}
		if($scope.dtFechaDeNacimiento == undefined || $scope.dtFechaDeNacimiento == ""){
			$scope.errores.fechaVacia = true;
		} else {
			if ( Object.prototype.toString.call($scope.dtFechaDeNacimiento) === "[object Date]" ) {
				if ( isNaN( $scope.dtFechaDeNacimiento.getTime() ) ) {
					$scope.errores.fechaFormato = true;
				}
			} else {
				$scope.errores.fechaFormato = true;
			}
		}
		if($scope.rut == undefined || $scope.rut == ""){

		}else{

		}
	}

	$scope.hayErores = function(){
		return ($scope.errores.usuarioVacio || $scope.errores.usuarioFormato || $scope.errores.usuarioDuplicado || $scope.errores.nombreVacio || 
			$scope.errores.nombreFormato || $scope.errores.cedulaVacia || $scope.errores.cedulaFormato || $scope.errores.emailVacio || 
			$scope.errores.emailFormato || $scope.errores.telFormato || $scope.errores.celVacio || $scope.errores.celFormato || 
			$scope.errores.domicilioFormato || $scope.errores.domicilioLaboralFormato || $scope.errores.fechaVacia || $scope.errores.fechaFormato || 
			$scope.errores.rutFormato);
	}

	$scope.limpiarErroresContrasenia = function(){
		$scope.errores = {contraseniaVacia:false, contraseniaIncorrecta:false, contraseniaNuevaVacia:false, contraseniaNuevaFormato:false, 
							contraseniaRepetirVacia:false, contraseniaRepetirDesigual:false};
	}

	$scope.validarCamposContrasenia = function(){
		if($scope.password == undefined || $scope.password == ""){
			$scope.errores.contraseniaVacia = true;
		}
		if($scope.nuevaPassword == undefined || $scope.nuevaPassword == ""){
			$scope.errores.contraseniaNuevaVacia = true;
		} else {
			var regexContrasenia = new RegExp("(?=.*\\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{6,16}");
			if(!regexContrasenia.test($scope.nuevaPassword)){
				$scope.errores.contraseniaNuevaFormato = true;
			}
		}
		if($scope.repetirPassword == undefined || $scope.repetirPassword == ""){
			$scope.errores.contraseniaRepetirVacia = true;
		} else {
			if($scope.nuevaPassword != $scope.repetirPassword){
				$scope.errores.contraseniaRepetirDesigual = true;
			}
		}
	}

	$scope.hayEroresContrasenia = function(){
		return ($scope.errores.contraseniaVacia || $scope.errores.contraseniaIncorrecta || $scope.errores.contraseniaNuevaVacia || 
				$scope.errores.contraseniaNuevaFormato || $scope.errores.contraseniaRepetirVacia || $scope.errores.contraseniaRepetirDesigual);
	}

	$scope.open1 = function() {
		$scope.fechaNacimientoPopUp.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.cargarDatosGenerales = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerUsuario?usrKey=' + $rootScope.token 
																					+ '&usuario=' + $rootScope.currentUsr.usuario
		}).success(function(data, status, headers, config) {
			if(data != "" && data != "No hay usuarios"){
				$scope.usuarioActual = data.usuario;
				$rootScope.miCuenta = data;
				$scope.dtFechaDeNacimiento = new Date();
				var fecha = $rootScope.miCuenta.fechaDeNacimiento.split("/");
				$scope.dtFechaDeNacimiento.setDate(fecha[0]);
				$scope.dtFechaDeNacimiento.setMonth(fecha[1]-1);
				$scope.dtFechaDeNacimiento.setFullYear(fecha[2]);
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cambiarAModificar = function(){
		$scope.cancelarCambiarContrasenia();
		$scope.modificandoUsuario = true;
		$scope.fechaNacimientoPopUp = {opened : false};
	}

	$scope.mostrarCambiarContrasenia = function(){
		$scope.cancelarModificarUsuario();
		$scope.cambiarContraseniaFormShow = true;
	}

	$scope.modificarUsuario = function(){
		$scope.limpiarErrores();
		$scope.validarCampos();
		if(!$scope.hayErores()){
			var fecha = "";
			var day = parseInt($scope.dtFechaDeNacimiento.getDate());
			if(day<10)
				fecha += "0" + day;
			else
				fecha += day;
			var month = parseInt($scope.dtFechaDeNacimiento.getMonth())+1;
			if (month<10)
				fecha += "/0" + month + "/" + $scope.dtFechaDeNacimiento.getFullYear();
			else
				fecha += "/" + month + "/" + $scope.dtFechaDeNacimiento.getFullYear();
			$http({
				method: 'PUT',
				url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/modificarMiCuenta?usrKey=' + $rootScope.token 
																							+ '&usuario=' + $rootScope.miCuenta.usuario 
																							+ '&contrasenia=' + $rootScope.miCuenta.contrasenia 
																							+ '&nombre=' + $rootScope.miCuenta.nombre 
																							+ '&cedula=' + $rootScope.miCuenta.cedula
																							+ '&email=' + $rootScope.miCuenta.email
																							+ '&tel=' + $rootScope.miCuenta.tel
																							+ '&cel=' + $rootScope.miCuenta.cel
																							+ '&domicilio=' + $rootScope.miCuenta.domicilio
																							+ '&domicilioLaboral=' + $rootScope.miCuenta.domicilioLaboral
																							+ '&rut=' + $rootScope.miCuenta.rut
																							+ '&fechaDeNacimiento=' + fecha
			}).success(function(data, status, headers, config) {
				if(data == "duplicado"){
					$scope.errores.usuarioDuplicado = true;
				} else {
					if(data == "completado"){
						if($rootScope.miCuenta.usuario != $scope.usuarioActual){
							$scope.reLoggear($rootScope.miCuenta.usuario, $rootScope.miCuenta.contrasenia);
						} else {
							$scope.cancelarModificarUsuario();
							$scope.cargarDatosGenerales();
						}
					}
				}
			}).error(function(data, status, headers, config) {
				alert("Ha fallado la petición. Estado HTTP:"+status);
			});
		}
	}

	$scope.cambiarContrasenia = function(){
		$scope.limpiarErroresContrasenia();
		$scope.validarCamposContrasenia();
		if(!$scope.hayEroresContrasenia()){
			$http({
				method: 'PUT',
				url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/modificarContrasenia?usrKey=' + $rootScope.token 
																								+ '&contraseniaAnterior=' + $scope.password
																								+ '&contrasenia=' + $scope.nuevaPassword 
			}).success(function(data, status, headers, config) {
				if(data == "contrasenia incorrecta"){
					$scope.errores.contraseniaIncorrecta = true;
				} else {
					if(data == "completado"){
						if($scope.nuevaPassword != $scope.password){
							$scope.reLoggear($rootScope.miCuenta.usuario, $scope.nuevaPassword);
						} else {
							$scope.cancelarCambiarContrasenia();
							$scope.cargarDatosGenerales();
						}
					}
				}
			}).error(function(data, status, headers, config) {
				alert("Ha fallado la petición. Estado HTTP:"+status);
			});
		}
	}

	$scope.reLoggear = function(usuario, contrasenia){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/login?usuario=' + usuario 
																			+ '&contrasenia=' + contrasenia
		}).success(function(data, status, headers, config) {
			if (data != "usuario" && data != "|contrasenia" && data != "usuario|contrasenia") {
				$rootScope.token = data;
				$scope.reCargarUsuario(usuario);
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.reCargarUsuario = function(usuario){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerUsuario?usrKey=' + $rootScope.token 
																					+ '&usuario=' + usuario
		}).success(function(data, status, headers, config) {
			$rootScope.currentUsr = data;
			$scope.cancelarModificarUsuario();
			$scope.cancelarCambiarContrasenia();
			$scope.cargarDatosGenerales();
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}


	$scope.cancelarModificarUsuario = function(){
		$scope.modificandoUsuario = false;
		$scope.cargarDatosGenerales();
		$scope.limpiarErrores();
	}

	$scope.cancelarCambiarContrasenia = function(){
		$scope.cambiarContraseniaFormShow = false;
		$scope.password = "";
		$scope.nuevaPassword = "";
		$scope.repetirPassword = "";
	}
	
}]);