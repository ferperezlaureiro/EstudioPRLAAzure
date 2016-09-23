app.controller("casoController", ['$scope', '$location', '$window', '$rootScope', '$http', function ($scope, $location, $window, $rootScope, $http){


	$scope.$on('$viewContentLoaded', function(){
		if($rootScope.token == undefined || $rootScope.token == ""){
			$location.url("/login");
		}
		
		$scope.cancelarCaso();

		if ($rootScope.accionesPermitidas.obtenerTodosCasos == true) {
			$rootScope.todosCasos = "";
			$scope.cargarTodosLosCasos();
		}
		$rootScope.casoADetallar = "";
		$rootScope.misCasos = "";
		$scope.cargarMisCasos();

		$scope.limpiarErrores();
	});

	$scope.limpiarErrores = function(){
		$scope.errores = {iueVacia:false, turnoVacio:false, caratuladoVacio:false, iueFormato:false, turnoFormato:false, iueDuplicado:false};
	}

	$scope.validarCampos = function(){
		if($scope.iue == undefined || $scope.iue == ""){
			$scope.errores.iueVacia = true;
		} else{
			var regex = new RegExp("(([0-9]{1,3})+(-([0-9]{2,6}))+(/([1-9]{1}[0-9]{3})))");
			if(!regex.test($scope.iue)){
				$scope.errores.iueFormato = true;
			}
		}
		if($scope.turno == undefined || $scope.turno == ""){
			$scope.errores.turnoVacio = true;	
		} else {
			if(isNaN($scope.turno)){
				$scope.errores.turnoFormato = true;
			} else{
				if(parseInt($scope.turno)<0 || parseInt($scope.turno)>29){
					$scope.errores.turnoFormato = true;
				}
			}
		}
		if($scope.caratulado == undefined || $scope.caratulado == ""){
			$scope.errores.caratuladoVacio = true;	
		}
	}

	$scope.hayErores = function(){
		return ($scope.errores.iueVacia || $scope.errores.turnoVacio || $scope.errores.caratuladoVacio || $scope.errores.iueFormato || 
				$scope.errores.turnoFormato || $scope.errores.iueDuplicado);
	}

	$scope.cargarTodosLosCasos = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/obtenerCasos?usrKey=' + $rootScope.token
		}).success(function(data, status, headers, config) {
			if(data.length != 0 && data != "" && data != "No hay casos"){
				$rootScope.todosCasos = data;
			} else {
				$rootScope.todosCasos = '';
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	};

	$scope.cargarMisCasos = function(){
		$http({
			method: 'GET', 
			url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/obtenerCasosPorUsuario?usrKey=' + $rootScope.token +'&usuario=' + $rootScope.currentUsr.usuario
		}).success(function(data, status, headers, config) {
			if(data.length != 0 && data != "" && data != "No hay casos"){
				$rootScope.misCasos = data;
			} else {
				$rootScope.misCasos = '';
			}
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	};

	$scope.eliminarCaso = function(IUE){
		$scope.cancelarCaso();
		$http({
			method: 'DELETE',
			url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/eliminarCaso?usrKey=' + $rootScope.token +'&iUE=' + IUE
		}).success(function(data, status, headers, config) {
			if ($rootScope.accionesPermitidas.obtenerTodosCasos == true) {
				$scope.cargarTodosLosCasos();
			}

			$scope.cargarMisCasos();
		}).error(function(data, status, headers, config) {
			alert("Ha fallado la petición. Estado HTTP:"+status);
		});
	}

	$scope.mostrarAgregarCaso = function(){
		$scope.cancelarCaso();
		$scope.botonAgregarCaso = true;
		$scope.botonModificarCaso = false;
		$scope.casoFormShow = true;
		$scope.juzgado = $rootScope.juzgados[0];
	}

	$scope.agregarCaso = function(){
		$scope.limpiarErrores();
		$scope.validarCampos();
		if(!$scope.hayErores()){
			$http({
				method: 'POST',
				url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/agregarCaso?usrKey=' + $rootScope.token 
																					+ '&iUE=' + $scope.iue 
																					+ '&juzgado=' + $scope.juzgado.juzgado 
																					+ '&turno=' + $scope.turno 
																					+ '&caratulado=' + $scope.caratulado
																					+ '&suscrito=' + $scope.suscrito
			}).success(function(data, status, headers, config) {
				if(data != "duplicado"){
					$scope.cancelarCaso();

					if ($rootScope.accionesPermitidas.obtenerTodosCasos == true) {
						$scope.cargarTodosLosCasos();
					}
				} else {
					if(data == "duplicado"){
						$scope.errores.iueDuplicado = true;
					}
				}
				$scope.cargarMisCasos();
			}).error(function(data, status, headers, config) {
				alert("Ha fallado la petición. Estado HTTP:"+status);
			});
		}
	}

	$scope.mostrarModificarCaso = function(casos, iue){
		$scope.cancelarCaso();
		for(var i in casos){
			if(casos[i].iUE == iue){
				$scope.iueUsado = casos[i].iUE;
				$scope.iue = casos[i].iUE;
				for(var x in $rootScope.juzgados){
					if($rootScope.juzgados[x].juzgado == casos[i].juzgado){
						$scope.juzgado = $rootScope.juzgados[x];
						break;
					}
				}
				$scope.turno = casos[i].turno;
				$scope.caratulado = casos[i].caratulado;
				$scope.suscrito = casos[i].suscrito;
			}
		}
		$scope.botonAgregarCaso = false;
		$scope.botonModificarCaso = true;
		$scope.casoFormShow = true;
	}

	$scope.modificarCaso = function(){
		$scope.limpiarErrores();
		$scope.validarCampos();
		if(!$scope.hayErores()){
			$http({
				method: 'PUT',
				url: 'http://localhost:8080/EstudioPRLA/rest/CasoService/modificarCaso?usrKey=' + $rootScope.token 
																					+ '&iUEUsado='  + $scope.iueUsado 
																					+ '&iUE=' +  $scope.iue 
																					+ '&juzgado=' + $scope.juzgado.juzgado 
																					+ '&turno=' + $scope.turno 
																					+ '&caratulado='+ $scope.caratulado
																					+ '&suscrito=' + $scope.suscrito
			}).success(function(data, status, headers, config) {
				if(data != "duplicado"){
					$scope.cancelarCaso();

					if ($rootScope.accionesPermitidas.obtenerTodosCasos == true) {
						$scope.cargarTodosLosCasos();
					}
				} else {
					if(data == "duplicado"){
						$scope.errores.iueDuplicado = true;
					}
				}
				$scope.cargarMisCasos();
			}).error(function(data, status, headers, config) {
				alert("Ha fallado la petición. Estado HTTP:"+status);
			});
		}
	}

	$scope.cancelarCaso = function(){
		$scope.limpiarErrores();
		$scope.casoFormShow = false;
		$scope.botonAgregarCaso = false;
		$scope.botonModificarCaso = false;
		$scope.iueUsado = "";
		$scope.iue = "";
		$scope.juzgado = "";
		$scope.turno = "";
		$scope.caratulado = "";
		$rootScope.casoADetallar = "";
		$scope.suscrito = false;
	}

	$scope.detalleCaso = function(IUE){
		$rootScope.casoADetallar = IUE;
		$location.url("/detalleCaso");
	}
}]);