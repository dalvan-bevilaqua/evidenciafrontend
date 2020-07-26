app.service('Login', function (Crud, $cookies) {
    this.validation = function (){
        var token =  $cookies.get('token');
        if (token == 0){
            window.location.href='login.html';
        }
        Crud.getLoginByToken("getLoginByTokenEmpresa/"+token,function(res){
            if(res==0 || res==undefined || res=='undefined'){
                window.location.href='login.html';
            }
        })
    }
});
