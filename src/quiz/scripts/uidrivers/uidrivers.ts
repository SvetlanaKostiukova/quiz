module quiz {
    export module uidrivers {
        export interface IQuestionView {
            Show(question: quizData.IQuestion);
            SetResult(result: string );
            SetOnSelectedAnswer(callback: Function);
        }

        export interface IResultView {
        }

        export class QuestionViewDriver implements IQuestionView {
            private widget: JQuery;
            private setonselected: Function;

            constructor(widget: JQuery) {
                this.widget = widget;
            }

            public Show(question: quizData.IQuestion) {
                this.widget.questionview({ question: question.GetQuestion() });
            }

            public SetResult(result: string ) {
                this.widget.questionview();
            }

            public SetOnSelectedAnswer(callback: Function) {
                this.setonselected = callback;
                this.widget.questionview({
                    onselectedanswer: callback
                });
            }

        }
    }
} 