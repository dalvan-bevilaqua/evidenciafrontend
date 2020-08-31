
angular.module('kipedido')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/estoqueRelatorio', {
                templateUrl: 'estoqueRelatorio.html',
                controller: 'estoqueRelatorio'
            });
    })

app.controller("estoqueRelatorio", ['$scope', '$http', 'Crud', 'Upload', function ($scope, $http, Crud, Upload) {

    $scope.estoque = [];

    $scope.getAll = function () {
        Crud.getAll("produto/estoque", function (res) {
            $scope.estoque = res;
        })
    }

    $scope.imprimirRelatorio = function () {
        Crud.relatorio("produto/relatorioEstoque");
    }

    $scope.getAll();
}])