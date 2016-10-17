import angular from 'angular';

angular.module('fswd.todo', [])
  .service('TodoListService', function($http) {
    var todoList = ['Groceries', 'Dinner', 'Breakfast'];

    this.retrieveTodoList = function() {
      return $http.get('/tasks')
        .then(function(response) {
          todoList = response.data;
        });
    };

    this.getTodoList = function() {
      return todoList;
    };

    this.removeTodo = function(item) {
      todoList = _.without(todoList, item);
    };

    this.addTodo = function(toAdd) {
      $http.post('/tasks', { todo: toAdd })
        .then(function(response) {
          todoList = response.data;
        });
    };

  })
  .controller('TodoListController', function(TodoListService, $scope) {
    var vm = this;
    TodoListService.retrieveTodoList();

    vm.removeTodo = function(item) {
      TodoListService.removeTodo(item);
    };

    vm.addTodo = function(toAdd) {
      TodoListService.addTodo(toAdd);
    };

    $scope.$watch(function() {
      return TodoListService.getTodoList();
    }, function(newVal, oldVal) {
      vm.todoList = newVal;
    });

  })
  .directive('fswdTask', function(){
    return {
      restrict: 'E',
      scope:{
        todo: '=task'
      }
      template: "{{ todo.name }}({{ todo.createdAt | date:'shortDate'}})"
    }

  });
