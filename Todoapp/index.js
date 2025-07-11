let myNodelist = document.getElementsByTagName("LI");


for (let i = 0; i < myNodelist.length; i++) {

    let closeSpan = document.createElement("SPAN");
    closeSpan.className = "close";
    closeSpan.textContent = "❌";
    myNodelist[i].appendChild(closeSpan);
    let editSpan = document.createElement("SPAN");
    editSpan.className = "edit";
    editSpan.textContent = "📝";
    editSpan.style.marginLeft = "10px";
    myNodelist[i].appendChild(editSpan);
}

let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let li = this.parentElement;
        li.style.display = "none";
    }
}

let edit = document.getElementsByClassName("edit");
for (let i = 0; i < edit.length; i++) {
    edit[i].onclick = function () {
        let li = this.parentElement;
        if (li.querySelector("input")) return;

        let currentText = li.childNodes[0].nodeValue.trim();
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.style.marginRight = "10px";

        li.insertBefore(input, li.firstChild);
        li.removeChild(li.childNodes[1]);

        this.textContent = "💾";

        this.onclick = () => {
            let updatedText = input.value.trim();
            let newTextNode = document.createTextNode(updatedText);
            li.insertBefore(newTextNode, input);
            li.removeChild(input);
            this.textContent = "📝";
            this.onclick = arguments.callee;
        };
    }
}

function newTask() {
    let inputElem = document.querySelector(".new-task");
    let inputValue = inputElem.value.trim();

    let li = document.createElement("LI");
    li.textContent = inputValue;

    let closeSpan = document.createElement("SPAN");
    closeSpan.className = "close";
    closeSpan.textContent = "❌";
    li.appendChild(closeSpan);

    closeSpan.onclick = function () {
        let li = this.parentElement;
        li.style.display = "none";
    }
    let editSpan = document.createElement("SPAN");
    editSpan.className = "edit";
    editSpan.textContent = "📝";
    editSpan.style.marginLeft = "10px";
    li.appendChild(editSpan);

    editSpan.onclick = function () {
        let li = this.parentElement;
        if (li.querySelector("input")) return;

        let currentText = li.childNodes[0].nodeValue.trim();
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.style.marginRight = "10px";

        li.insertBefore(input, li.firstChild);
        li.removeChild(li.childNodes[1]);
        this.textContent = "💾";

        this.onclick = () => {
            let updatedText = input.value.trim();
            let newTextNode = document.createTextNode(updatedText);
            li.insertBefore(newTextNode, input);
            li.removeChild(input);
            this.textContent = "📝";
            this.onclick = arguments.callee;
        };
    };

    document.getElementById("list-ul").appendChild(li);
    inputElem.value = "";
}
