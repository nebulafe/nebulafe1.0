/**
 * Created by wungcq on 15/8/3.
 */


//function UserRegisterCtrl($scope) {
//    $scope.userInfo = {
//        email: "",
//        nickname: "",
//        password: ""
//    };
//
//    $scope.showUserInfo = function () {
//        console.log($scope.userInfo);
//    }
//
//}

var app = angular.module('nebulafeAdmin', ['ui.bootstrap']);


app.controller('UserRegisterCtrl',
    ['$scope', '$http', function ($scope, $http) {
        $scope.userInfo = {
            email: "",
            nickname: "",
            password: ""
        };

        $scope.showUserInfo = function () {
            var req = $http({
                method: 'POST',
                url: '/users/login/',
                data: $scope.userInfo

            });
            req.success(function () {
                alert("!");
            });
        }

    }]
);
app.controller('courseController', function ($scope) {
    $scope.showUserInfo = function () {

    }
});
app.directive('leftnav', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'templates/admin/left.html'
    };
});

//登录组件
app.directive('login', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'templates/admin/user/login.html',
        controller: function ($scope, $http) {
            $scope.userInfo = {
                email: "123",
                pwd: ""
            };
            $scope.alerts = [];
            $scope.submitLogin = function () {
                var req = $http({
                    method: 'POST',
                    url: '/users/login/',
                    data: $scope.userInfo

                });
                req.success(function (res) {
                    if (res.code == 1) {
                        $scope.addAlert('success', '登录成功');
                    } else {
                        $scope.addAlert('warning', res.msg);
                    }
                });
            };
            $scope.addAlert = function (type, msg) {
                $scope.alerts.push({type: type, msg: msg});
                setTimeout(function () {
                    $scope.closeAlert(0);
                }, 3000);
            };
            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            }
        }
    }
});

//登录组件
app.directive('register', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'templates/admin/user/register.html',
        controller: function ($scope, $http, $compile) {
            $scope.userInfo = {
                email: "233",
                username: "",
                pwd: ""
            };
            $scope.alerts = [];
            $scope.submitRegister = function () {
                var req = $http({
                    method: 'POST',
                    url: '/users/register/',
                    data: $scope.userInfo

                });
                req.success(function (res) {
                    if (res.code == 1) {
                        $scope.addAlert('success', '登录成功');
                    } else {
                        $scope.addAlert('warning', res.msg);
                    }
                });
            };
            $scope.addLogin = function () {
                var login = '<login></login>';
                var $html = $compile(login)($scope);
                $('register').append($html);
            };
            $scope.addAlert = function (type, msg) {
                $scope.alerts.push({type: type, msg: msg});
                setTimeout(function () {
                    $scope.closeAlert(0);
                }, 3000);
            };
            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            }
        }
    }
});

//添加课程组件
app.directive('courseEdit', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'templates/admin/course/edit.html',
        link: function ($scope) {
            $scope.toUpload = [];
        },
        controller: function ($scope, $http, $location) {

            if (window.location.pathname == '/course/add') {
                $scope.course = {
                    name: '',
                    intro: '这个课程暂时还没有介绍',
                    poster: null
                }

            }
            $scope.showScope = function () {
                console.log($scope);
            };
            $scope.submit = function () {
                var req = $http({
                    method: 'POST',
                    url: '/course/new',
                    data: $scope.course

                })
            };
            //$scope.
        }
    }
});


