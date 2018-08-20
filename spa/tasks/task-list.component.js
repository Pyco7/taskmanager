
angular
  .module('taskApp')
  .component('taskList', {
    require: {
      parent: '^home'
    },
    templateUrl: '/static/tasks/task-list.html',
    controller: ['$scope', '$http', function TaskListController($scope, $http) {
      var vm = this;
      vm.viewName = 'list';

      vm.fetch = function() {
        var url = 'api/tasks/?tile_id=' + vm.parent.selectedTile;
        $http.get(url).then(function(response) {
          if (response.status === 200) {
            $scope.tasks = response.data;
          } else {
            throw new Error('API error fetching tiles!');
          }
        });
      };

      vm.$onInit = function() {
        vm.viewName = 'list';
        vm.selectedTask = null;
        $scope.closeTile = vm.parent.closeTile;
        vm.fetch();
      };

      vm.openTaskList = function () {
        vm.viewName = 'list';
      };

      vm.createTask = function() {
        vm.viewName = 'create';
      };

      vm.editTask = function(task) {
        vm.viewName = 'edit';
        vm.selectedTask = task;
      };

      vm.deleteTask = function(taskId) {
        $http.delete('api/tasks/' + taskId + '/').then(function(response) {
          if (response.status === 204) {
            vm.fetch();
          } else {
            throw new Error('API error deleting task!');
          }
        });
      };
    }]
  });
