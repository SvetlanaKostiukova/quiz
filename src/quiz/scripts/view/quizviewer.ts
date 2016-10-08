/// <reference path="..\jquery\jquery.d.ts"/>
/// <reference path="..\jquery\jqueryui.d.ts"/>

(function ($) {
    $.widget("quiz.quizview", {
        options: {
        },

        _create: function () {
            var that = this;
            this.element.empty();
            var content = $("<div></div>").appendTo(this.element);
            var indicators = $("<div></div>").appendTo(this.element);
        }

    });
} (jQuery));

interface JQuery {
    quizview(): any;
    quizview(settings: Object): any;
    quizview(methodName: string, arg: any): any;
}  