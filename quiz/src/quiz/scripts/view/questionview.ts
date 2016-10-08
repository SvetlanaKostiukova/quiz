/// <reference path="..\scripts\jquery.d.ts"/>
/// <reference path="..\scripts\jqueryui.d.ts"/>

(function ($) {
    $.widget("quiz.questionview", {
        options: {
        },

        
    });
} (jQuery));

interface JQuery {
    questionview(): any;
    questionview(settings: Object): any;
    questionview(methodName: string, arg: any): any;
}  