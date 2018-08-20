
angular
  .module('taskApp')
  .component('tileList', {
    require: {
      parent: '^home'
    },
    templateUrl: '/static/tiles/tile-list.html',
    controller: ['$scope', '$http', function TileListController($scope, $http) {
      var vm = this;
      vm.viewName = 'list';
      vm.statusChoices = {
        'L': 'Live',
        'P': 'Pending',
        'A': 'Archived'
      };
      $scope.statusFilterChoices = [
        'All',
        'Live',
        'Pending',
        'Archived'
      ];

      var getSelectedTiles = function () {
        return vm.filterStatus === 'All'
          ? vm.allTiles
          : vm.allTiles.filter(function(tile) {
              return tile.status === vm.filterStatus;
          });
      };

      vm.fetch = function() {
        $http.get('api/tiles/').then(function(response) {
          if (response.status === 200) {
            vm.allTiles = response.data.map(function (tile) {
              return {
                id: tile.id,
                status: vm.statusChoices[tile.status],
                launch_date: tile.launch_date,
                task_count: tile.tasks
              }
            });
            $scope.tiles = getSelectedTiles();
          } else {
            throw new Error('API error fetching tiles!');
          }
        });
      };

      vm.$onInit = function() {
        vm.selectedTile = null;
        vm.filterStatus = 'All';
        vm.fetch();
      };

      vm.filterTiles = function() {
        $scope.tiles = getSelectedTiles();
      };

      vm.openTileList = function () {
        vm.selectedTile = null;
        vm.viewName = 'list';
      };

      vm.createTile = function() {
        vm.viewName = 'create';
      };

      vm.editTile = function(tile) {
        vm.viewName = 'edit';
        vm.selectedTile = tile;
      };

      vm.deleteTile = function(tileId) {
        $http.delete('api/tiles/' + tileId + '/').then(function(response) {
          if (response.status === 204) {
            vm.fetch();
          } else {
            throw new Error('API error deleting tile!');
          }
        });
      };
    }]
  });

// angular
//   .module('taskApp')
//   .controller('TileListController', function ($scope, $http) {
//     $scope.tiles = null;
//
//     function fetch() {
//       $http.get('api/tiles/').then(function(response) {
//         $scope.tiles = response.data;
//       });
//     }
//
//     $scope.$watch('search', function() {
//       fetch();
//     });
//
//     $scope.getRequest = function () {
//       console.log("I've been pressed!");
//       $http.get("http://urlforapi.com/get?name=Elliot")
//           .then(function successCallback(response){
//               $scope.response = response;
//           }, function errorCallback(response){
//               console.log("Unable to perform get request");
//           });
//     };
//   });
