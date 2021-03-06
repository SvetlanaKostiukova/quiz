﻿/// <reference path="..\jquery\jquery.d.ts"/>
/// <reference path="..\jquery\jqueryui.d.ts"/>

(function ($) {
    $.widget("quiz.startview", {
        options: {
            onstartclick: undefined,
        },

        _create: function () {
            var that = this;
            this.element.empty();
            var mainDiv = this.element.addClass("start");
            var title = $("<h1>Помните ли вы те, прежние «Секретные материалы»?<h1>").appendTo(mainDiv);
            var subtitle = $("<h3>Тест на знание культового телесериала <h3>").appendTo(mainDiv);

            var startButton = $("<div></div>").addClass("start-button").appendTo(mainDiv).click(function () {
                if (that.options.onstartclick !== undefined)
                    that.options.onstartclick();
            });
            var startIcon = $("<div><div>").addClass("outter-icon").appendTo(startButton);
            var playBttn = $("<div></div>").addClass("inner-icon").appendTo(startIcon);
            var start = $("<div>НАЧАТЬ<div>").addClass("start-text").appendTo(startButton);
        },
    });
} (jQuery));

interface JQuery {
    startview(): any;
    startview(settings: Object): any;
    startview(methodName: string, arg: any): any;
} 