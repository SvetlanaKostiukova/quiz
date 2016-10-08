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