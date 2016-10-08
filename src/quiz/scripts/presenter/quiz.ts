module quiz {

    export class QuizQuestions {
        private questions: quizData.IQuestion[];
        private questionView: uidrivers.IQuestionView;
        private results: quizData.IResult;
        private currentQuestion: number = 0;

        constructor(questions: quizData.IQuestion[], questionView: uidrivers.IQuestionView,
            results: quizData.IResult) {
            var that = this;
            this.questions = questions;
            this.questionView = questionView;
            this.results = results;

            this.questionView.SetOnSelectedAnswer(function (answer) {
                var result = that.questions[that.currentQuestion].CheckAnswer(answer);
                that.AddResult(result.isCorrect);
                that.questionView.SetResult( result.comment );
            })
        }

        public GetQuestion() {
            var currentQuestion = this.questions[this.currentQuestion];
            this.questionView.Show(currentQuestion);
        }

        public AddResult(result) {
            if (result)
                this.results.AddResult();
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