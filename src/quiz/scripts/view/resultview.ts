/// <reference path="..\jquery\jquery.d.ts"/>
/// <reference path="..\jquery\jqueryui.d.ts"/>

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