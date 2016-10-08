module quiz {
    export module quizData {
        export interface IQuestion {
            CheckAnswer(answer: string): { isCorrect: boolean; comment: string };
            GetQuestion(): { question: string; answers: string[] }
            MixAnswers();
        }

        export interface IResult {
            AddResult();
            GetResult(): { title: string; correctAnswers: number };
        }

        export class Question implements IQuestion {
            private question: string;
            private answers: string[];
            private correctAns: string;

            constructor(question: string, answers: string[], correct: string) {
                this.question = question;
                this.answers = answers.slice(0);
                this.correctAns = correct;
            }

            public CheckAnswer(obtainedAns: string): { isCorrect: boolean; comment: string } {
                if (this.correctAns.indexOf(obtainedAns) > -1)
                    return { isCorrect: true, comment: "" };
                return { isCorrect: false, comment: this.correctAns };
            }

            public MixAnswers() {
                var newAnswers = [];
                for (var i = 0; i < this.answers.length; i++) {
                    var idx = Math.floor(Math.random() * (this.answers.length + 1));
                    while (newAnswers[idx]) {
                        idx = Math.floor(Math.random() * (this.answers.length + 1));
                    }
                    newAnswers[idx] = this.answers[i];
                }
                this.answers = newAnswers.slice(0);
            }

            public GetQuestion(): { question: string; answers: string[] } {
                return { question: this.question, answers: this.answers.slice(0) };
            }
        }

        export class Result implements IResult {
            private questionsAmount: number = 0;
            private correctAnswers: number = 0;

            constructor(questions: number) {
                this.questionsAmount = questions;
            }

            public AddResult() {
                this.correctAnswers++;
            }

            public GetResult(): { title: string; correctAnswers: number } {
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
                else return {
                    title: "Вы отлично помните X-Flies! Приятного просмотра 10- го сезона!",
                    correctAnswers: this.correctAnswers
                };
            }
        }
    }
}