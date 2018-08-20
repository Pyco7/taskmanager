
angular
  .module('taskApp')
  .component('taskForm', {
    require: {
      parent: '^taskList'
    },
    templateUrl: '/static/tasks/task-form.html',
    controllerAs: 'vm',
    controller: ['$scope', '$http', function TaskFormController($scope, $http) {
      var vm = this;

      vm.$onInit = function() {
        if (vm.parent.viewName === 'edit') {
          vm.data = vm.parent.selectedTask;
          vm.model = {
            id: vm.data.id,
            tile: vm.parent.parent.selectedTile,
            title: vm.data.title,
            order: vm.data.order,
            task_type: vm.data.task_type,
            description: vm.data.description
          };
        } else if (vm.parent.viewName === 'create') {
          vm.model = {
            tile: vm.parent.parent.selectedTile
          };
        }

        vm.form = 'TaskForm';
        vm.options = {};

        vm.fields = [
          {
            key: 'title',
            type: 'input',
            templateOptions: {
              label: 'Title'
            }
          }, {
            key: 'order',
            type: 'input',
            templateOptions: {
              label: 'Order'
            }
          }, {
            key: 'task_type',
            type: 'input',
            templateOptions: {
              label: 'Type'
            }
          }, {
            key: 'description',
            type: 'input',
            templateOptions: {
              label: 'Description'
            }
          }
        ];

        vm.originalFields = angular.copy(vm.fields);
      };

      vm.onSubmit = function() {
        vm.options.updateInitialValue();
        var data = JSON.stringify(vm.model);
        var promise = vm.parent.viewName === 'create'
                ? $http.post('api/tasks/', data)
                : $http.put('api/tasks/' + vm.data.id + '/', data);

        promise.then(function(response) {
          if (response.status === 200 || response.status === 201) {
            vm.parent.openTaskList();
            vm.parent.fetch();
          } else {
            throw new Error('API error updating tiles!');
          }
        });
      };

      vm.onCancel = function() {
        vm.parent.openTaskList();
      };
    }]
  });
