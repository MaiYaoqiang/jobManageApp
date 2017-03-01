var app = angular.module('manage', ['ionic',"ion-datetime-picker"]);
app.controller('parentCtrl', ['$scope','$ionicModal','$ionicHistory',
  function ($scope,$ionicModal,$ionicHistory) {
    //初始化数据
    $scope.projectContent = {
      work:'',
      project: '默认项目',
      principal:'选择负责人',
      deadline:'',
      attention:[]
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



  //  设置截止日期   插件！！！
    $scope.addRemindTime = function () {
      console.log("增加提醒时间设置");
      $scope.tmp = {};
      $scope.tmp.newDate = new Date();

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
            }
          }
        ]
      });
    }
  }]);

app.run(['$ionicPickerI18n',function($ionicPickerI18n) {
  $ionicPickerI18n.weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  $ionicPickerI18n.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  $ionicPickerI18n.ok = "确定";
  $ionicPickerI18n.cancel = "取消";
  $ionicPickerI18n.okClass = "button-positive";
  $ionicPickerI18n.cancelClass = "button-stable";
}]);




