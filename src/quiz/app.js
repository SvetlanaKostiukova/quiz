/// <reference path="scripts\jquery\jquery.d.ts"/>
/// <reference path="scripts\jquery\jqueryui.d.ts"/>
/// <reference path="scripts\data\questions.ts"/>
/// <reference path="scripts\presenter\quiz.ts"/>
/// <reference path="scripts\view\questionview.ts"/>
/// <reference path="scripts\view\resultview.ts"/>
/// <reference path="scripts\view\startview.ts"/>
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.startview();
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