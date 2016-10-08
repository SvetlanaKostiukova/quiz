/// <reference path="..\scripts\jquery.d.ts"/>
/// <reference path="..\scripts\jqueryui.d.ts"/>

(function ($) {
    $.widget("quiz.resultview", {
        options: {
        },


    });
} (jQuery));

interface JQuery {
    resulview(): any;
    resulview(settings: Object): any;
    resulview(methodName: string, arg: any): any;
}