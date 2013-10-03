'use strict';

angular.module('yotoApp')
  .controller('MainCtrl', function ($scope) {

    var taskManager = {
        init: function(){
            if (this.getTasks() == undefined) {
                this.resetTasks()
            }
        },
        add: function(task) {
            var tasks = this.getTasks()
            tasks.push(task)
            this.setTasks(tasks)
        },
        remove: function(position) {
            var tasks = this.getTasks()
            tasks.splice(position, 1)

            this.setTasks(tasks)
        },
        getTasks: function(){
            return JSON.parse(localStorage.getItem('yoto.tasks'))
        },
        setTasks: function(tasks){
            localStorage.setItem('yoto.tasks', JSON.stringify(tasks))
        },
        resetTasks: function(){
            return localStorage.setItem('yoto.tasks', '[]')
        }
    }

    $scope.addTask = function(task) {
        taskManager.add(task)
        updateTasks(taskManager.getTasks())
        $scope.newTask = {}
    }

    $scope.removeTask = function(position) {
        taskManager.remove(position)
        updateTasks(taskManager.getTasks())
    }

    var updateTasks = function(tasks) {
        $scope.tasks = taskManager.getTasks()
    }

    taskManager.init()

    $scope.tasks = taskManager.getTasks()
    $scope.markdown =  function (markdown) {
        var converter = new Showdown.converter();

        return converter.makeHtml(markdown || '')
    }
  });
