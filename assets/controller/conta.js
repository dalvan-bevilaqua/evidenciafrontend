
angular.module('kipedido')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/conta', {
                templateUrl: 'conta.html',
                controller: 'contaController'
            });
    })

app.controller("contaController", ['$scope', '$http', 'Crud', 'Login', 'Upload', function ($scope, $http, Crud, Login, Upload) {

    $scope.conta = [];
    $scope.list = [];
    $scope.valorDisponivel = 0.00;
    $scope.valorSaque = 0.00;
    $scope.data = new Date();
    $scope.idMovimento = 0;
    $scope.produtosVenda = [];
    $scope.totalCompra = 0;
    $scope.observacao = "";

    $scope.getAllConta = function () {
        Crud.getAll("caixa", function (res) {
            $scope.conta = res;
            $scope.valorDisponivel = res.totalSaldo
        })
    }

    $scope.getProducstVenda = function (id, valor) {
        Crud.getById("vendaproduto/codigovenda/" + id, function (res) {
            $scope.produtosVenda = res;
        })
        $scope.totalCompra = valor;
    }

    $scope.delete = function (codigo) {
        Crud.deleteByid("caixa/" + codigo, function (res) {
            $scope.clear()
            $scope.getAllConta();
        })
    }

    $scope.clear = function () {
        $scope.valorDisponivel = 0;
        $scope.valorSaque = 0;
        $scope.list = [];
        $scope.observacao = "";
    }

    $scope.salvarSaque = function (valorSaque, observacao) {
        $scope.list.push({ valorSaida: valorSaque, descricao: observacao });
        Crud.save('caixa', $scope.list, function (res) {
            $scope.clear()
            $scope.getAllConta();
        })
    }

    $scope.getAllConta();
}])