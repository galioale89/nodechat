import * as  stockIO from "stock.io";
var socket: any;

const form: HTMLFormElement = document.querySelector('#myForm')!;
const message: HTMLInputElement = document.querySelector("#m")!;
const messages: HTMLDivElement = document.querySelector("#messages")!;
const waitText: HTMLLabelElement = document.querySelector("#wait")!;
form.onsubmit = () => {
    socket.emit('chat message', message?.value);
    message.value = "";
    return false;
};

socket.on('chat message', (msg: string) => {
    const li: HTMLLIElement = document.createElement("li");
    li.innerText = msg;
    messages.append(li);
    waitText.remove();
});