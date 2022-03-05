var app = angular.module("myapp", ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/trangchu", {
            templateUrl: "HTML/trangchu.html"
        })
        .when("/gioithieu", {
            templateUrl: "HTML/gioithieu.html"
        })
        .when("/side", {
            templateUrl: "HTML/side.html"
        })
        .when("/monthi", {
            templateUrl: "HTML/monthi.html"
        })
        .when("/team", {
            templateUrl: "HTML/team.html"
        })
        .when("/hoidap", {
            templateUrl: "HTML/hoidap.html"
        })
        .when("/gopy", {
            templateUrl: "HTML/gopy.html"
        })
        .when("/phanhoi", {
            templateUrl: "HTML/phanhoi.html"
        })
        .when("/lienhe", {
            templateUrl: "HTML/lienhe.html"
        })
        .when("/danhgia", {
            templateUrl: "HTML/danhgia.html"
        })
        .when("/viewtest/:id/:name/:logo", {
            templateUrl: "HTML/quiz.html",
            controller: "subjectsCtrl"

        })
        .when("/dangnhap", {
            templateUrl: "HTML/dangnhap.html", controller: "loginCtrl"
        })
        .when("/DangKy", {
            templateUrl: "HTML/Singup.html"
            , controller: "dangkyCtrl"
        })
        .when("/capnhattaikhoan", {
            templateUrl: "HTML/capnhattaikhoan.html", controller: "updateaccountCtrl"
        })
        .when("/quenMK", {
            templateUrl: "HTML/QuenMatKhau.html", controller: "forgotpasswordCtrl"
        })
        .when("/doiMK", {
            templateUrl: "HTML/DoiMatKhau.html", controller: "changepasswordCtrl"
        })
        .otherwise({
            redirectTo: "/trangchu"
        });
});

app.controller("subjectCtrl", function ($scope, $rootScope, $http, $timeout) {
    $scope.subjects = [];
    $http.get("db/Subjects.js").then(function (response) {
        $scope.subjects = response.data;
        $scope.pageCount = Math.ceil($scope.subjects.length / 8);
    });

    $http.get("db/Students.js").then(function (response) {
        $rootScope.students = response.data;
    });
    $rootScope.student = null;
    $rootScope.logoff = function() {
        $rootScope.student = null;
        $rootScope.indexStudent = -1;
        Swal.fire({
            icon: 'warning',
            title: 'Đã đăng xuất!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = "#!index";
    }
    $scope.begin = 0;
    $scope.index = 1;
    $scope.pageCount = Math.ceil($scope.subjects.length / 4);
    $scope.next = function () {
        if ($scope.begin < ($scope.pageCount - 1) * 4) {
            $scope.begin += 4;
            $scope.index++;
        }
    }

    $scope.prev = function () {
        if ($scope.begin > 0) {
            $scope.begin -= 4;
            $scope.index--;
        }
    }
});

app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.loading = false;
        alert("Lỗi");
    });

});