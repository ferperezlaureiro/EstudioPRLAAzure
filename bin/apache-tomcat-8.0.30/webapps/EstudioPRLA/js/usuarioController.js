app.controller("usuarioController", ['$scope', '$location', '$window', '$rootScope', '$http', function ($scope, $location, $window, $rootScope, $http){

	$scope.$on('$viewContentLoaded', function(){
		if($rootScope.token == undefined || $rootScope.token == ""){
			$location.url("/login");
		}
		if($rootScope.vistasPermitidas.usuario == undefined || $rootScope.vistasPermitidas.usuario == ''){
			alert("No tienes los permisos para ver esta pagina.");
			$location.url("/caso");
		}

		$rootScope.usuario = '';
		$scope.cancelarUsuario();
		$scope.cargarUsuarios();

		$scope.limpiarErrores();
	});

	$scope.limpiarErrores = function(){
		$scope.errores = {usuarioVacio:false, usuarioFormato:false, usuarioDuplicado:false, contraseniaVacia:false, contraseniaFormato:false, nombreVacio:false, 
							nombreFormato:false, cedulaVacia:false, cedulaFormato:false, emailVacio:false, emailFormato:false, telFormato:false, celVacio:false, 
							celFormato:false, domicilioFormato:false, domicilioLaboralFormato:false, fechaVacia:false, fechaFormato:false, rutFormato:false};
	}

	$scope.validarCampos = function(){
		if($scope.usuario == undefined || $scope.usuario == ""){
			$scope.errores.usuarioVacio = true;
		} else {
			var regexUsuario = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{5,15}");
			if(!regexUsuario.test($scope.usuario)){
				$scope.errores.usuarioFormato = true;
			}
		}
		if($scope.contrasenia == undefined || $scope.contrasenia == ""){
			$scope.errores.contraseniaVacia = true;
		} else {
			var regexContrasenia = new RegExp("(?=.*\\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{6,16}");
			if(!regexContrasenia.test($scope.contrasenia)){
				$scope.errores.contraseniaFormato = true;
			}
		}
		if($scope.nombre == undefined || $scope.nombre == ""){
			$scope.errores.nombreVacio = true;
		} else {
			var regexNombre = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){1,3}$");
			if(!regexNombre.test($scope.nombre)){
				$scope.errores.nombreFormato = true;
			}
		}
		if($scope.cedula == undefined || $scope.cedula == ""){
			$scope.errores.cedulaVacia = true;
		} else {
			var regexCedula = new RegExp("([0-9]{8})");
			if(!regexCedula.test($scope.cedula)){
				$scope.errores.cedulaFormato = true;
			}
		}
		if($scope.email == undefined || $scope.email == ""){
			$scope.errores.emailVacio = true;
		} else {
			var regexEmail = new RegExp("[a-zA-Z0-9._%-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}");
			if(!regexEmail.test($scope.email)){
				$scope.errores.emailFormato = true;
			}
		}
		if($scope.tel == undefined || $scope.tel == ""){

		}else{
			var regexTel = new RegExp("(^([1-9]{1})([0-9]{7})$)");
			if(!regexTel.test($scope.tel)){
				$scope.errores.telFormato = true;
			}
		}
		if($scope.cel == undefined || $scope.cel == ""){
			$scope.errores.celVacio = true;
		} else {
			var regexCel = new RegExp("^09[0-9]{7}$");
			if(!regexCel.test($scope.cel)){
				$scope.errores.celFormato = true;
			}
		}
		if($scope.domicilio == undefined || $scope.domicilio == ""){
			
		} else {
			var regexDomicilio = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){0,3}(([ ])([0-9]{3,4}))$");
			if(!regexDomicilio.test($scope.domicilio)){
				$scope.errores.domicilioFormato = true;
			}
		}
		if($scope.domicilioLaboral == undefined || $scope.domicilioLaboral == ""){
			
		} else {
			var regexdomicilioLaboral = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){0,3}(([ ])([0-9]{3,4}))$");
			if(!regexdomicilioLaboral.test($scope.domicilioLaboral)){
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
		return ($scope.errores.usuarioVacio || $scope.errores.usuarioFormato || $scope.errores.usuarioDuplicado || $scope.errores.contraseniaVacia || 
			$scope.errores.contraseniaFormato || $scope.errores.nombreVacio || $scope.errores.nombreFormato || $scope.errores.cedulaVacia || 
			$scope.errores.cedulaFormato || $scope.errores.emailVacio || $scope.errores.emailFormato || $scope.errores.telFormato || $scope.errores.celVacio || 
			$scope.errores.celFormato || $scope.errores.domicilioFormato || $scope.errores.domicilioLaboralFormato || $scope.errores.fechaVacia || 
			$scope.errores.fechaFormato || $scope.errores.rutFormato);
	}

	$scope.open1 = function() {
		$scope.fechaNacimientoPopUp.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.cargarUsuarios = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerUsuarios?usrKey=' + $rootScope.token
		}).success(function(data, status, headers, config) {
			if(data != "" && data != "No hay usuarios"){
				$rootScope.usuarios = data;
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.eliminarUsuario = function(usuario){
		$scope.cancelarUsuario();
		if(usuario == $rootScope.currentUsr.usuario){
			alert("No puedes eliminar el usuario actual");
		} else {
			$http({
				method: 'DELETE',
				url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/eliminarUsuario?usrKey=' + $rootScope.token 
																						+ '&usuario=' + usuario
			}).success(function(data, status, headers, config) {
				$scope.cancelarUsuario();
				$scope.cargarUsuarios();
			}).error(function(data, status, headers, config) {
				alert("Ha fallado la petición. Estado HTTP:"+status);
			});
		}
	}

	$scope.mostrarAgregarUsuario = function(){
		$scope.cancelarUsuario();
		$scope.botonAgregarUsuario = true;
		$scope.botonModificarUsuario = false;
		$scope.usuarioFormShow = true;
		$scope.fechaNacimientoPopUp = {opened : false};
		$scope.dtFechaDeNacimiento = new Date();
	}

	$scope.agregarUsuario = function(){
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
				method: 'POST',
				url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/agregarUsuario?usrKey=' + $rootScope.token 
																						+ '&usuario=' + $scope.usuario 
																						+ '&contrasenia=' + $scope.contrasenia 
																						+ '&nombre=' + $scope.nombre 
																						+ '&cedula=' + $scope.cedula
																						+ '&email=' + $scope.email
																						+ '&tel=' + $scope.tel
																						+ '&cel=' + $scope.cel
																						+ '&domicilio=' + $scope.domicilio
																						+ '&domicilioLaboral=' + $scope.domicilioLaboral
																						+ '&rut=' + $scope.rut
																						+ '&fechaDeNacimiento=' + fecha
			}).success(function(data, status, headers, config) {
				if(data == "duplicado"){
					$scope.errores.usuarioDuplicado = true;
				} else {
					$scope.cancelarUsuario();
					$scope.cargarUsuarios();
				}
			}).error(function(data, status, headers, config) {
				alert("Ha fallado la petición. Estado HTTP:"+status);
			});
		}
	}

	$scope.MostrarModificarUsuario = function(usuario){
		$scope.cancelarUsuario();
		if(usuario == $rootScope.currentUsr.usuario){
			alert("No puedes modificar el usuario actual, hazlo desde la seccion Mi Cuenta");
		} else {
			$scope.botonAgregarUsuario = false;
			$scope.botonModificarUsuario = true;
			for(var i in $rootScope.usuarios){
				if($rootScope.usuarios[i].usuario == usuario){
					$scope.usuarioUsado = $rootScope.usuarios[i].usuario;
					$scope.usuario = $rootScope.usuarios[i].usuario;
					$scope.contraseniaUsada = $rootScope.usuarios[i].contrasenia;
					$scope.contrasenia = $rootScope.usuarios[i].contrasenia;
					$scope.nombre = $rootScope.usuarios[i].nombre;
					$scope.cedula = $rootScope.usuarios[i].cedula;
					$scope.email = $rootScope.usuarios[i].email;
					$scope.tel = $rootScope.usuarios[i].tel;
					$scope.cel = $rootScope.usuarios[i].cel;
					$scope.domicilio = $rootScope.usuarios[i].domicilio;
					$scope.domicilioLaboral = $rootScope.usuarios[i].domicilioLaboral;
					$scope.rut = $rootScope.usuarios[i].rut;
					$scope.fechaDeNacimiento = $rootScope.usuarios[i].fechaDeNacimiento;
					$scope.dtFechaDeNacimiento = new Date();
					var fecha = $scope.fechaDeNacimiento.split("/");
					$scope.dtFechaDeNacimiento.setDate(fecha[0]);
					$scope.dtFechaDeNacimiento.setMonth(fecha[1]-1);
					$scope.dtFechaDeNacimiento.setFullYear(fecha[2]);
				}
			}
			$scope.usuarioFormShow = true;
		}
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
				url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/modificarUsuario?usrKey=' + $rootScope.token 
																						+ '&usuarioUsado=' + $scope.usuarioUsado 
																						+ '&usuario=' + $scope.usuario 
																						+ '&contrasenia=' + $scope.contrasenia 
																						+ '&nombre=' + $scope.nombre 
																						+ '&cedula=' + $scope.cedula
																						+ '&email=' + $scope.email
																						+ '&tel=' + $scope.tel
																						+ '&cel=' + $scope.cel
																						+ '&domicilio=' + $scope.domicilio
																						+ '&domicilioLaboral=' + $scope.domicilioLaboral
																						+ '&rut=' + $scope.rut
																						+ '&fechaDeNacimiento=' + fecha
			}).success(function(data, status, headers, config) {
				if(data == "duplicado"){
					$scope.errores.usuarioDuplicado = true;
				} else {
					if(data == "completado"){
						if(($scope.usuarioUsado != $scope.usuario || $scope.contraseniaUsada != $scope.contrasenia) 
							&& $scope.usuarioUsado == $rootScope.currentUsr.usuario){
							$scope.reLoggear($scope.usuario, $scope.contrasenia);
						} else {
							$scope.cancelarUsuario();
							$scope.cargarUsuarios();
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
			} else {
				//todo error
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
			$scope.cancelarUsuario();
			$scope.cargarUsuarios();
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.detalleUsuario = function(usuario){
		$rootScope.usuarioADetallar = usuario;
		$location.url("/detalleUsuario");
	}

	$scope.cancelarUsuario = function(){
		$scope.limpiarErrores();
		$scope.usuarioFormShow = false;
		$scope.botonAgregarUsuario = false;
		$scope.botonModificarUsuario = false;
		$scope.usuarioUsado = "";
		$scope.usuario = "";
		$scope.contrasenia = "";
		$scope.nombre = "";
		$scope.cedula = "";
		$scope.email = "";
		$scope.tel = "";
		$scope.cel = "";
		$scope.domicilio = "";
		$scope.domicilioLaboral = "";
		$scope.rut = "";
		$scope.fechaDeNacimiento = "";
		$rootScope.usuarioADetallar = "";
	}


	
}]);