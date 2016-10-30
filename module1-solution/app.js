(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.dishesList = '';
  $scope.counter = 0;

  $scope.countDishes = function() {
    if ($scope.dishesList === '') {
      $scope.resultMessage = 'Please enter data first';
      return;
    }
    var array = $scope.dishesList.split(',');

    if (array.length <= 3) {
      $scope.resultMessage = 'Enjoy!';
    } else {
      $scope.resultMessage = 'Too much!';
    }
  }
};
})();
