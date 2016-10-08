var quiz;
(function (quiz) {
    var QuizQuestions = (function () {
        function QuizQuestions(questions, results) {
            this.currentQuestion = 0;
            this.questions = questions;
            this.results = results;
        }
        QuizQuestions.prototype.GetQuestion = function () {
            return this.questions[this.currentQuestion++];
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
                newQuestions[idx] = this.questions[i];
            }
            this.questions = newQuestions.slice(0);
        };
        return QuizQuestions;
    })();
    quiz.QuizQuestions = QuizQuestions;
})(quiz || (quiz = {}));
//# sourceMappingURL=quiz.js.map