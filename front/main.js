window.onload = function () {

    const todosContainer = document.getElementById('todos-container');
    const newtodo = document.getElementById('new-todo-input');
    const addBtn = document.getElementById('add-todo-btn');
    const done = document.getElementById('done');

    addBtn.onclick = function (e) {
        console.log('add todo');
        if (newtodo.value) {
            fetch('/create-todo', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    text: newtodo.value,
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    if (response.affectedRows) {
                        insertTodo({
                            id: response.insertId,
                            text: newtodo.value,
                            complete: false,
                            created: response.created
                        });
                        newtodo.value = '';
                    }
                })
                .catch(error => console.error(error));
        } else {
            alert('No value inside the input...')

        }
    }

    fetch('/get-todos')
        .then(response => response.json())
        .then(response => {
            console.log(response)

            response.forEach(todo => {

                insertTodo(todo);

            });
        });

    function insertTodo(todo) {
        let container = document.createElement('div');
        container.id = todo.id;
        container.classList.add('todo');

        // let addTodo = this.document.querySelector("todo-input");
        // console.log(addTodo);

        let newtodo = document.getElementById('new-todo-input');
        newtodo.type = "input";


        let addBtn = document.getElementById('add-todo-btn');



        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        // checkbox.value = "value";
        checkbox.id = "checkbox-" + todo.id;
        checkbox.checked = todo.complete;
        checkbox.onclick = function (e) {
            fetch('/update-todo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    id: todo.id,
                    complete: checkbox.checked
                })
            })
                .then(response => response.json())
                .then(response => {

                    if (checkbox.checked) {
                        done.appendChild(e.target.parentNode)
                        // e.target.parentNode.removeChild(e.target)
                    }else{
                        todosContainer.appendChild(e.target.parentNode)
                    }

                })
                .catch(error => console.error(error));
            console.log('check box ' + todo.id + ' click');
            console.log(checkbox.checked);
        }

        let removeBtn = document.createElement('button');
        removeBtn.id = "removeBtn-" + todo.id;
        removeBtn.classList.add('removeBtn');
        removeBtn.innerHTML = 'X';
        removeBtn.onclick = function (e) {
            fetch('/delete-todo', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ id: todo.id })
            })
                .then(response => response.json())
                .then(response => {
                    console.log("it worked!", response)
                    if (response.affectedRows > 0) {
                        container.remove();
                    }
                })
                .catch(error => console.error(error));

            console.log('remove ' + todo.id + ' click');
        }

        let text = document.createElement('div');
        text.innerHTML = todo.text;

        container.appendChild(checkbox);
        container.appendChild(text);
        container.appendChild(removeBtn);

        if(checkbox.checked){
            done.appendChild(container);
        }else{
        todosContainer.appendChild(container);
        }
    }
}
