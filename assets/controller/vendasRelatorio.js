
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
    $scope.valorData = "";


    $scope.getAllVendas = function () {
        Crud.getAll("venda", function (res) {
            $scope.vendas = res;
        })
    }
    $scope.getDate = function (callback) {
        var data = $('#daterange_2').val();

        if (data == '') {
            return callback('');
        }

        data = data.split(" - ");
        var dataInicial = data[0].split("/")
        var dataFinal = data[1].split("/")
        dataInicial = dataInicial[2] + '-' + dataInicial[1] + '-' + dataInicial[0]
        dataFinal = dataFinal[2] + '-' + dataFinal[1] + '-' + dataFinal[0]
        return callback("dataInicial=" + dataInicial + "&dataFinal=" + dataFinal);
    }
    $scope.imprimirRelatorio = function () {
        var url = null;
        $scope.getDate(function (retornoCalback) {
            url = "venda/relatorioVendas?" + retornoCalback;
        })
        Crud.relatorio(url);
    }

    $scope.buscar = function () {
        var url = null;
        $scope.getDate(function (retornoCalback) {
            url = "venda?" + retornoCalback;
        })
        Crud.getById(url, function (res) {
            $scope.vendas = res;
        })
    }

    $scope.getProducstVenda = function (id, valor) {
        Crud.getById("vendaproduto/codigovenda/" + id, function (res) {
            $scope.produtosVenda = res;
        })
        $scope.valorVenda = valor;
    }

    $scope.getAllVendas();
}])