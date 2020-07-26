
angular.module('kipedido')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/vendaProduto', {
                templateUrl: 'vendaProduto.html',
                controller: 'vendaProduto'
            });
    })

app.controller("vendaProduto", ['$scope', '$http', 'Crud', 'Login', 'Upload', function ($scope, $http, Crud, Login, Upload) {

    $scope.vendaProduto = [];
    $scope.product = [];
    $scope.list = [];
    $scope.pagamento = [];
    $scope.produto = "";

    $scope.finalizarVenda = function (formaPagamento) {

        $scope.pagamento.push({ formaPagamento: formaPagamento });

        Crud.save('venda', $scope.pagamento, function (res) {
            if (res) {
                alert("Venda Finalizada");
            }
            $scope.getAllProduct();
            $scope.getAllVendaProdutoProduct();
            $scope.clearCode();
        })

    }

    $scope.getAllVendaProdutoProduct = function () {
        Crud.getAll("vendaproduto", function (res) {
            $scope.vendaProduto = res;
        })
    }

    $scope.getAllProduct = function () {
        Crud.getAll("produto", function (res) {
            $scope.product = res;
        })
    }

    $scope.delete = function (id) {
        Crud.deleteByid("vendaproduto/" + id, function (res) {
            $scope.getAllVendaProdutoProduct();
        })


    }

    $scope.clearCode = function () {
        $scope.list = [];
        $scope.pagamento = [];
    };

    $scope.inserirItemNaVenda = function (codigoProduto, codigoBarras, nome, valor, valorVendido) {
        $scope.list.push({
            codigoProduto: codigoProduto, nome: nome, codigoBarras: codigoBarras, valor: valor, valorVendido: valorVendido
        });

        Crud.save('vendaproduto', $scope.list, function (res) {

            $scope.getAllProduct();
            $scope.getAllVendaProdutoProduct();
            $scope.clearCode();
        })

    }

    $scope.getAllProduct();
    $scope.getAllVendaProdutoProduct();
}])