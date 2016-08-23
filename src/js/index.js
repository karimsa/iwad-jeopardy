/**
 * js/index.js - w3bp
 * Basic AngularJS setup for routing.
 * 
 * Licensed under MIT license.
 * Copyright (C) 2016 Karim Alibhai.
 */

window.app = function () {
    'use strict';

    const app = angular.module('w3bp', ['ngRoute', 'ngAnimate']);

    app.config(['$routeProvider', '$locationProvider', ($router, $location) => {
        $router.when('/', {
            templateUrl: '/views/index.html',
            controller: 'GameCtl'
        });

        $location.html5Mode(true);
    }]);

    app.directive('ngEnter', () => ($scope, $elm, $attrs) => {
        $elm.bind('keydown keypress', evt => {
            if ( evt.which === 13 ) {
                $scope.$apply(() => $scope.$eval($attrs.ngEnter));
                evt.preventDefault();
            }
        });
    });

    app.controller('GameCtl', ['$scope', $scope => {
        $scope.questions = {};
        $scope.teams = [];
        $scope.score = [];
        $scope.current = { player: 0 };

        $('#teamsMdl').modal('show');

        $.getJSON('/questions.json', function (data) {
            $scope.$apply(function () {
                $scope.questions = data;
            });
        });

        $scope.width = () => 100 / Object.keys($scope.questions).length;
        $scope.height = () => {
            for (let i in $scope.questions) {
                if ($scope.questions.hasOwnProperty(i)) {
                    return 100 / Object.keys($scope.questions[i]).length;
                }
            }
        };

        $scope.id = (a, b) => (a + '' + b).toLowerCase().replace(/[^a-z0-9]+/g, '-');

        $scope.start = num => {
            $scope.teams = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substr(0, num).split('');
            $scope.score = $scope.teams.map(_ => 0);
            $('#teamsMdl').modal('hide');
        };

        $scope.ask = (category, points, question) => {
            let li = $('[data-id="' + $scope.id(category, points) + '"]');
            if (li.is('.disabled')) return;

            $scope.current.question = question;
            $scope.current.category = category;
            $scope.current.points = points;

            li.addClass('clicked');
            setTimeout(() => {
                $('#questionMdl').modal('show');
                li.addClass('disabled');
            }, 2001);
        };

        $scope.right = () => {
            $scope.score[$scope.current.player] += parseInt($scope.current.points);
            
            $('#questionMdl').modal('hide');
            $('#answerMdl').modal('show');
        };

        $scope.wrong = () => {
            $('#questionMdl').modal('hide');
            $('#answerMdl').modal('show');
        };

        $scope.next = () => {
            $scope.current.player += 1;
            if ($scope.current.player === $scope.teams.length) $scope.current.player = 0;
            $('#answerMdl').modal('hide');
        };
    }]);

    return app;
}();