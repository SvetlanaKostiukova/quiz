/// <reference path="scripts\jquery\jquery.d.ts"/>
/// <reference path="scripts\jquery\jqueryui.d.ts"/>
/// <reference path="scripts\data\questions.ts"/>
/// <reference path="scripts\presenter\quiz.ts"/>
/// <reference path="scripts\view\questionview.ts"/>
/// <reference path="scripts\view\resultview.ts"/>
/// <reference path="scripts\view\startview.ts"/>

class Greeter {
    element: JQuery;
    span: HTMLElement;
    timerToken: number;

    constructor(element: JQuery) {
        this.element = element;
        this.element.startview();
        //this.element.innerHTML += "The time is: ";
        //this.span = document.createElement('span');
        //this.element.appendChild(this.span);
        //this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

$(document).ready(function () {
    var greeter = new Greeter($("#content"));
    //greeter.start();
});