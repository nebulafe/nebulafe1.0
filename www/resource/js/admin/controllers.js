/**
 * Created by wungcq on 15/8/4.
 */
angular.module('Manage', [])
    .controller('login',
    ['$scope', '$http', function ($scope, $http) {
        $scope.userInfo = {
            email: "",
            pwd: ""
        };
        var checkForm = function(){
            if($scope.userInfo.email.length<4 || $scope.userInfo.pwd.length < 4){
                return false;
            }
            return true;
        };

        $scope.login = function () {
            if(checkForm()){
                var req = $http({
                    method: 'POST',
                    url: '/login',
                    data: $scope.userInfo

                });
                req.success(function () {
                    setTimeout(function(){
                        location.href = "/manage";
                    }, 500)
                });
            }
        }

    }]
);