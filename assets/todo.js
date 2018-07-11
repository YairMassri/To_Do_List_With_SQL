window.onload = function () {
    const leftBox = document.querySelector(".leftBox ul");
    const rightBox = document.querySelector(".rightBox ul");
    const btnAdd = document.querySelector(".btnAdd");
    const btnDel = document.querySelector(".btnDel");
    const done = document.querySelectorAll(".p button");

    // GET request example
    fetch('http://localhost:3178')
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.log(err))

    function addText() {
        const newTodo = window.prompt("What are you trying to do?");
        console.log(typeof newTodo);
        if (newTodo == "" || newTodo == null) {
            return "nada";
        } else {
            leftBox.innerHTML += `<li class='p'>${newTodo} <button>Done!</button></li>`;
            const done = document.querySelectorAll(".p button");
            done.forEach(function (change) {
                change.addEventListener('click', function (e) {
                    moveToTheRight(e)
                })
            })
        }
    }
    function moveToTheRight(e) {
        rightBox.appendChild(e.target.parentNode)
        e.target.parentNode.removeChild(e.target)
    }
    function deleteText() {
        const doneItems = rightBox.querySelectorAll("li")
        if (doneItems.length === 0) return
        rightBox.removeChild(doneItems[0])
    }




    btnAdd.addEventListener("click", function (event) {
        addText()
    })
    btnDel.addEventListener("click", function (event) {
        deleteText()
    })
    done.forEach(function (change) {
        change.addEventListener('click', function (e) {
            moveToTheRight(e)
        })
    })
}