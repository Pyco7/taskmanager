
angular
  .module('taskApp')
  .component('tileForm', {
    require: {
      parent: '^tileList'
    },
    templateUrl: '/static/tiles/tile-form.html',
    controllerAs: 'vm',
    controller: ['$scope', '$http', function TileFormController($scope, $http) {
      var vm = this;

      vm.$onInit = function() {
        if (vm.parent.viewName === 'edit') {
          vm.data = vm.parent.selectedTile;
          vm.model = {
            id: vm.data.id,
            status: vm.parent.statusChoices[vm.data.status],
            launch_date: new Date(vm.data.launch_date)
          };
        }

        vm.form = 'TileForm';
        vm.options = {};

        vm.fields = [
          {
            key: 'status',
            type: 'select',
            defaultValue: vm.model ? vm.model.status : '',
            templateOptions: {
              label: 'Status',
              options: [
                {value: 'L', name: 'Live'},
                {value: 'P', name: 'Pending'},
                {value: 'A', name: 'Archived'}
              ]
            }
          }, {
            key: 'launch_date',
            type: 'input',
            templateOptions: {
              type: 'date',
              label: 'Launch Date'
            }
          }, {
            key: 'launch_date',
            type: 'input',
            templateOptions: {
              type: 'time',
              label: 'Time'
            }
          }
        ];

        vm.originalFields = angular.copy(vm.fields);
      };

      vm.onSubmit = function() {
        vm.options.updateInitialValue();
        var data = JSON.stringify({
          status: vm.model.status,
          launch_date: vm.model.launch_date
        });
        var promise = vm.parent.viewName === 'create'
                ? $http.post('api/tiles/', data)
                : $http.put('api/tiles/' + vm.data.id + '/', data);

        promise.then(function(response) {
          if (response.status === 200 || response.status === 201) {
            vm.parent.openTileList();
            vm.parent.fetch();
          } else {
            throw new Error('API error updating tiles!');
          }
        });
      };

      vm.onCancel = function() {
        vm.parent.openTileList();
      };
    }]
  });
