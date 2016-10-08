/// <reference path="..\jquery\jquery.d.ts"/>
/// <reference path="..\jquery\jqueryui.d.ts"/>

(function ($) {
    $.widget("quiz.questionview", {
        options: {
            question: [],
            result: undefined,
        },

        _create: function () {
            var that = this;
            var question = this.options.question;

            this.questionDiv = $("<div></div>").appendTo(this.element);
            this.question = $("<div>" + question.question + "</div>").appendTo(this.questionDiv);
            this.answersDiv = $("<div></div>").appendTo(this.element);
            var answersUl = $("<ul></ul>").appendTo(this.answersDiv);
            for (var i = 0; i < question.answers.length; i++) {
                var answer = $("<li>" + question.answers[i] + "</li>").appendTo(answersUl).click(function () {
                    if (that.options.onselectedanswer !== undefined) {
                        that.options.onselectedanswer($(this).text());
                    }
                    $(this).addClass("selected");
                });
            }


        },

        refresh: function () {
            var that = this;
            var selectedLi = this.answersDiv.find("li.selected").eq(0);
            var correctLi = this.answersDiv.find("li:contains('" + that.options.result + "')").eq(0);
            if (selectedLi.text() == this.options.result) {
                selectedLi.removeClass("selected").addClass("correct");
            } else {
                selectedLi.removeClass("selected").addClass("false");
                correctLi.addClass("correct").addClass("selected");
            }
        },

        _setOption: function (key, value) {
            switch (key) {
                case "question":
                    this.options.question = value;
                    break;
                case "result":
                    this.options.result = value;
                    this.refresh();
                    break;
                default: break;
            }
            this._super(key, value);
        },
    });
} (jQuery));

interface JQuery {
    questionview(): any;
    questionview(settings: Object): any;
    questionview(methodName: string, arg: any): any;
}  