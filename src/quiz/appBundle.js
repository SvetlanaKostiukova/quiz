///#source 1 1 /scripts/data/questions.js
var quiz;
(function (quiz) {
    var quizData;
    (function (quizData) {
        var Question = (function () {
            function Question(question, answers, correct) {
                this.question = question;
                this.answers = answers.slice(0);
                this.correctAns = correct;
            }
            Question.prototype.CheckAnswer = function (obtainedAns) {
                if (this.correctAns.indexOf(obtainedAns) > -1)
                    return { isCorrect: true, comment: "" };
                return { isCorrect: false, comment: this.correctAns };
            };
            Question.prototype.MixAnswers = function () {
                var newAnswers = [];
                for (var i = 0; i < this.answers.length; i++) {
                    var idx = Math.floor(Math.random() * (this.answers.length + 1));
                    while (newAnswers[idx]) {
                        idx = Math.floor(Math.random() * (this.answers.length + 1));
                    }
                    newAnswers[idx] = this.answers[i];
                }
                this.answers = newAnswers.slice(0);
            };
            Question.prototype.GetQuestion = function () {
                return { question: this.question, answers: this.answers.slice(0) };
            };
            return Question;
        })();
        quizData.Question = Question;
        var Result = (function () {
            function Result(questions) {
                this.questionsAmount = 0;
                this.correctAnswers = 0;
                this.questionsAmount = questions;
            }
            Result.prototype.AddResult = function () {
                this.correctAnswers++;
            };
            Result.prototype.GetResult = function () {
                var index = this.correctAnswers / this.questionsAmount;
                if (index < 0.33)
                    return {
                        title: "В годы показа X-Flies вас, вероятно, похитили инопланетяне",
                        correctAnswers: this.correctAnswers
                    };
                else if (index < 0.66)
                    return {
                        title: "Вы кое-что помните... Но истина всегда где-то рядом",
                        correctAnswers: this.correctAnswers
                    };
                else
                    return {
                        title: "Вы отлично помните X-Flies! Приятного просмотра 10- го сезона!",
                        correctAnswers: this.correctAnswers
                    };
            };
            return Result;
        })();
        quizData.Result = Result;
    })(quizData = quiz.quizData || (quiz.quizData = {}));
})(quiz || (quiz = {}));
//# sourceMappingURL=questions.js.map
///#source 1 1 /scripts/presenter/quiz.js
var quiz;
(function (quiz) {
    var QuizQuestions = (function () {
        function QuizQuestions(questions, questionView, results) {
            this.currentQuestion = 0;
            var that = this;
            this.questions = questions;
            this.questionView = questionView;
            this.results = results;
            this.questionView.SetOnSelectedAnswer(function (answer) {
                var result = that.questions[that.currentQuestion].CheckAnswer(answer);
                that.AddResult(result.isCorrect);
                that.questionView.SetResult(result.comment);
            });
        }
        QuizQuestions.prototype.GetQuestion = function () {
            var currentQuestion = this.questions[this.currentQuestion];
            this.questionView.Show(currentQuestion);
        };
        QuizQuestions.prototype.AddResult = function (result) {
            if (result)
                this.results.AddResult();
        };
        QuizQuestions.prototype.MixQuestions = function () {
            var newQuestions = [];
            for (var i = 0; i < this.questions.length; i++) {
                var idx = Math.floor(Math.random() * (this.questions.length + 1));
                while (newQuestions[idx]) {
                    idx = Math.floor(Math.random() * (this.questions.length + 1));
                }
                newQuestions[idx] = this.questions[i].MixAnswers();
            }
            this.questions = newQuestions.slice(0);
        };
        return QuizQuestions;
    })();
    quiz.QuizQuestions = QuizQuestions;
})(quiz || (quiz = {}));
//# sourceMappingURL=quiz.js.map
///#source 1 1 /scripts/uidrivers/uidrivers.js
var quiz;
(function (quiz) {
    var uidrivers;
    (function (uidrivers) {
        var QuestionViewDriver = (function () {
            function QuestionViewDriver(widget) {
                this.widget = widget;
            }
            QuestionViewDriver.prototype.Show = function (question) {
                this.widget.questionview({ question: question.GetQuestion() });
            };
            QuestionViewDriver.prototype.SetResult = function (result) {
                this.widget.questionview();
            };
            QuestionViewDriver.prototype.SetOnSelectedAnswer = function (callback) {
                this.setonselected = callback;
                this.widget.questionview({
                    onselectedanswer: callback
                });
            };
            return QuestionViewDriver;
        })();
        uidrivers.QuestionViewDriver = QuestionViewDriver;
    })(uidrivers = quiz.uidrivers || (quiz.uidrivers = {}));
})(quiz || (quiz = {}));
//# sourceMappingURL=uidrivers.js.map
///#source 1 1 /scripts/view/questionview.js
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
            }
            else {
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
}(jQuery));
//# sourceMappingURL=questionview.js.map
///#source 1 1 /scripts/view/resultview.js
/// <reference path="..\jquery\jquery.d.ts"/>
/// <reference path="..\jquery\jqueryui.d.ts"/>
(function ($) {
    $.widget("quiz.resultview", {
        options: {},
    });
}(jQuery));
//# sourceMappingURL=resultview.js.map
///#source 1 1 /scripts/view/startview.js
/// <reference path="..\jquery\jquery.d.ts"/>
/// <reference path="..\jquery\jqueryui.d.ts"/>
(function ($) {
    $.widget("quiz.startview", {
        options: {},
        _create: function () {
            var that = this;
            this.element.empty();
            var mainDiv = $("<div></div>").addClass("start").appendTo(this.element);
            var title = $("<h1>Помните ли вы те, прежние «Секретные материалы»?<h1>").appendTo(mainDiv);
            var subtitle = $("<h3>Тест на знание культового телесериала <h3>").appendTo(mainDiv);
            var startButton = $("<div></div>").addClass("start-button").appendTo(mainDiv);
            var startIcon = $("<div><div>").addClass("outter-icon").appendTo(startButton);
            var playBttn = $("<div></div>").addClass("inner-icon").appendTo(startIcon);
            var start = $("<div>Начать<div>").addClass("start-text").appendTo(startButton);
        }
    });
}(jQuery));
//# sourceMappingURL=startview.js.map
