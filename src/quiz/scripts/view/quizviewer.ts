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
            this.content = $("<div></div>").appendTo(this.element);
            this.startContent = $("<div></div>").appendTo(this.content);
            if (this.options.startview) {
                $(this.startContent).replaceWith(this.options.startview);
                this.startContent = this.options.startview;
            }

            this.testContent = $("<div></div>").appendTo(this.content).hide();

            this.pageNumbers = $("<div></div>").addClass("page-numbers").appendTo(this.content).hide();
            this.prevBttn = $("<div></div>").addClass("prev-bttn").appendTo(this.pageNumbers).click(function () {
                if (that.options.onprevclick !== undefined)
                    that.options.onprevclick();
            });
            var prevArrow = $("<div><</div>").appendTo(this.prevBttn);
            var prev = $("<div>Назад</div>").appendTo(this.prevBttn);

            this.progress = $("<div></div>").addClass("page").appendTo(this.pageNumbers);
            this.number = $("<p>" + this.options.pageNumber + "</p>").appendTo(this.progress);
            this.slash = $("<p>/</p>").appendTo(this.progress);
            this.maxPageNumber = $("<p>" + (this.options.pages - 2) + "</p>").appendTo(this.progress);

            this.nextBttn = $("<div></div>").addClass("next-bttn").appendTo(this.pageNumbers).click(function () {
                if (that.options.onnextclick !== undefined)
                    that.options.onnextclick();
            });
            var next = $("<div>Дальше</div>").appendTo(this.nextBttn);
            var nextArrow = $("<div>></div>").appendTo(this.nextBttn);

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
            this.prevBttn.show();
            if (this.options.pageNumber >= this.options.pages) {
                this.options.pageNumber = this.options.pages - 1;
                this.nextBttn.hide();
            }
            if (this.options.pageNumber == this.options.pages - 1)
                this.nextBttn.hide();
            if (this.options.pageNumber < 0)
                this.options.pageNumber = 0;
            if (this.options.pageNumber < 1)
                this.prevBttn.hide();
            $(this.number).text(this.options.pageNumber);
            var lis = $(indicatorsUl).find("li:lt(" + (this.options.pageNumber + 1) + ")");
            lis.children().addClass("completed");
        },

        changeMode: function () {
            switch (this.options.mode) {
                case "startview":
                    this.content.removeClass("quiz-div");
                    this.testContent.hide();
                    this.pageNumbers.hide();
                    this.startContent.show();
                    break;
                case "testview":
                    if (this.options.testview) {
                        this.content.addClass("quiz-div");
                        this.startContent.hide();

                        this.testContent.show();
                        $(this.testContent).replaceWith(this.options.testview);
                        this.testContent = this.options.testview;
                        this.pageNumbers.show();
                        this.progress.show();
                    }
                    break;
                case "resultview":
                    if (this.options.resultview) {
                        this.content.addClass("quiz-div");
                        this.options.pageNumber = this.options.pages;
                        this.startContent.hide();

                        this.testContent.show();
                        $(this.testContent).replaceWith(this.options.resultview);
                        this.testContent = this.options.resultview;
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
                    if (value < 1) value = 1;
                    this.options.pages = value;
                    this.refresh();
                    break;
                case "pageNumber":
                    if (value < 0 || value >= this.options.pages) value = 0;
                    this.options.pageNumber = value;
                    this.refresh();
                    break;
                default: break;
            }
            this._super(key, value);
        },

    });
} (jQuery));

interface JQuery {
    quizview(): any;
    quizview(settings: Object): any;
    quizview(methodName: string, arg: any): any;
}  