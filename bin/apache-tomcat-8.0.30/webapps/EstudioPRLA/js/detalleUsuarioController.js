app.controller("detalleUsuarioController", ['$scope', '$location', '$window', '$rootScope', '$http', function ($scope, $location, $window, $rootScope, $http){

	$scope.$on('$viewContentLoaded', function(){
		if($rootScope.token == undefined || $rootScope.token == ""){
			$location.url("/login");
		}
		if($rootScope.vistasPermitidas.usuario == undefined || $rootScope.vistasPermitidas.usuario == ''){
			alert("No tienes los permisos para ver esta pagina.");
			$location.url("/caso");
		}
		if($rootScope.usuarioADetallar == undefined || $rootScope.usuarioADetallar == ""){
			$location.url("/usuario");
		}

		
		$scope.cargarDatosGenerales();
		$scope.cargarCasosAsignados();
		$scope.cargarCasosDisponibles();
		$scope.cargarPermisos();
		$scope.cargarPermisosRestantes();

		$scope.limpiarErrores();
	});

	$scope.limpiarErrores = function(){
		$scope.errores = {usuarioVacio:false, usuarioFormato:false, usuarioDuplicado:false, contraseniaVacia:false, contraseniaFormato:false, nombreVacio:false, 
							nombreFormato:false, cedulaVacia:false, cedulaFormato:false, emailVacio:false, emailFormato:false, telFormato:false, celVacio:false, 
							celFormato:false, domicilioFormato:false, domicilioLaboralFormato:false, fechaVacia:false, fechaFormato:false, rutFormato:false};
	}

	$scope.validarCampos = function(){
		if($rootScope.usuarioDetallado.usuario == undefined || $rootScope.usuarioDetallado.usuario == ""){
			$scope.errores.usuarioVacio = true;
		} else {
			var regexUsuario = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{5,15}");
			if(!regexUsuario.test($rootScope.usuarioDetallado.usuario)){
				$scope.errores.usuarioFormato = true;
			}
		}
		if($rootScope.usuarioDetallado.contrasenia == undefined || $rootScope.usuarioDetallado.contrasenia == ""){
			$scope.errores.contraseniaVacia = true;
		} else {
			var regexContrasenia = new RegExp("(?=.*\\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{6,16}");
			if(!regexContrasenia.test($rootScope.usuarioDetallado.contrasenia)){
				$scope.errores.contraseniaFormato = true;
			}
		}
		if($rootScope.usuarioDetallado.nombre == undefined || $rootScope.usuarioDetallado.nombre == ""){
			$scope.errores.nombreVacio = true;
		} else {
			var regexNombre = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){1,3}$");
			if(!regexNombre.test($rootScope.usuarioDetallado.nombre)){
				$scope.errores.nombreFormato = true;
			}
		}
		if($rootScope.usuarioDetallado.cedula == undefined || $rootScope.usuarioDetallado.cedula == ""){
			$scope.errores.cedulaVacia = true;
		} else {
			var regexCedula = new RegExp("([0-9]{8})");
			if(!regexCedula.test($rootScope.usuarioDetallado.cedula)){
				$scope.errores.cedulaFormato = true;
			}
		}
		if($rootScope.usuarioDetallado.email == undefined || $rootScope.usuarioDetallado.email == ""){
			$scope.errores.emailVacio = true;
		} else {
			var regexEmail = new RegExp("[a-zA-Z0-9._%-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,4}");
			if(!regexEmail.test($rootScope.usuarioDetallado.email)){
				$scope.errores.emailFormato = true;
			}
		}
		if($rootScope.usuarioDetallado.tel == undefined || $rootScope.usuarioDetallado.tel == ""){

		}else{
			var regexTel = new RegExp("(^([1-9]{1})([0-9]{7})$)");
			if(!regexTel.test($rootScope.usuarioDetallado.tel)){
				$scope.errores.telFormato = true;
			}
		}
		if($rootScope.usuarioDetallado.cel == undefined || $rootScope.usuarioDetallado.cel == ""){
			$scope.errores.celVacio = true;
		} else {
			var regexCel = new RegExp("^09[0-9]{7}$");
			if(!regexCel.test($rootScope.usuarioDetallado.cel)){
				$scope.errores.celFormato = true;
			}
		}
		if($rootScope.usuarioDetallado.domicilio == undefined || $rootScope.usuarioDetallado.domicilio == ""){
			
		} else {
			var regexDomicilio = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){0,3}(([ ])([0-9]{3,4}))$");
			if(!regexDomicilio.test($rootScope.usuarioDetallado.domicilio)){
				$scope.errores.domicilioFormato = true;
			}
		}
		if($rootScope.usuarioDetallado.domicilioLaboral == undefined || $rootScope.usuarioDetallado.domicilioLaboral == ""){
			
		} else {
			var regexdomicilioLaboral = new RegExp("^[A-Za-z]+(?:([ ])+[A-Za-z]+){0,3}(([ ])([0-9]{3,4}))$");
			if(!regexdomicilioLaboral.test($rootScope.usuarioDetallado.domicilioLaboral)){
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

	$scope.volver = function(){
		$location.url("/usuario");
		$rootScope.usuarioADetallar = "";
		$rootScope.usuarioDetallado = "";
		$rootScope.casosAsignados = "";
		$rootScope.casosDisponibles = "";
		$rootScope.permisosOtorgados = "";
		$rootScope.permisosRestantes = "";
		$scope.modificandoUsuario = false;
		$scope.cancelarModificarUsuario();
		$scope.cancelarAsignarCaso();
		$scope.cancelarAsignarPermiso();
	}

	$scope.cargarDatosGenerales = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerUsuario?usrKey=' + $rootScope.token 
																					+ '&usuario=' + $rootScope.usuarioADetallar
		}).success(function(data, status, headers, config) {
			if(data != "" && data != "No hay usuarios"){
				$rootScope.usuarioDetallado = data;
				$scope.dtFechaDeNacimiento = new Date();
				var fecha = $rootScope.usuarioDetallado.fechaDeNacimiento.split("/");
				$scope.dtFechaDeNacimiento.setDate(fecha[0]);
				$scope.dtFechaDeNacimiento.setMonth(fecha[1]-1);
				$scope.dtFechaDeNacimiento.setFullYear(fecha[2]);
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cargarCasosAsignados = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/obtenerCasosPorUsuario?usrKey=' + $rootScope.token 
																						+ '&usuario=' + $rootScope.usuarioADetallar
		}).success(function(data, status, headers, config) {
			if(data != [] && data != "" && data != "No hay casos"){
				$rootScope.casosAsignados = data;
			} else {
				$rootScope.casosAsignados = '';
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cargarCasosDisponibles = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/obtenerCasosNoAsignadosAUsuario?usrKey=' + $rootScope.token 
																									+ '&usuario=' + $rootScope.usuarioADetallar
		}).success(function(data, status, headers, config) {
			if(data != [] && data != "" && data != "No hay casos"){
				$rootScope.casosDisponibles = data;
				$scope.casoSeleccionado = $rootScope.casosDisponibles[0];
			} else {
				$rootScope.casosDisponibles = '';
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cargarPermisos = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerPermisos?usrKey=' + $rootScope.token 
																						+'&usuario=' + $rootScope.usuarioADetallar
		}).success(function(data, status, headers, config) {
			if(data != [] && data != ""){
				$rootScope.permisosOtorgados = data;
			} else {
				$rootScope.permisosOtorgados = '';
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cargarPermisosRestantes = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerPermisosRestantes?usrKey=' + $rootScope.token 
																								+'&usuario=' + $rootScope.usuarioADetallar
		}).success(function(data, status, headers, config) {
			if(data != [] && data != ""){
				$rootScope.permisosRestantes = data;	
				$scope.permisoSeleccionado = $rootScope.permisosRestantes[0];
			} else {
				$rootScope.permisosRestantes = '';
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cambiarAModificar = function(){
		$scope.cancelarAsignarCaso();
		$scope.cancelarAsignarPermiso();
		$scope.modificandoUsuario = true;
		$scope.fechaNacimientoPopUp = {opened : false};
	}

	$scope.cancelarModificarUsuario = function(){
		$scope.limpiarErrores();
		$scope.cargarDatosGenerales();
		$scope.modificandoUsuario = false;
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
																							+ '&usuarioUsado=' + $rootScope.usuarioADetallar 
																							+ '&usuario=' + $rootScope.usuarioDetallado.usuario 
																							+ '&contrasenia=' + $rootScope.usuarioDetallado.contrasenia 
																							+ '&nombre=' + $rootScope.usuarioDetallado.nombre 
																							+ '&cedula=' + $rootScope.usuarioDetallado.cedula
																							+ '&email=' + $rootScope.usuarioDetallado.email
																							+ '&tel=' + $rootScope.usuarioDetallado.tel
																							+ '&cel=' + $rootScope.usuarioDetallado.cel
																							+ '&domicilio=' + $rootScope.usuarioDetallado.domicilio
																							+ '&domicilioLaboral=' + $rootScope.usuarioDetallado.domicilioLaboral
																							+ '&rut=' + $rootScope.usuarioDetallado.rut
																							+ '&fechaDeNacimiento=' + fecha
			}).success(function(data, status, headers, config) {
				if(data == "duplicado"){
					$scope.errores.usuarioDuplicado = true;
				} else {
					if(data == "completado"){
						if(($scope.usuarioADetallar != $rootScope.usuarioDetallado.usuario || $rootScope.currentUsr.contrasenia != $rootScope.usuarioDetallado.contrasenia) 
							&& $scope.usuarioADetallar == $rootScope.currentUsr.usuario){
							$scope.reLoggear($rootScope.usuarioDetallado.usuario, $rootScope.usuarioDetallado.contrasenia);
						} else {
							$rootScope.usuarioADetallar =  $rootScope.usuarioDetallado.usuario;
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
			$rootScope.usuarioADetallar =  $rootScope.usuarioDetallado.usuario;
			$scope.cancelarModificarUsuario();
			$scope.cargarDatosGenerales();
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.desasignarCaso = function(IUE){
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/desasociarUsuarioACaso?usrKey=' + $rootScope.token 
																						+ '&usuario=' + $rootScope.usuarioADetallar 
																						+ '&iUE=' + IUE
		}).success(function(data, status, headers, config) {
			$scope.cargarCasosDisponibles();
			$scope.cargarCasosAsignados();
			$scope.cancelarAsignarCaso();
			$scope.cancelarAsignarPermiso();
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.rebocarPermiso = function(codePermiso){
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/rebocarPermiso?usrKey=' + $rootScope.token 
																					+ '&codePermiso=' + codePermiso
																					+ '&usuario=' + $rootScope.usuarioADetallar 
		}).success(function(data, status, headers, config) {
			if($scope.usuarioADetallar == $rootScope.currentUsr.usuario){
				$scope.recargarPermisos()
			}
			$scope.cargarPermisosRestantes();
			$scope.cargarPermisos();
			$scope.cancelarAsignarCaso();
			$scope.cancelarAsignarPermiso();
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.recargarPermisos = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/obtenerPermisos?usrKey=' + $rootScope.token 
																					+ '&usuario=' + $rootScope.usuarioADetallar
		}).success(function(data, status, headers, config) {
			$rootScope.permisos = data;
			$rootScope.vistasPermitidas = {usuario: '', configuracion: ''};
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
				        $rootScope.vistasPermitidas.movimientos = true;
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
			$location.url("/caso");
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.mostrarAsignarCaso = function(){
		$scope.modificandoUsuario = false;
		$scope.cancelarAsignarCaso();
		$scope.cancelarAsignarPermiso();
		$scope.cargarCasosDisponibles();
		$scope.asignarCasoFormShow = true;
		$scope.tipo = $rootScope.tiposAsignacion[0];
	}

	$scope.mostrarAsignarPermiso = function(){
		$scope.modificandoUsuario = false;
		$scope.cancelarAsignarCaso();
		$scope.cancelarAsignarPermiso();
		$scope.cargarPermisosRestantes();
		$scope.asignarPermisoFormShow = true;
	}

	$scope.asignarCaso = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/asociarUsuarioACaso?usrKey=' + $rootScope.token 
																						+ '&usuario=' +  $rootScope.usuarioADetallar
																						+ '&iUE=' + $scope.casoSeleccionado.iUE 
																						+ '&tipo=' + $scope.tipo.tipo
		}).success(function(data, status, headers, config) {
			$scope.cargarCasosAsignados();
			$scope.cargarCasosDisponibles();
			$scope.cancelarAsignarCaso();
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.asignarPermiso = function(){
		$http({
			method: 'POST',
			url: 'http://localhost:8080/EstudioPRLA/rest/UsuarioService/asignarPermiso?usrKey=' + $rootScope.token 
																					+ '&codePermiso=' + $scope.permisoSeleccionado.code 
																					+ '&usuario=' +  $rootScope.usuarioADetallar
		}).success(function(data, status, headers, config) {
			if($scope.usuarioADetallar == $rootScope.currentUsr.usuario){
				$scope.recargarPermisos()
			}
			$scope.cargarPermisosRestantes();
			$scope.cargarPermisos();
			$scope.cancelarAsignarPermiso();
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.cancelarAsignarCaso = function(){
		$scope.asignarCasoFormShow = false;
		$scope.tipo = "";
		$scope.casoSeleccionado = "";
	}

	$scope.cancelarAsignarPermiso = function(){
		$scope.asignarPermisoFormShow = false;
		$scope.permisoSeleccionado = "";
	}
	
}]);