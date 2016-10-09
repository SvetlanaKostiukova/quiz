module quiz {
    export module uidrivers {
        export interface IStartView {
            SetOnStartCallback(callback: Function);
        }

        export interface IQuestionView {
            Set(question: { question: string; answers: string[] });
            SetResult(result: { answer: string; correct: string });
            SetOnSelectedAnswer(callback: Function);
        }

        export interface IResultView {
            Set(result: { title: string; correctAnswers: number });
        }

        export interface IQuiz {
            SetOnNextClick(callback: Function);
            SetOnPrevClick(callback: Function);
            SetMode(mode: string);
            SetPages(n: number);
            SetPageNumber(n: number);
        }

        export class StartDriver implements IStartView {
            private widget: JQuery;

            constructor(widget: JQuery) {
                this.widget = widget;
            }

            public SetOnStartCallback(callback: Function) {
                this.widget.startview({ onstartclick: callback });
            }
        }

        export class QuestionViewDriver implements IQuestionView {
            private widget: JQuery;
            private setonselected: Function;

            constructor(widget: JQuery) {
                this.widget = widget;
            }

            public Set(question: { question: string; answers: string[] }) {
                this.widget.questionview({ question: question });
            }

            public SetResult(result: { answer: string; correct: string } ) {
                this.widget.questionview({ result: result });
            }

            public SetOnSelectedAnswer(callback: Function) {
                this.setonselected = callback;
                this.widget.questionview({
                    onselectedanswer: callback
                });
            }

        }

        export class ResultDriver implements IResultView {
            private widget: JQuery;

            constructor(widget: JQuery) {
                this.widget = widget;
            }

            Set(result: { title: string; correctAnswers: number }) {
                this.widget.resultview({ result: result });
            }
        }

        export class QuizDriver implements IQuiz {
            private widget: JQuery;

            constructor(widget: JQuery) {
                this.widget = widget;
            }

            public SetOnNextClick(callback: Function) {
                this.widget.quizview({ onnextclick: callback });
            }

            public SetOnPrevClick(callback: Function) {
                this.widget.quizview({ onprevclick: callback });
            }

            public SetMode(mode: string) {
                this.widget.quizview({ mode: mode });
            }

            public SetPages(n: number) {
                this.widget.quizview({ pages: n });
            }

            public SetPageNumber(n: number) {
                this.widget.quizview({ pageNumber: n });
            }

        }
    }
} 