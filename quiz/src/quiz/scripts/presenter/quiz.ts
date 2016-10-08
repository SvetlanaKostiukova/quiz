module quiz {

    export class QuizQuestions {
        private questions: quizData.IQuestion[];
        private results: quizData.IResult;
        private currentQuestion: number = 0;

        constructor(questions: quizData.IQuestion[], results: quizData.IResult) {
            this.questions = questions;
            this.results = results;
        }

        public GetQuestion() {
            return this.questions[this.currentQuestion++];
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
                newQuestions[idx] = this.questions[i];
            }
            this.questions = newQuestions.slice(0);
        }
    }
}