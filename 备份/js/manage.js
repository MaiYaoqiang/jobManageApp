var app = angular.module('manage', ['ionic']);
//状态配置
app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
  function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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
app.controller('parentCtrl', ['$scope', '$state', '$ionicHistory','$location',
  function ($scope, $state, $ionicHistory,$location) {
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

  }]);

//work 任务控制器
app.controller('workCtrl', ['$scope', '$state', '$location',
  function ($scope, $state, $location) {

    //点击导航条事件函数
    $scope.jump = function (state, arg) {
      $state.go(state, arg);

    };

    $scope.toNewWork = function () {
      location.href='newWork.html';
    };

    //获取当前页面路由
    $scope.$on('$stateChangeSuccess',function(){
      $scope.workState.state = '.'+$location.path().slice(10).toLowerCase();
    });

  }]);
//work————workResponsible 控制器
app.controller('workResponsibleCtrl', ['$scope',
  function ($scope) {

  }]);
//work————workSponsor 控制器
app.controller('workSponsorCtrl', ['$scope',
  function ($scope) {

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
//work————workAttention 控制器
app.controller('workAttentionCtrl', ['$scope',
  function ($scope) {

  }]);

//project 任务控制器
app.controller('projectCtrl', ['$scope','$location',
  function ($scope,$location) {

  }]);

//active 任务控制器
app.controller('activeCtrl', ['$scope',
  function ($scope) {

  }]);

//person 任务控制器
app.controller('personCtrl', ['$scope',
  function ($scope) {

  }]);

