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

            this.createQuestion();
        },

        createQuestion: function () {
            var that = this;
            this.element.empty();

            var question = this.options.question;
            if (question && question.question && question.answers && question.answers.length != 0) {
                this.questionDiv = $("<div></div>").addClass("question-div").appendTo(this.element);
                this.question = $("<div>" + question.question + "</div>").addClass("question").appendTo(this.questionDiv);
                this.answersDiv = $("<div></div>").addClass("answers").appendTo(this.element);
                var answersUl = $("<ul></ul>").appendTo(this.answersDiv);
                for (var i = 0; i < question.answers.length; i++) {
                    var answer = $("<li>" + question.answers[i] + "</li>").appendTo(answersUl).click(function () {
                        if (that.options.onselectedanswer !== undefined) {
                            that.options.onselectedanswer($(this).text());
                        }
                    });
                }
            }
        },

        refresh: function () {
            var that = this;
            var result = this.options.result;
            var selectedLi = $(this.answersDiv).find("li:contains('" + result.answer + "')").eq(0);
            var correctLi = $(this.answersDiv).find("li:contains('" + result.correct + "')").eq(0);
            if (selectedLi.text() == this.options.result.correct) {
                selectedLi.addClass("correct");
            } else {
                selectedLi.addClass("false");
                correctLi.addClass("correct");
            }
        },

        _setOption: function (key, value) {
            switch (key) {
                case "question":
                    this.options.question = value;
                    this.createQuestion();
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