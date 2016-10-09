module quiz {

    export class QuizQuestions {
        private driver: uidrivers.IQuiz;
        private startView: uidrivers.IStartView;
        private questions: quizData.IQuestion[];
        private questionView: uidrivers.IQuestionView;
        private results: quizData.IResult;
        private resultView: uidrivers.IResultView;
        private currentQuestion: number = -1;
        private currentPage: number = 0;

        constructor(driver: uidrivers.IQuiz, startview: uidrivers.IStartView, questions: quizData.IQuestion[], questionView: uidrivers.IQuestionView,
            results: quizData.IResult, resultview: uidrivers.IResultView) {
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
            })
        }

        public GetQuestion() {
            var currentQuestion = this.questions[this.currentQuestion];
            this.questionView.Set(currentQuestion.GetQuestion());
            var result = this.results.GetResult(this.currentQuestion);
            if (result)
                this.questionView.SetResult(result);
        }

        public Next() {
            this.currentQuestion++;
            this.currentPage++;
            this.driver.SetPageNumber(this.currentPage);
            if (this.currentQuestion >= this.questions.length) {
                this.driver.SetMode("resultview");
                this.resultView.Set(this.results.GetResults());
            } else {
                this.driver.SetMode("testview");
                this.GetQuestion();
            }
        }

        public Prev() {
            this.currentQuestion--;
            this.currentPage--;
            this.driver.SetPageNumber(this.currentPage);
            if (this.currentQuestion < 0) {
                this.driver.SetMode("startview");
            } else {
                this.driver.SetMode("testview");
                this.GetQuestion();
            }
        }

        public MixQuestions() {
            var newQuestions = [];
            for (var i = 0; i < this.questions.length; i++) {
                var idx = Math.floor(Math.random() * (this.questions.length + 1));
                while (newQuestions[idx]) {
                    idx = Math.floor(Math.random() * (this.questions.length + 1));
                }
                newQuestions[idx] = this.questions[i].MixAnswers();
            }
            this.questions = newQuestions.slice(0);
        }
    }
}