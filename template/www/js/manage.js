//测试属性//////////////////////////////////要删
sessionStorage.setItem('eId',1);
var app = angular.module('manage', ['ionic','ion-datetime-picker']);
//添加过滤器
//多少小时前完成
app.filter("afterHour",function(){
  return function(time){
    var date=new Date();
    return parseInt((date-time)/1000/3600);
  }
});


//状态配置
app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider','$httpProvider',
  function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider) {
    //设置put和post请求头
    $httpProvider.defaults.headers.put['Content-Type']
        = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type']
        = 'application/x-www-form-urlencoded';


    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider
      //任务页面
      .state('work', {
        url: '/work',
        templateUrl: 'tpl/work.html',
        controller: 'workCtrl'
      })
      //任务页面子页面————我负责的
      .state('work.responsible', {
        url: '/workResponsible',
        templateUrl: 'tpl/workResponsible.html',
        controller: 'workResponsibleCtrl'
      })
      //任务页面子页面————我发起的
      .state('work.sponsor', {
        url: '/workSponsor',
        templateUrl: 'tpl/workSponsor.html',
        controller: 'workSponsorCtrl'
      })
      //任务页面子页面————我关注的
      .state('work.attention', {
        url: '/workAttention',
        templateUrl: 'tpl/workAttention.html',
        controller: 'workAttentionCtrl'
      })
      //项目页面
      .state('project', {
        url: '/project',
        templateUrl: 'tpl/project.html',
        controller: 'projectCtrl'
      })
      //动态页面
      .state('active', {
        url: '/active',
        templateUrl: 'tpl/active.html',
        controller: 'activeCtrl'
      })
      //个人页面
      .state('person', {
        url: '/person',
        templateUrl: 'tpl/person.html',
        controller: 'personCtrl'
      });
    $urlRouterProvider.otherwise('/work/workResponsible');
  }]);

//父元素控制器
app.controller('parentCtrl', ['$scope', '$state', '$ionicHistory','$location','$ionicModal','$http','$ionicPopup','$httpParamSerializerJQLike',
  function ($scope, $state, $ionicHistory,$location,$ionicModal,$http,$ionicPopup,$httpParamSerializerJQLike) {
    //设置请求数据库数据源
    $scope.address='http://3.maiyaoqiang.applinzi.com/';

    //获取员工列表和项目列表
    $scope.allList={
      project:[],
      employee:[]
    };


    //设置警告框
    $scope.showAlert=function(title,template){
      $ionicPopup.alert({
        title:title,
        template:template
      });
    };

    //保存work最近一次打开的子页
    $scope.workState = {state: '.responsible'};
    //$scope.work_nav = [
    //  true, false, false
    //];
    //$scope.workState={
    //  state:'workResponsible'
    //}
    //workSponsor页面的
    //保存图标状态
    $scope.iconToggle = {state: true};
    //保存文字状态
    $scope.txtToggle = {txt: '隐藏已完成任务'}
    $scope.jump = function (state, arg) {
      $state.go(state, arg);
    };

    $scope.goBack = function () {
      history.go(-1);
      console.log($ionicHistory.goBack());
    }


    //初始化新建任务数据
    $scope.projectContent = {
      work:'',
      project: '默认项目',
      responsible:'选择负责人',
      deadLine:'设置截止时间',
      attention:{},
      sponsorId:sessionStorage.getItem('eId')
    };
    //保存新建work
    $scope.saveNewWork=function(){
      //获取表单信息
      var content = $scope.projectContent;
      if(content.work==''){
      //  请填写任务名
        $scope.showAlert("信息不完整","请填写任务名");
      }else if( content.project=='默认项目'){
      //  请选择项目
        $scope.showAlert("信息不完整","请选择项目");
      }else if(content.responsible=='选择负责人' ){
      //  请选择负责人
        $scope.showAlert("信息不完整","请选择负责人");
      }else if(content.deadLine=='设置截止时间'){
      //  请选择截止时间
        $scope.showAlert("信息不完整","请这只截止时间");
      }else{
        content.deadLine=content.deadLine.getTime();
        $http({
          url: $scope.address+'data/newWork.php',
          method: 'POST',
          data:content
        }).success(function(data){
          console.log(data);
        });
      }
    };
    //设置返回上一页方法
    $scope.goBack=function(){
      history.go(-1);
    };


    //项目模态框
    $ionicModal.fromTemplateUrl('project.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.projectModal ={
        modal:modal,
        show:function(){modal.show()},
        hide:function(){modal.hide()}
      };
    });

    //负责人模态框
    $ionicModal.fromTemplateUrl('principal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.principalModal ={
        modal:modal,
        show:function(){modal.show()},
        hide:function(){modal.hide()}
      };

    });



    //关注人模态框
    $ionicModal.fromTemplateUrl('attention.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.attentionModal ={
        modal:modal,
        show:function(){modal.show()},
        hide:function(){modal.hide()}
      };

    });


    //整体模态框
    $ionicModal.fromTemplateUrl('newWork.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.newWorkModal ={
        modal:modal,
        show:function(){
          modal.show();
          $http.get($scope.address+'data/getEmployee.php')
              .success(function(data){
                $scope.allList.employee=data;
              });
          $http.get($scope.address+'data/getProject.php')
              .success(function(data){
                $scope.allList.project=data;
              });
        },
        hide:function(){modal.hide()}
      };

    });

    //任务详情模态框
    $ionicModal.fromTemplateUrl('workDetail.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.workDetail ={
        modal:modal,
        show:function(title){
          //获取到wTitle title
          //查询数据库获取详细数据


          modal.show()

        },
        hide:function(){modal.hide()}
      };
    });




    //  设置截止日期   插件！！！
    $scope.addRemindTime = function () {
      console.log("增加提醒时间设置");
      $scope.tmp = {};
      $scope.tmp.newDate = new Date().getTime();

      var birthDatePopup = $ionicPopup.show({
        //template: '<datetimepicker ng-model="tmp.newDate"></datetimepicker>',
        template: '<div ion-datetime-picker="" seconds="" am-pm="" ng-model="tmp.newDate"></div>',
        title: "Remind Time",
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function (e) {
              $scope.projectContent.deadline = $scope.tmp.newDate;
              console.log($scope.projectContent.deadLine);
            }
          }
        ]
      });
    }
  }]);



