/// <reference path="scripts\jquery\jquery.d.ts"/>
/// <reference path="scripts\jquery\jqueryui.d.ts"/>
/// <reference path="scripts\data\questions.ts"/>
/// <reference path="scripts\presenter\quiz.ts"/>
/// <reference path="scripts\uidrivers\uidrivers.ts"/>
/// <reference path="scripts\view\questionview.ts"/>
/// <reference path="scripts\view\resultview.ts"/>
/// <reference path="scripts\view\startview.ts"/>
/// <reference path="scripts\view\quizviewer.ts"/>
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        var startview = $("<div></div>").startview();
        var startDriver = new quiz.uidrivers.StartDriver(startview);
        var data = '{"questions":[{"question":"Анекдот 1990-х: Машина Джеймса Бонда, руль справа. Машина Штирлица, руль слева. Машина агентов Малдера и Скалли, руль…","answers":["Где-то рядом","Посередине","Похищен пришельцами","Не входит в комплектацию"],"correctAnswer":"Где-то рядом"},{"question":"Пароль на компьютере Малдера","answers":["IWANT2BELIEVE","TRUSTNO1","DANASCULLY","QWERTY"],"correctAnswer":"TRUSTNO1"},{"question":"Любимая книга агента Скалли в отрочестве","answers":["Анна Каренина","Война миров","Моби Дик","Приключения Тома Сойера"],"correctAnswer":"Моби Дик"},{"question":"Привычка агента Малдера","answers":["Грызть семечки","Носить сигарету за ухом","Пить водку из горла","Ругаться матом"],"correctAnswer":"Грызть семечки"},{"question":"Второй эпизод первого сезона назывался так же, как знаменитый фильм для взрослых","answers":["Глубокая глотка","Горькая луна","Калигула","9 ½ недель"],"correctAnswer":"Глубокая глотка"},{"question":"Название группы хакеров «Одинокие стрелки», помогающих агентам Малдеру и Скалли, отсылает к этому эпизоду американской истории","answers":["Бостонское чаепитие","Война за независимость","Убийство Дж. Ф. Кеннеди","Убийство Авраама Линкольна"],"correctAnswer":"Убийство Дж. Ф. Кеннеди"},{"question":"В каком штате чаще всего разворачиваются события сериала?","answers":["Вайоминг","Виргиния","Калифорния","Огайо"],"correctAnswer":"Виргиния"},{"question":"Каком из девяти сезонов агенты Малдер и Скалли в первый раз по-настоящему поцеловались?","answers":["В первом","В третьем","В пятом","В седьмом"],"correctAnswer":"В седьмом"},{"question":"Сигареты какой марки курит Курильщик, влиятельный член «Синдиката» (теневого правительства)?","answers":["Dunhill","Morley","L&M","Х&F"],"correctAnswer":"Morley"},{"question":"Похищение Скалли инопланетянами во 2-м сезоне не было запланировано по сценарию: это был вынужденный шаг, так как Джиллиан Андерсон…","answers":["Забеременела","Сломала позвоночник","Снималась в другом сериале","Была похищена инопланетянами"],"correctAnswer":"Забеременела"}]}';
        var parsedData = JSON.parse(data);
        var questions = [];
        for (var i = 0; i < parsedData.questions.length; i++) {
            var param = parsedData.questions[i];
            var question = new quiz.quizData.Question(param.question, param.answers, param.correctAnswer);
            questions.push(question);
        }
        var results = new quiz.quizData.Result(questions.length);
        var questionview = $("<div></div>").questionview();
        var questionDriver = new quiz.uidrivers.QuestionViewDriver(questionview);
        var resultview = $("<div></div>").resultview();
        var resultDriver = new quiz.uidrivers.ResultDriver(resultview);
        var quizviewer = this.element.quizview({
            startview: startview,
            testview: questionview,
            resultview: resultview,
            pages: questions.length + 2,
        });
        var quizDriver = new quiz.uidrivers.QuizDriver(quizviewer);
        var quizPresenter = new quiz.QuizQuestions(quizDriver, startDriver, questions, questionDriver, results, resultDriver);
        //this.element.innerHTML += "The time is: ";
        //this.span = document.createElement('span');
        //this.element.appendChild(this.span);
        //this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
$(document).ready(function () {
    var greeter = new Greeter($("#content"));
    //greeter.start();
});
//# sourceMappingURL=app.js.map