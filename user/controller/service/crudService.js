app.service('Crud', function (Configuration, $http, $cookies) {
    //operation from Get
    var route = Configuration.getRouteConfiguration();
    var token =  $cookies.get('token');
    
    
    this.getAll = function($operation,callback){ 
        $http.get(route+$operation,{
            headers: {'Token': token}
        })
       .then(function(response) {
           return callback(response.data);
         }, function errorCallback(response) {
		//alert(JSON.stringify(response))
		});
    }
    

    this.getById = function($operation,callback){ 
        $http.get(route+$operation,{
            headers: {'Token': token}
        })
        .then(function(response) {
           return callback(response.data);
        });
    }
    this.getByValues = function($operation,callback){ 
        $http.get(route+$operation,{
            headers: {'Token': token}
        })
        .then(function(response) {
           return callback(response.data);
        });
    }
    //operation from delete
    this.deleteByid = function($operation,callback){
        $http({
            url: route+$operation,
            method: "delete",
            headers: {'Token': token}
        })
        .then(function(response) {
            return callback(response.data);
        });
    }
    
    //operation from update from id
    this.updateById = function($operation,$values,callback){
        $values = JSON.stringify($values);
        $values = $values.substr(1).slice(0, -1);
        $http({
            url: route+$operation,
            method: "PUT",
            data: $values,
            headers: {'Token': token}
            
        })
        .then(function(response) {
            return callback(response.data);
        });    
    }
    //operation Login
    this.getLoginByToken = function($operation,callback){ 
        $http.get(route+$operation)        
        .then(function(response) {
           return callback(response.data);
        });
    }
    //operation save from id
    this.save = function($operation,$values,callback){
        $values = JSON.stringify($values);
        $values = $values.substr(1).slice(0, -1);
        $http({
            url: route+$operation,
            method: "POST",
            data: $values,
            headers: {'Token': token}
        })
        .then(function(response) {
            return callback(response.data);
        }); 
    }
});
