

app.controller('dangkyCtrl',function($scope,$http){
    $scope.username = null;
    $scope.password = null;
    $scope.fullname = null;
    $scope.email = null;
    $scope.gender = null;
    $scope.date = null;


    $scope.dangKy = function(username,
        password,
        fullname,
        email,
        gender,
        date){
        var data = {
            id: Math.floor(Math.random()*1000),
            username: username,
            password: password,
            fullname: fullname,
            email: email,
            gender: gender,
            birthday: date,
            schoolfee: "0",
            marks: "0"
        }
        $http.post("http://localhost:3000/Students", JSON.stringify(data)).then(function(respone){
            alert("Đăng kí thành công");
        },function(error){
            alert("Thất bại");
        })
    }
});