app.directive('uploader', function () {
    return {
        restrict: 'AE',
        transclude: true,
        scope: {
            uploadURL: "@url",
            ismultiple: "@multi",
            toUpload: '=toUpload'
        },
        templateUrl: 'templates/admin/uploader.html',
        link: function ($scope, $element) {
            console.log($element.find('input[type="file"]').eq(0));
            $element.find('input[type="file"]').eq(0).on('change', function () {
                $scope.getFileInfo();
            });

        },
        controller: function ($scope, $element, $http, $location) {
            $scope.info = "尚未上传文件";
            $scope.uploadFile = null;
            $scope.filesInfo = [];


            if ($scope.ismultiple != "") {
                $element.find("input[type='file']").eq(0).attr("multiple", "");
            }

            var sendData = function () {
                var files = new FormData();
                for (var i in $scope.filesInfo) {
                    var item = $scope.filesInfo[i];
                    files.append(item.name, item.obj);
                    //var uploadURL = '/users/pics/';
                }
                var fs = new FormData($element.find("form").get(0));
                $.ajax({
                    url: $scope.uploadURL,
                    type: "POST",
                    data: files,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                }).success(function () {
                    alert("!");
                    //if (res.url) {
                    //    $scope.url = res.url;
                    //}
                    $scope.$parent.toUpload.push("http://abc.xyz");
                });
            };
            $scope.getFileInfo = function () {
                function loadUpdatedFile(index) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function () {
                            $scope.filesInfo[index].dataURL = reader.result;
                            console.log(reader.result);
                        });

                    };
                    reader.readAsDataURL($scope.uploadFile[index]);
                };

                $scope.uploadFile = $element.find('input').get(0).files;

                for (var i = 0; i < $scope.uploadFile.length; i++) {
                    var f_obj = $scope.uploadFile[i];
                    var f_info_obj = {
                        "name": f_obj.name,
                        "size": f_obj.size / 1000 + 'Kb',
                        "type": f_obj.type,
                        "formData_name": 'file_' + i,
                        obj: f_obj
                    };

                    $scope.filesInfo.push(f_info_obj);
                    loadUpdatedFile(i);

                }

                console.log($scope.filesInfo);
                sendData();
            };

        }
    }
});

app.directive('teacherInfo', function factory() {
    var directiveDefinitionObject = {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'templates/admin/teacher/info.html',
        //scope:{
        //    teachers:[],
        //    editTeachers:[]
        //},

        compile: function compile(tElement, tAttrs, transclude) {

            return function (scope, element, attrs) {
            }
        }

        ,
        link: function () {

        }
        ,
        controller: function ($scope, $http, $element) {
            $scope.toEditTeachers = [];
            $scope.toEditTeachersIndexArray = [];

            function getCourseTeachers() {
                var req = $http({
                    method: 'GET',
                    data: {course_id: $scope.course_id},
                    url: '/course/teachers'
                });
                req.success(function (res) {
                    $scope.teachers = res.teachers;
                });
            }


            $scope.editTeacher = function (_index, mode) {
                if ($scope.toEditTeachersIndexArray.indexOf(_index) == -1) {
                    var teacher = $scope.teachers[_index];
                    teacher.mode = mode || 'new';
                    $scope.toEditTeachersIndexArray.push(_index);
                    $scope.toEditTeachers.push(teacher);
                    console.log($scope.toEditTeachers);

                } else {

                }

            };

            getCourseTeachers();
        }
    };
    return directiveDefinitionObject;
});

app.directive('teacherEdit', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            mode: "@mode",
            id: "@_id",
            index: "@index"
        },
        templateUrl: 'templates/admin/teacher/edit.html',
        link: function ($scope) {
            if ($scope.mode == 'edit') {

                $scope.teacher =
                    $scope.$parent
                    && $scope.$parent.toEditTeachers[$scope.index]
                    || {
                        name: '',
                        avator: '',
                        intro: '暂无介绍'
                    };

            } else {
                $scope.teacher = {
                    name: '',
                    avator: '',
                    intro: '暂无介绍'
                };
            }
        },
        controller: function ($scope, $http, $location) {

            $scope.save = function () {
                var req = $http({
                    method: 'POST',
                    url: '/teachers/edit',
                    data: $scope.teacherInfo
                });
                $scope.$parent.teachers.push($scope.teacherInfo);

            };
            $scope.exit = function () {
                $scope.$parent.toEditTeachers.splice(parseInt($scope.index), 1);
                $scope.$parent.toEditTeachersIndexArray.splice(parseInt($scope.index), 1);
            };

            console.log($scope);

        }
    }
});
