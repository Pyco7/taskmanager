
angular
  .module('taskApp', ['formly', 'formlyBootstrap'])
  .component('home', {
    template: '<div id="home">' +
              '    <tile-list ng-if="component === \'tileList\'"></tile-list>' +
              '    <task-list ng-if="component === \'taskList\'"></task-list>' +
              '</div>',
    controller: ['$scope', '$http', function HomeController($scope) {
      var vm = this;
      vm.$onInit = function() {
        $scope.component = 'tileList';
      };

      vm.openTile = function(tileId) {
        $scope.component = 'taskList';
        vm.selectedTile = tileId;
      };

      vm.closeTile = function() {
        $scope.component = 'tileList';
        vm.selectedTile = null;
      };
    }]
  });
