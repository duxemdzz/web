
app.controller('subjectsCtrl', ['$scope', '$routeParams', '$http', '$timeout', '$rootScope', function ($scope, $routeParams, $http, $timeout, $rootScope, elem, attrs) {

    $scope.name = $routeParams.name;
    $scope.logo = $routeParams.logo;

    $scope.monHoc = {};
    $scope.dsCauHoi = [];
    var id = $routeParams.id;
    $scope.inProgress = 0;
    $scope.dsCTraLoi = [];
    $scope.dsCTraLoi.length = 11;
    $http.get('db/Subjects.json').then(function (response) {
        var dsMonHoc = [];
        dsMonHoc = response.data;

        for (var i = 0; i < dsMonHoc.length; i++) {
            if (dsMonHoc[i].Id == id) {
                $scope.monHoc = dsMonHoc[i];
            }
        }
    });

    //
$scope.test = function () {
        if ($rootScope.student == null) {
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa đăng nhập!',
                text: 'Hãy quay lại sau khi đăng nhập!'
            });
        } else {
            this.start();
            this.batdau();

        }
    }

    // Đồng hồ
    $rootScope.ss = 59;
    $rootScope.mm = 5;
    var stop;
    $scope.batdau = function () {
        $rootScope.stop = $timeout(function () {
            $scope.batdau();
            if ($rootScope.ss == 0) {
                $rootScope.ss = 60;
                $rootScope.mm--;
            }
            $rootScope.ss--;
        }, 1000);

        if ($rootScope.ss == 0 && $rootScope.mm == 0) {
            $rootScope.stop();
            $scope.submit();
        }
        $rootScope.stop = function () {
            $timeout.cancel(stop);
        }
        $rootScope.reset = function () {
            $rootScope.ss = 59;
            $rootScope.mm = 5;
        }
    }

    $http.get('db/Quizs/' + id + '.js').then(function (response) {
        $scope.dsCauHoi = shuffleArray(response.data, 10);
        $scope.showmark = 0;
        // $scope.showresult = [];
        $scope.submit = function () {
            $scope.mark = 0;
            for (var i = 0; i < $scope.dsCauHoi.length; i++) {
                if ($scope.dsCTraLoi[i] != null) {
                    if ($scope.dsCTraLoi[i] == $scope.dsCauHoi[i].AnswerId) {
                        $scope.mark += $scope.dsCauHoi[i].Marks;
                    }
                }
            }
            // console.log($scope.dsCTraLoi);
            console.log($scope.checkUndefined);
            $scope.inProgress = 2;
            // $scope.inProgress = false;
            // $scope.showmark = mark;
        }

        console.log(showAnswers());

        function showAnswers() {
            var listAns = [];
            for (var i = 0; i < $scope.dsCauHoi.length; i++) {
                for (var j = 0; j < $scope.dsCauHoi[i].Answers.length; j++) {
                    if ($scope.dsCauHoi[i].AnswerId == $scope.dsCauHoi[i].Answers[j].Id) {
                        listAns[i + 1] = j + 1;
                    }
                }
            }
            return listAns;
        };


    }, function(response){console.log('lỗi')})
    $scope.checkUndefined = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    $scope.addAnswer = function (index, answerId) {
        $scope.dsCTraLoi[index] = answerId;
        $scope.checkUndefined[index] = 1;
    }

    $scope.start = function () {
        $scope.inProgress = 1;
    }

    $scope.begin = 0;
    $scope.prev = function () {
        if ($scope.begin > 0) {
            $scope.begin--;
            if ($scope.dsCTraLoi[$scope.begin] != null) {
                $scope.answerId = $scope.dsCTraLoi[$scope.begin];
            }
        }
    }

    $scope.next = function () {
        if ($scope.begin < $scope.dsCauHoi.length - 1) {
            $scope.begin++;
            if ($scope.dsCTraLoi[$scope.begin] != null) {
                $scope.answerId = $scope.dsCTraLoi[$scope.begin];
            }
        }
    }


    function shuffleArray(array, number) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        array = array.slice(0, number);
        return array;
    };
    $scope.thongbao = function () {
        Swal.fire({
            icon: 'error',
            title: 'chưa hoàn thiện chức năng này!'
        });
    }
}])

