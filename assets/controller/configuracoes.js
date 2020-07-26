
angular.module('kipedido')

	.config(function ($routeProvider) {
		$routeProvider
			.when('/configuracoes', {
				templateUrl: 'configuracoes.html',
				controller: 'configuracoesController'
			});
	})

	.controller('configuracoesController', ['$scope', '$http', 'Crud', 'Login', 'Upload', function ($scope, $http, Crud, Login, Upload) {

		$scope.empresa = [];

		$scope.getDadosEmpresa = function () {
			Crud.getAll("getDadosEmpresa", function (res) {
				$scope.empresa = res;
			})
		}
		$scope.saveDadosEmpresa = function () {
			Crud.updateById("updateDadosEmpresa", $scope.empresa, function (res) {
				$scope.getDadosEmpresa();
			})
		}
		$scope.getDadosEmpresa();
	}]);
