
angular.module('kipedido')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/entradamercadoria', {
                templateUrl: 'entradamercadoria.html',
                controller: 'entradamercadoriaController'
            });
    })

app.controller("entradamercadoriaController", ['$scope', '$http', 'Crud', 'Login', function ($scope, $http, Crud, Login) {

    $scope.product = [];
    $scope.list = [];
    $scope.produto = "";
    $scope.entradaMercadoria = [];
    var today = new Date();

    $scope.getAllProduct = function () {
        Crud.getAll("getAllproduct", function (res) {
            $scope.product = res;
        })
    }

    $scope.getAllEntradaMercadoria = function () {
        Crud.getAll("getAllEntradaMercadoria", function (res) {
            $scope.entradaMercadoria = res;
        })
    }

    $scope.delete = function (id) {
        Crud.deleteByid("deleteEntradaMercadoriaById/" + id, function (res) {
            $scope.getAllEntradaMercadoria();
        })
    }

    $scope.operationSave = function (idproduto, qtdproduto) {
        $scope.list.push({ idproduto: idproduto, qtdproduto: qtdproduto, data: today });
        Crud.save('saveEntradaMercadoria', $scope.list, function (res) {
            $scope.getAllEntradaMercadoria();
            $scope.clearCode();
        })

    }
    $scope.clearCode = function () {
        $scope.list = [];
    };


    $scope.getAllProduct();
    $scope.getAllEntradaMercadoria();
}])