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
        var checkForm = function () {
            if ($scope.userInfo.email.length < 4 || $scope.userInfo.pwd.length < 4) {
                return false;
            }
            return true;
        };

        $scope.login = function () {
            if (checkForm()) {
                var req = $http({
                    method: 'POST',
                    url: '/login',
                    data: $scope.userInfo

                });
                req.success(function () {
                    setTimeout(function () {
                        location.href = "/manage";
                    }, 500)
                });
            }
        }

    }]
);
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
            toUpload: '=toUpload',
            isSync: "@isSync",
            formName: "@name"
        },
        templateUrl: 'templates/admin/uploader.html',
        link: function ($scope, $element) {
            console.log($element.find('input[type="file"]').eq(0));
            $element.find('input[type="file"]').eq(0).on('change', function () {
                $scope.getFileInfo();
            });

        },
        controller: function ($scope, $element, $http, $location) {
            function init() {
                $scope.info = "尚未上传文件";
                $scope.uploadFile = null;
                $scope.filesInfo = [];


                if ($scope.ismultiple != "") {
                    $element.find("input[type='file']").eq(0).attr("multiple", "");
                }
                if ($scope.isSync == 'true') {
                    $scope.isSync = true;
                } else {
                    $scope.isSync = false;
                }
                if ($scope.formName == null || $scope.formName.trim() == '') {
                    $scope.formName = 'files';
                }
            }

            init();


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
                    //$scope.$parent.toUpload.push("http://abc.xyz");
                    $scope.sendToParentScope();
                });
            };

            $scope.sendToParentScope = function () {
                if ($scope.$root.filesInfo) {

                } else {
                    $scope.$root.filesInfo = {};
                }
                $scope.$root.filesInfo[$scope.formName] = $scope.filesInfo;


                $scope.$root.files = {};

                for (var i in $scope.$root.filesInfo) {
                    $scope.$root.files[i] = [];
                    for (var j in $scope.$root.filesInfo[i]) {
                        $scope.$root.files[i].push($scope.$root.filesInfo[i][j].obj);
                    }
                }

                console.log($scope.$root);
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
                        "formData_name": 'file_' + new Date().getTime(),
                        obj: f_obj
                    };

                    $scope.filesInfo.push(f_info_obj);
                    loadUpdatedFile(i);

                }

                if ($scope.isSync) {
                    sendData();
                } else {
                    $scope.sendToParentScope();
                }

            };

        }
    }
})
;

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
                console.log($scope);
                $.ajax({
                    url: '/manage/teacher',
                    type: "POST",
                    data: getFormData(),
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                }).success(function (response) {
                    alert('!');
                    console.log(response);
                });

            };
            $scope.exit = function () {
                $scope.$parent.toEditTeachers.splice(parseInt($scope.index), 1);
                $scope.$parent.toEditTeachersIndexArray.splice(parseInt($scope.index), 1);
            };

            function getFormData(){

                var res = new FormData();
                for(var i in $scope.teacher){
                    res.append(i,$scope.teacher[i]);
                }
                res.append('img',$scope.$root.files.img);
                return res;
            }

        }
    }
});

app.directive('partnerEdit', function factory() {
    var directiveDefinitionObject = {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'templates/admin/partner/edit.html',
        scope: {
            mode: "@mode",
            partner_id: "@_id"
        },

        compile: function compile(tElement, tAttrs, transclude) {

            return function (scope, element, attrs) {
            }
        }

        ,
        link: function ($scope, $http, $element) {

        }
        ,
        controller: function ($scope, $http, $element) {
            function init() {
                if ($scope.mode == 'edit') {

                } else {
                    $scope.name = '';
                    $scope.banner = null;
                    $scope.logo = null;
                    $scope.introduction = '这个机构还没有简介';
                }
                console.log($scope);
            }

            $scope.submit = function () {
                var res = new FormData();
                res.append('name', $scope.name);
                res.append('introduction', $scope.introduction);
                res.append('logo', $scope.$root.files.logo[0]);
                res.append('banner', $scope.$root.files.banner[0]);
                $.ajax({
                    url: '/manage/partner',
                    type: "POST",
                    data: res,
                    processData: false,  // 告诉jQuery不要去处理发送的数据
                    contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                }).success(function (response) {
                    alert('!');
                    console.log(response);
                });
            };

            init();


        }
    };
    return directiveDefinitionObject;
});

app.controller('add_teacher',
    ['$scope', function ($scope) {

        var init = function () {
            $scope.toEditTeachers = [
                {
                    img: null,
                    name: '',
                    career: '',
                    description: '',
                    course: null
                }
            ];
            $scope.toEditTeachersIndexArray = [0];
        };
        init();

    }]
);