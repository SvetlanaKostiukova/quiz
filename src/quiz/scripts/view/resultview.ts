/// <reference path="..\jquery\jquery.d.ts"/>
/// <reference path="..\jquery\jqueryui.d.ts"/>

(function ($) {
    $.widget("quiz.resultview", {
        options: {
            result: undefined,
        },

        _create: function () {
            var that = this;
            this.createResult();
        },

        createResult: function () {
            if (this.options.result) {
                this.element.empty();
                var resultDiv = $("<div></div>").addClass("result").appendTo(this.element);
                var title = $("<h1>Помните ли вы те, прежние «Секретные материалы»?<h1>").appendTo(resultDiv);
                var answers = $("<h3>Правильные ответы: " + this.options.result.correctAnswers + "/10</h3>").appendTo(resultDiv);
                var comment = $("<h3>" + this.options.result.title + "</h3>").addClass("result-comment").appendTo(resultDiv);

                var share = $("<div></div>").addClass("share").appendTo(resultDiv)
                var shareDiv = $("<div><div>").addClass("share-block").appendTo(share);
                var shareText = $("<h5>Поделиться результатом</h5>").appendTo(shareDiv);

                var socialBlock = $("<div></div>").addClass("social-block").appendTo(shareDiv);
                var fcbook = $("<div></div>").addClass("social").addClass("facebook").appendTo(socialBlock);
                var vk = $("<div></div>").addClass("social").addClass("vk").appendTo(socialBlock);
                var twitter = $("<div></div>").addClass("social").addClass("tw").appendTo(socialBlock);
            }
        },

        _setOption: function (key, value) {
            switch (key) {
                case "result":
                    if (value) {
                        this.options.result = value;
                        this.createResult();
                    }
                    break;
                default: break;
            }
        }

    });
} (jQuery));

interface JQuery {
    resultview(): any;
    resultview(settings: Object): any;
    resultview(methodName: string, arg: any): any;
}