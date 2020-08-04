
angular.module('kipedido')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/entradaProduto', {
                templateUrl: 'entradaProduto.html',
                controller: 'entradaProduto'
            });
    })

app.controller("entradaProduto", ['$scope', '$http', 'Crud', 'Login', 'Upload', function ($scope, $http, Crud, Login, Upload) {

    $scope.entradaProduto = [];
    $scope.product = [];
    $scope.list = [];
    $scope.produto = "";
    $scope.entrada = [];

    $scope.finalizarEntrada = function () {

        $scope.entrada.push({ data: null });

        Crud.save('entrada', $scope.entrada, function (res) {
            if (res) {
                alert("entrada Finalizada");
            }
            $scope.getAllProduct();
            $scope.getAllentradaProdutoProduct();
            $scope.clearCode();
        })

    }

    $scope.getAllentradaProdutoProduct = function () {
        Crud.getAll("entradaproduto", function (res) {
            $scope.entradaProduto = res;
        })
    }

    $scope.getAllProduct = function () {
        Crud.getAll("produto", function (res) {
            $scope.product = res;
        })
    }

    $scope.delete = function (id) {
        Crud.deleteByid("entradaproduto/" + id, function (res) {
            $scope.getAllentradaProdutoProduct();
        })


    }

    $scope.clearCode = function () {
        $scope.list = [];
        $scope.pagamento = [];
    };

    $scope.inserirItemNaEntrada = function (codigoProduto, codigoBarras, nome, valor, valorVendido, quantidade) {

        if (valorVendido) {
            valor = valorVendido;
        }
        if (!quantidade) {
            quantidade = 1;
        }

        $scope.list.push({
            codigoProduto: codigoProduto, nome: nome, codigoBarras: codigoBarras, valor: valor, quantidade: quantidade
        });

        Crud.save('entradaproduto', $scope.list, function (res) {
            $scope.getAllProduct();
            $scope.getAllentradaProdutoProduct();

        })
        $scope.clearCode();

    }

    $scope.getAllProduct();
    $scope.getAllentradaProdutoProduct();
}])