///#source 1 1 /scripts/data/questions.js
var quiz;
(function (quiz) {
    var quizData;
    (function (quizData) {
        var Question = (function () {
            function Question(question, answers, correctAnswer) {
                this.question = question;
                this.answers = answers.slice(0);
                this.correctAns = correctAnswer;
            }
            Question.prototype.CheckAnswer = function (obtainedAns) {
                if (this.correctAns == obtainedAns)
                    return { isCorrect: true, comment: this.correctAns };
                return { isCorrect: false, comment: this.correctAns };
            };
            Question.prototype.MixAnswers = function () {
                var newAnswers = [];
                for (var i = 0; i < this.answers.length; i++) {
                    var idx = Math.floor(Math.random() * this.answers.length);
                    while (newAnswers[idx]) {
                        idx = Math.floor(Math.random() * this.answers.length);
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
                this.answers = [];
                this.questionsAmount = questions;
            }
            Result.prototype.AddResult = function (result) {
                var res = { answer: result.answer, correct: result.result.comment };
                if (this.answers[result.idx] == undefined) {
                    this.answers[result.idx] = res;
                    if (result.result.isCorrect)
                        this.correctAnswers++;
                }
            };
            Result.prototype.GetResult = function (idx) {
                return this.answers[idx];
            };
            Result.prototype.GetResults = function () {
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
        function QuizQuestions(driver, startview, questions, questionView, results, resultview) {
            this.currentQuestion = -1;
            this.currentPage = 0;
            var that = this;
            this.driver = driver;
            this.startView = startview;
            this.questions = questions;
            this.questionView = questionView;
            this.results = results;
            this.resultView = resultview;
            this.driver.SetMode("startview");
            this.driver.SetPages(this.questions.length + 2);
            this.startView.SetOnStartCallback(function () {
                that.Next();
            });
            this.driver.SetOnPrevClick(function () {
                that.Prev();
            });
            this.driver.SetOnNextClick(function () {
                that.Next();
            });
            this.questionView.SetOnSelectedAnswer(function (answer) {
                var result = that.questions[that.currentQuestion].CheckAnswer(answer);
                that.results.AddResult({ idx: that.currentQuestion, answer: answer, result: result });
                var res = that.results.GetResult(that.currentQuestion);
                if (res)
                    that.questionView.SetResult(res);
            });
        }
        QuizQuestions.prototype.GetQuestion = function () {
            var currentQuestion = this.questions[this.currentQuestion];
            this.questionView.Set(currentQuestion.GetQuestion());
            var result = this.results.GetResult(this.currentQuestion);
            if (result)
                this.questionView.SetResult(result);
        };
        QuizQuestions.prototype.Next = function () {
            this.currentQuestion++;
            this.currentPage++;
            this.driver.SetPageNumber(this.currentPage);
            if (this.currentQuestion >= this.questions.length) {
                this.driver.SetMode("resultview");
                this.resultView.Set(this.results.GetResults());
            }
            else {
                this.driver.SetMode("testview");
                this.GetQuestion();
            }
        };
        QuizQuestions.prototype.Prev = function () {
            this.currentQuestion--;
            this.currentPage--;
            this.driver.SetPageNumber(this.currentPage);
            if (this.currentQuestion < 0) {
                this.driver.SetMode("startview");
            }
            else {
                this.driver.SetMode("testview");
                this.GetQuestion();
            }
        };
        QuizQuestions.prototype.MixQuestions = function () {
            var newQuestions = [];
            for (var i = 0; i < this.questions.length; i++) {
                var idx = Math.floor(Math.random() * this.questions.length);
                while (newQuestions[idx]) {
                    idx = Math.floor(Math.random() * this.questions.length);
                }
                newQuestions[idx] = this.questions[i];
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
        var StartDriver = (function () {
            function StartDriver(widget) {
                this.widget = widget;
            }
            StartDriver.prototype.SetOnStartCallback = function (callback) {
                this.widget.startview({ onstartclick: callback });
            };
            return StartDriver;
        })();
        uidrivers.StartDriver = StartDriver;
        var QuestionViewDriver = (function () {
            function QuestionViewDriver(widget) {
                this.widget = widget;
            }
            QuestionViewDriver.prototype.Set = function (question) {
                this.widget.questionview({ question: question });
            };
            QuestionViewDriver.prototype.SetResult = function (result) {
                this.widget.questionview({ result: result });
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
        var ResultDriver = (function () {
            function ResultDriver(widget) {
                this.widget = widget;
            }
            ResultDriver.prototype.Set = function (result) {
                this.widget.resultview({ result: result });
            };
            return ResultDriver;
        })();
        uidrivers.ResultDriver = ResultDriver;
        var QuizDriver = (function () {
            function QuizDriver(widget) {
                this.widget = widget;
            }
            QuizDriver.prototype.SetOnNextClick = function (callback) {
                this.widget.quizview({ onnextclick: callback });
            };
            QuizDriver.prototype.SetOnPrevClick = function (callback) {
                this.widget.quizview({ onprevclick: callback });
            };
            QuizDriver.prototype.SetMode = function (mode) {
                this.widget.quizview({ mode: mode });
            };
            QuizDriver.prototype.SetPages = function (n) {
                this.widget.quizview({ pages: n });
            };
            QuizDriver.prototype.SetPageNumber = function (n) {
                this.widget.quizview({ pageNumber: n });
            };
            return QuizDriver;
        })();
        uidrivers.QuizDriver = QuizDriver;
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
                    var answerLi = $("<li></li>").appendTo(answersUl).click(function () {
                        if (that.options.onselectedanswer !== undefined) {
                            var answer = $(this).find(".answer-text").eq(0);
                            that.options.onselectedanswer(answer.text());
                        }
                    });
                    var icon = $("<div></div>").addClass("marker").appendTo(answerLi);
                    var iconSelected = $("<div></div>").appendTo(icon);
                    var text = $("<div>" + question.answers[i] + "</div>").addClass("answer-text").appendTo(answerLi);
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
            }
            else {
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
}(jQuery));
//# sourceMappingURL=questionview.js.map
///#source 1 1 /scripts/view/resultview.js
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
                var share = $("<div></div>").addClass("share").appendTo(resultDiv);
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
}(jQuery));
//# sourceMappingURL=resultview.js.map
///#source 1 1 /scripts/view/startview.js
/// <reference path="..\jquery\jquery.d.ts"/>
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
}(jQuery));
//# sourceMappingURL=startview.js.map
///#source 1 1 /scripts/view/quizviewer.js
/// <reference path="..\jquery\jquery.d.ts"/>
/// <reference path="..\jquery\jqueryui.d.ts"/>
(function ($) {
    $.widget("quiz.quizview", {
        options: {
            mode: "startview",
            pageNumber: 0,
            pages: 1,
        },
        _create: function () {
            var that = this;
            this.element.empty();
            var header = $("<div>© Газета.ру и Рамблер Инфографика, 2016</div>").addClass("content-header").appendTo(this.element);
            this.mainContent = $("<div></div>").appendTo(this.element);
            this.content = $("<div></div>").appendTo(this.mainContent);
            this.startContent = $("<div></div>").appendTo(this.content);
            this.testContent = $("<div></div>").appendTo(this.content).hide();
            if (this.options.startview) {
                $(this.startContent).replaceWith(this.options.startview);
                this.startContent = this.options.startview;
                this.height = $(this.startContent).height();
            }
            this.pageNumbers = $("<div></div>").addClass("page-numbers").appendTo(this.content).hide();
            //this.prevBttn = $("<div></div>").addClass("prev-bttn").appendTo(this.pageNumbers).click(function () {
            //    if (that.options.onprevclick !== undefined)
            //        that.options.onprevclick();
            //});
            //var prevArrow = $("<div><</div>").appendTo(this.prevBttn);
            //var prev = $("<div>Назад</div>").appendTo(this.prevBttn);
            this.progress = $("<div></div>").addClass("page").appendTo(this.pageNumbers);
            this.number = $("<div>" + this.options.pageNumber + "</div>").appendTo(this.progress);
            this.slash = $("<div>/</div>").appendTo(this.progress);
            this.maxPageNumber = $("<div>" + (this.options.pages - 2) + "</div>").appendTo(this.progress);
            this.nextBttn = $("<div></div>").addClass("next-bttn").appendTo(this.pageNumbers).click(function () {
                if (that.options.onnextclick !== undefined)
                    that.options.onnextclick();
            });
            var next = $("<div>ДАЛЬШЕ</div>").appendTo(this.nextBttn);
            var nextArrow = $("<div>></div>").addClass("arrow").appendTo(this.nextBttn);
            var clearfix = $("<div></div>").addClass("clearfix").appendTo(this.content);
            this.indicators = $("<div></div>").addClass("indicators").appendTo(this.element);
            this.refresh();
        },
        refresh: function () {
            this.indicators.empty();
            var indicatorsUl = $("<ul></ul>").appendTo(this.indicators);
            for (var i = 0; i < this.options.pages; i++) {
                var li = $("<li></li>").addClass("indicator").appendTo(indicatorsUl);
                var circle = $("<div></div>").addClass("circle-indicator").appendTo(li);
            }
            this.nextBttn.show();
            //this.prevBttn.show();
            if (this.options.pageNumber >= this.options.pages) {
                this.options.pageNumber = this.options.pages - 1;
                this.nextBttn.hide();
            }
            if (this.options.pageNumber == this.options.pages - 1)
                this.nextBttn.hide();
            if (this.options.pageNumber < 0)
                this.options.pageNumber = 0;
            //if (this.options.pageNumber < 1)
            //    this.prevBttn.hide();
            $(this.number).text(this.options.pageNumber);
            var lis = $(indicatorsUl).find("li:lt(" + (this.options.pageNumber + 1) + ")");
            lis.children().addClass("completed");
        },
        changeMode: function () {
            switch (this.options.mode) {
                case "startview":
                    this.mainContent.removeClass("main-border");
                    this.content.removeClass("quiz-div");
                    this.testContent.hide();
                    this.pageNumbers.hide();
                    this.startContent.show();
                    this.height = $(this.startContent).height();
                    break;
                case "testview":
                    if (this.options.testview) {
                        this.mainContent.addClass("main-border");
                        this.content.addClass("quiz-div");
                        this.startContent.hide();
                        this.testContent.show();
                        $(this.testContent).replaceWith(this.options.testview);
                        this.testContent = this.options.testview;
                        $(this.testContent).css("min-height", this.height);
                        this.pageNumbers.show();
                        this.progress.show();
                    }
                    break;
                case "resultview":
                    if (this.options.resultview) {
                        this.mainContent.addClass("main-border");
                        this.content.addClass("quiz-div");
                        this.options.pageNumber = this.options.pages;
                        this.startContent.hide();
                        this.testContent.show();
                        $(this.testContent).replaceWith(this.options.resultview);
                        this.testContent = this.options.resultview;
                        $(this.testContent).css("min-height", this.height);
                        this.pageNumbers.show();
                        this.progress.hide();
                    }
                    break;
                default: break;
            }
        },
        _setOption: function (key, value) {
            switch (key) {
                case "starview":
                    this.options.startview = value;
                    if (value) {
                        $(this.startContent).replaceWith(value);
                        this.startContent = this.options.startview;
                        this.height = $(this.startContent).height();
                    }
                    break;
                case "testview":
                    this.options.testview = value;
                    break;
                case "resultview":
                    this.options.resultview = value;
                    break;
                case "mode":
                    this.options.mode = value;
                    this.changeMode();
                    break;
                case "pages":
                    if (value < 1)
                        value = 1;
                    this.options.pages = value;
                    this.refresh();
                    break;
                case "pageNumber":
                    if (value < 0 || value >= this.options.pages)
                        value = 0;
                    this.options.pageNumber = value;
                    this.refresh();
                    break;
                default: break;
            }
            this._super(key, value);
        },
    });
}(jQuery));
//# sourceMappingURL=quizviewer.js.map
