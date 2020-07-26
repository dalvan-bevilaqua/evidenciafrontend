
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

    $scope.getAllConta = function () {
        Crud.getAll("getAllConta", function (res) {
            $scope.conta = res;
            angular.forEach($scope.conta, function (valueConta, keyProd) {
                if (valueConta.tipo == 'C') {
                    $scope.valorDisponivel = $scope.valorDisponivel + valueConta.valor
                }
                if (valueConta.tipo == 'D') {
                    $scope.valorDisponivel = $scope.valorDisponivel - valueConta.valor
                }

            })
        })
    }
    $scope.getProducstVenda = function (id, valor) {
        Crud.getById("getProdutoVendaByMovimento/" + id, function (res) {
            $scope.produtosVenda = res;
        })
        $scope.totalCompra = valor;
    }


    $scope.delete = function (id) {
        Crud.deleteByid("deleteContaById/" + id, function (res) {
            $scope.clear()
            $scope.getAllConta();
        })
    }
    $scope.operationSave = function () {
        $scope.list.push({ data: $scope.data, idmovimento: $scope.idMovimento, tipo: 'D', valor: $scope.valorSaque, iduser: '0' });
        Crud.save('saveConta', $scope.list, function (res) {
            $scope.clear()
            $scope.getAllConta();
        })
    }
    $scope.clear = function () {
        $scope.valorDisponivel = 0;
        $scope.valorSaque = 0;
        $scope.list = [];
    }
    $scope.edit = function (id, prodDesc, prodBarCode, prodValor, prodQtd, img) {
        $scope.id = id;
        $scope.prodDesc = prodDesc;
        $scope.prodBarCode = prodBarCode;
        $scope.prodValor = prodValor;
        $scope.prodQtd = prodQtd;
        $scope.img = img
    }
    $scope.salvarSaque = function () {
        $scope.operationSave();
    }

    $scope.getAllConta();
}])