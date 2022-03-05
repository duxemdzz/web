app.controller("dieuhuongCtrl", function($scope){
    $scope.subjects = [];
    $http.get("db/Subjects.js").then(function(response) {
        $scope.subjects = response.data;
        $scope.pageCount = Math.ceil($scope.subjects.length / 4);
    });
    
    $scope.begin = 0;
    // $scope.index = 1;
    $scope.pageCount = Math.ceil($scope.subjects.length / 4);
    $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1)) {
            $scope.begin += 4;
            // $scope.index++;
        }
    }

    $scope.prev = function () {
        if ($scope.begin > 0) {
            $scope.begin -= 4;
            // $scope.index--;
        }
    }
});