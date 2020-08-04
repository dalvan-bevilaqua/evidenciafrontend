
angular.module('kipedido')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/produto', {
                templateUrl: 'cadproduto.html',
                controller: 'companyController'
            });
    })

app.controller("companyController", ['$scope', '$http', 'Crud', 'Login', 'Upload', function ($scope, $http, Crud, Login, Upload) {

    $scope.product = [];
    $scope.list = [];
    $scope.produto = "";

    $scope.getAllProduct = function () {
        Crud.getAll("produto", function (res) {
            $scope.product = res;
        })
    }

    $scope.getimage = function () {
        return $scope.img;
    }

    $scope.delete = function (id) {
        Crud.deleteByid("produto/" + id, function (res) {
            $scope.getAllProduct();
        })
    }

    $scope.edit = function (codigo, nome, codigoBarras, valor) {
        $scope.codigo = codigo;
        $scope.nome = nome;
        $scope.codigoBarras = codigoBarras;
        $scope.valor = valor;
    }
    $scope.clearCode = function () {
        $scope.codigo = "";
        $scope.nome = "";
        $scope.codigoBarras = "";
        $scope.valor = "";
    };
    $scope.submitDados = function () {
        $scope.operationSave();
        $scope.clearCode();
    }
    $scope.savedata = function () {
        $scope.list.push({ nome: $scope.nome, codigoBarras: $scope.codigoBarras, valor: $scope.valor });

        if (!$scope.codigo) {
            Crud.save('produto', $scope.list, function (res) {
                $scope.getAllProduct();
                $scope.clearCode();
            })
        } else {
            Crud.updateById('produto/' + $scope.codigo, $scope.list, function (res) {
                $scope.getAllProduct();
                $scope.clearCode();
            })
        }

        $scope.list = [];

    }

    $scope.getAllProduct();
}])