var app = angular.module('app', ['ngCookies']);

app.controller('todo', ['$scope', '$http', '$cookies', 'Login', 'Crud', function ($scope, $http, $cookies, Login, Crud) {

    //Declaration from usages tables repeats
    $scope.produtos = []
    $scope.produtosCarrinho = []

    //list to insert DB
    $scope.listCart = [];
    $scope.listVenda = {};
    $scope.listUser = [];
    $scope.listVenda_produto = [];
    $scope.listConta = {};
    $scope.listToDoJson = [];
    $scope.dadosUsuario = [];
    $scope.dadosEmpresa = [];

    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

    //carrinho
    $scope.carrinho = []
    $scope.itensCarrinho = 0;
    $scope.valorCarrinho = 0.00;
    $scope.valorCarrinhoPrazo = 0.00;

    //consts usages in sistem 
    $scope.CurrentDateTime = new Date();

    $scope.ListProductCar = function (carrinho) {
        angular.forEach(carrinho, function (valueCar, keyCar) {
            $scope.itensCarrinho = $scope.itensCarrinho + 1

            angular.forEach($scope.produtos, function (valueProd, keyProd) {
                if (valueProd.id == valueCar.idproduto) {
                    $scope.produtosCarrinho.push({ 'idproduto': valueProd.id, 'name': valueProd.name, 'idcarrinho': valueCar.id, 'valorvenda': valueProd.valorvenda, 'img': valueProd.img })
                    //insere no listVenda_produto
                    $scope.listVenda_produto.push({ 'idproduto': valueProd.id, 'name': valueProd.name, 'valor': valueProd.valorvenda, 'valorprazo': valueProd.valorprazo, 'quantidade': '1' })
                    //carrinho normal
                    $scope.valorCarrinho = $scope.valorCarrinho + valueProd.valorvenda;
                    $scope.valorCarrinho = ((Math.round($scope.valorCarrinho * 100)) / 100);
                    //carrinho a prazo
                    $scope.valorCarrinhoPrazo = $scope.valorCarrinhoPrazo + valueProd.valorprazo;
                    $scope.valorCarrinhoPrazo = ((Math.round($scope.valorCarrinhoPrazo * 100)) / 100);

                }
            })

        })
    }


    $scope.pagamento = function (tipo) {
        if (tipo == 'D') {
            //conta a vista
            $scope.listVenda = { 'data': $scope.CurrentDateTime, 'valor': $scope.valorCarrinho, 'pagamento': tipo };
            $scope.listConta = { 'data': $scope.CurrentDateTime, 'tipo': 'C', 'valor': $scope.valorCarrinho };
        } else {
            //conta a prazo
            $scope.listVenda = { 'data': $scope.CurrentDateTime, 'valor': $scope.valorCarrinhoPrazo, 'pagamento': tipo };
            $scope.listConta = { 'data': $scope.CurrentDateTime, 'tipo': 'C', 'valor': $scope.valorCarrinhoPrazo };
        }

        $scope.listToDoJson.push({ 'venda': $scope.listVenda, 'venda_produto': $scope.listVenda_produto, 'conta': $scope.listConta });

        console.log($scope.listToDoJson)

        Crud.save("saveVenda", $scope.listToDoJson, function (res) {
            $scope.inicializa();
            window.location.href = 'vendaconluida.html';
        })
    }


    //carrinho
    $scope.AddCarrinho = function (id, redirect) {
        $scope.listCart.push({ idproduto: id })
        Crud.save("saveCarrinho", $scope.listCart, function (res) {
            $scope.inicializa();

        })

        if (redirect == 1) {
            window.location.href = 'finalizarcompra.html';
        }
    }

    $scope.removeCarrinho = function (id) {
        Crud.deleteByid("deleteCarrinhoById/" + id, function (res) {
            $scope.inicializa();
        })
    }


    //Inicializar tudo
    $scope.getAllToDo = function () {
        Crud.getAll("getAllproductUser", function (res) {
            $scope.produtos = res

            Crud.getAll("getAllCarrinho", function (res) {
                $scope.carrinho = res
                $scope.ListProductCar(res);
            })
            $scope.dadosUser();
            $scope.getDadosEmpresaFromuser();
        })
    }

    $scope.inicializa = function () {
        $scope.listCart = [];
        $scope.listVenda_produto = [];
        $scope.produtosCarrinho = [];
        $scope.itensCarrinho = 0;
        $scope.valorCarrinho = 0;
        $scope.getAllToDo()
    }


    //Empresa
    $scope.getDadosEmpresaFromuser = function () {
        Crud.getAll("getDadosEmpresaFromUser", function (res) {
            $scope.dadosEmpresa = res
        })
    }

    ////Usuário

    $scope.dadosUser = function () {
        Crud.getAll("getDadosUser", function (res) {
            $scope.dadosUsuario = res
        })
    }

    $scope.salvarDadosDoUsuario = function () {
        Crud.updateById("UpdateDadosUser", $scope.dadosUsuario, function (res) {
            $scope.inicializa();
        })
    }
    $scope.loginForUser = function () {
        window.location.href = 'index.html?' + location.search.substr(1);

    }
}]);