
angular.module('kipedido')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/vendaRelatorio', {
                templateUrl: 'vendasRelatorio.html',
                controller: 'vendasRelatorio'
            });
    })

app.controller("vendasRelatorio", ['$scope', '$http', 'Crud', 'Upload', function ($scope, $http, Crud, Upload) {

    $scope.vendas = [];
    $scope.produtosVenda = [];
    $scope.valorVenda = 0;

    $scope.getAllVendas = function () {
        Crud.getAll("venda", function (res) {
            $scope.vendas = res;
        })
    }

    $scope.getProducstVenda = function (id, valor) {
        Crud.getById("vendaproduto/codigovenda/" + id, function (res) {
            $scope.produtosVenda = res;
        })
        $scope.valorVenda = valor;
    }

    $scope.imprimirRelatorio = function () {
        Crud.relatorio("venda/relatorioVendas");
    }

    $scope.getAllVendas();
}])