////////////////////////////////////////////
//work 任务控制器
app.controller('workCtrl', ['$scope', '$state', '$location','$http',
  function ($scope, $state, $location,$http) {
    //点击导航条事件函数
    $scope.jump = function (state, arg) {
      $state.go(state, arg);
    };
    //获取当前页面路由
    $scope.$on('$stateChangeSuccess',function(){
      $scope.workState.state = '.'+$location.path().slice(10).toLowerCase();
    });



  }]);
//work————workResponsible 我负责的 控制器
app.controller('workResponsibleCtrl', ['$scope','$http',
  function ($scope,$http) {
    //异步加载页面数据
    $http.get($scope.address+'data/getWorkResponsible.php?eId='+sessionStorage.getItem('eId'))
        .success(function(data){
          $scope.workResponsibleData=data;
          console.log(data);
        });
  }]);
//work————workSponsor 我发起的 控制器
app.controller('workSponsorCtrl', ['$scope','$http',
  function ($scope,$http) {
    //异步加载页面数据
    $http.get($scope.address+'data/getWorkSponsor.php?eId='+sessionStorage.getItem('eId'))
        .success(function(data){
          //data[0] 未完成
          //data[1] 已完成
          $scope.workSponsoreData=data;
        });

    //切换图标和文字的方法
    $scope.listToggle = function () {
      if ($scope.iconToggle.state) {
        $scope.iconToggle.state = false;
        $scope.txtToggle.txt = '显示已完成任务';
      } else {
        $scope.iconToggle.state = true;
        $scope.txtToggle.txt = '隐藏已完成任务';
      }
    };


  }]);
//work————workAttention 我关注的 控制器
app.controller('workAttentionCtrl', ['$scope','$http',
  function ($scope,$http) {
    //异步加载页面数据
    $http.get($scope.address+'data/getWorkAttention.php?eId='+sessionStorage.getItem('eId'))
        .success(function(data){
          $scope.workAttentionData=data;
        });
  }]);

//project 项目控制器
app.controller('projectCtrl', ['$scope','$location',
  function ($scope,$location) {

  }]);

//active 动态控制器
app.controller('activeCtrl', ['$scope',
  function ($scope) {

  }]);

//person 个人控制器
app.controller('personCtrl', ['$scope',
  function ($scope) {

  }]);

//日期插件设置日期表头
app.run(['$ionicPickerI18n',function($ionicPickerI18n) {
  $ionicPickerI18n.weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  $ionicPickerI18n.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  $ionicPickerI18n.ok = "确定";
  $ionicPickerI18n.cancel = "取消";
  $ionicPickerI18n.okClass = "button-positive";
  $ionicPickerI18n.cancelClass = "button-stable";
}]);


