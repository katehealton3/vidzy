var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .when('/add-video', {
      templateUrl: 'partials/video-form.html',
      controller: 'AddVideoCtrl'
    })
    .when('/video/:id', {
      templateUrl: 'partials/video-form.html',
      controller: 'EditVideoCtrl'
    })
    .when('/video/delete/:id', {
      templateUrl: 'partials/video-delete.html',
      controller: 'DeleteVideoCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('HomeCtrl', function($scope, $resource) {
  var Video = $resource('/api/videos');
  $scope.videos = Video.query();
});

app.controller('AddVideoCtrl', function($scope, $resource, $location) {
  var Video = $resource('/api/videos');

  $scope.video = {};

  $scope.save = function() {
    Video.save($scope.video, function() {
      $location.path('/');
    });
  };
});

app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function($scope, $resource, $location, $routeParams) {
    var Videos = $resource('/api/videos/:id', { id: '@_id' }, {
      update: { method: 'PUT' }
    });

    Videos.get({ id: $routeParams.id }, function(video) {
      $scope.video = video;
    });

    $scope.save = function() {
      Videos.update({ id: $scope.video._id }, $scope.video, function() {
        $location.path('/');
      });
    };
  }
]);

app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
  function($scope, $resource, $location, $routeParams) {
    var Videos = $resource('/api/videos/:id');

    Videos.get({ id: $routeParams.id }, function(video) {
      $scope.video = video;
    });

    $scope.delete = function() {
      Videos.delete({ id: $routeParams.id }, function() {
        $location.path('/');
      });
    };
  }
]);
