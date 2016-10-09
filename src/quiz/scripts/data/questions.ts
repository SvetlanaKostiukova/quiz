module quiz {
    export module quizData {
        export interface IQuestion {
            CheckAnswer(answer: string): { isCorrect: boolean; comment: string };
            GetQuestion(): { question: string; answers: string[] }
            MixAnswers();
        }

        export interface IResult {
            AddResult(result: { idx: number; answer: string; result: { isCorrect: boolean; comment: string } });
            GetResults(): { title: string; correctAnswers: number };
            GetResult(idx: number): { answer: string; correct: string };
        }

        export class Question implements IQuestion {
            private question: string;
            private answers: string[];
            private correctAns: string;

            constructor(question: string, answers: string[], correctAnswer: string) {
                this.question = question;
                this.answers = answers.slice(0);
                this.correctAns = correctAnswer;
            }

            public CheckAnswer(obtainedAns: string): { isCorrect: boolean; comment: string } {
                if (this.correctAns == obtainedAns)
                    return { isCorrect: true, comment: this.correctAns };
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
            private answers: any[] = [];

            constructor(questions: number) {
                this.questionsAmount = questions;
            }

            public AddResult(result: { idx: number; answer: string; result: { isCorrect: boolean; comment: string } }) {
                var res = { answer: result.answer, correct: result.result.comment };
                if (this.answers[result.idx] == undefined) {
                    this.answers[result.idx] = res;
                    if (result.result.isCorrect)
                        this.correctAnswers++;
                }
            }

            public GetResult(idx: number): { answer: string; correct: string } {
                return this.answers[idx];
            }

            public GetResults(): { title: string; correctAnswers: number } {
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