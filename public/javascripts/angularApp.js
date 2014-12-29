'use strict';

// Declare app level module which depends on views, and components
/*angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);*/

angular.module('flapperNews', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })
        .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        })
        $urlRouterProvider.otherwise('home');
    }])
    .factory('posts', [function(){
        var o = {
            posts:[
                {title: 'post 1', upvotes: 10, comments: []},
                {title: 'post 2', upvotes: 11, comments: []},
                {title: 'post 3', upvotes: 12, comments: []},
                {title: 'post 4', upvotes: 13, comments: []},
                {title: 'post 5', upvotes: 14, comments: []}
            ]
        };
        return o;
    }])
    .controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
          $scope.test = 'this is a test';
          $scope.posts = posts.posts;
          /*$scope.posts = [
            {title: 'post 1', upvotes: 10},
            {title: 'post 2', upvotes: 11},
            {title: 'post 3', upvotes: 12},
            {title: 'post 4', upvotes: 13},
            {title: 'post 5', upvotes: 14}
          ];*/
          $scope.addPost = function() {
              if(!$scope.title || $scope.title === '') { return; }
              $scope.posts.push({
                  title: $scope.title,
                  link: $scope.link,
                  upvotes: 0,
                  comments: [
                      {author: 'Joe', body: 'Cool post!', upvotes: 0},
                      {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
                  ]
              });
              $scope.title = '';
              $scope.link = '';
          }
          $scope.incrementUpvotes = function(post) {
              post.upvotes += 1;
          }
    }])
    .controller('PostsCtrl', ['$scope', '$stateParams','posts', function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];
        $scope.addComment = function() {
            if(!$scope.body || $scope.body === '' ) { return; }
            $scope.post.comments.push({author: 'User', body: $scope.body, upvotes: 0})
            $scope.body = '';
        }
        $scope.incrementUpvotes = function(comment) {
            comment.upvotes += 1;
        }
    }]);
