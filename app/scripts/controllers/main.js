'use strict';

angular.module('yotoApp')
  .controller('MainCtrl', function ($scope, angularFire, $q) {

    $scope.md5          = md5
    var tasksRef        = new Firebase("https://yoto.firebaseio.com/tasks")
    $scope.tasks        = []
    var tasksPromise    = angularFire(tasksRef, $scope, 'tasks', []);
    $scope.manager      = {
        init: function(tasksPromise){
            tasksPromise.then(function(tasks){})
        },
        add: function(task) {
            this.authorize(function(manager, user){
                task.user = user
                manager.getTasks().push(task)
                sendNotification("Task added succesfully", "info")
            })
        },
        remove: function(position) {
            this.authorize(function(manager){
                manager.getTasks().splice(position, 1)
                sendNotification("Task removed succesfully", "info")
            })
        },
        getTasks: function(){
            return $scope.tasks
        },
        authorize: function(callback){
            var emails = [
                'alessandro.nadalin@gmail.com'
            ]

            if ($scope.username && emails.indexOf($scope.username) != -1) {
                return callback(this, $scope.username)
            }

            sendNotification("You don't have the necessary permissions to edit items on this list: if an administrator gave you access to this board please sign-in with the Google+ connect.", "warning")
        }
    }

    var sendNotification = function(content, type){
        $scope.message = {
            content:    content,
            type:       type
        }
    }

    $scope.message = {}
    $scope.manager.init(tasksPromise)
    $scope.markdown =  function (markdown) {
        return new Showdown.converter().makeHtml(markdown || '')
    }

    var googleLogin = function ($scope) {
        gapi.signin.render('customBtn', {
            'callback': function(response){
                gapi.client.load('plus','v1', function(){
                    var request = gapi.client.request({
                        path: "/oauth2/v1/tokeninfo?id_token=" + response.id_token
                    });

                    request.execute(function(resp) {
                        if (resp.email) {
                            $scope.username = resp.email
                            $scope.$apply()
                        }
                    });
                });
            },
            'clientid': '20983364743.apps.googleusercontent.com',
            'cookiepolicy': 'single_host_origin',
            'requestvisibleactions': 'http://schemas.google.com/AddActivity',
            'scope': 'https://www.googleapis.com/auth/userinfo.email'
        });
    }

    $scope.username = ''
    googleLogin($scope)
  });
