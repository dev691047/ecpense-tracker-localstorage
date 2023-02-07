// Variables can be declared and initialized without the var or
//  let keywords. However, a value must be assigned to a variable
// declared without the var keyword. The variables declared without
// the var keyword become global variables, irrespective of where they are declared.



window.addEventListener('load',()=>{
    // todos is a global variable
     todos=JSON.parse(localStorage.getItem('todos')) || [];

    const nameInput=document.querySelector('#name');
    const newToDoForm=document.querySelector('#new-todo-form');

    const username=localStorage.getItem('username')|| '';
    nameInput.value=username;
    nameInput.addEventListener('change',(e)=>{
                localStorage.setItem('username',e.target.value);
                console.log(username);
    })


    // form
    newToDoForm.addEventListener('submit',(e)=>{
         e.preventDefault();
         const todo={
            content:e.target.elements.content.value,
            amount:e.target.elements.amount.value,
            category:e.target.elements.category.value,
            done:false,
            createdAt:new Date().getTime()
         }

          todos.push(todo);
     localStorage.setItem('todos',JSON.stringify(todos));
     
    //reset after submitting
     e.target.reset();


     DisplayTodos();
    })
     
})

function DisplayTodos(){
    const todoList=document.querySelector('#todo-list');

    todoList.innerHTML='';
    todos.forEach(todo=>{
        const todoItem=document.createElement('div');
        todoItem.classList.add('todo-item');

        const label=document.createElement('label');
        const input=document.createElement('input');
        const span=document.createElement('span');
        const content=document.createElement('div');
        const actions=document.createElement('div');
        const  edit=document.createElement('button');
        const deletebtn=document.createElement('button');
        
        input.type='checkbox';
        input.checked=todo.done;
        span.classList.add('bubble');

        if(todo.category=='personal'){
            span.classList.add('personal');
        }else{
            span.classList.add('business');
        }
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deletebtn.classList.add('delete');

        content.innerHTML=`<input type="text" value="${todo.content} ${todo.amount}"
        readonly>`;
        edit.innerHTML='Edit';
        deletebtn.innerHTML='Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deletebtn);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if(todo.done){
            todoItem.classList.add('done')
        }
        // this input is the checkbox of the listitems
        input.addEventListener('click',(e)=>{
            // this e.target.check will set true and false to the todo.done 
              todo.done=e.target.checked;
            //   every time we put anychange we update the localStorage
              localStorage.setItem('todos',JSON.stringify(todos));


              if(todo.done){
                // this done class will place a cut on the text 
                todoItem.classList.add('done');
              }else{
                todoItem.classList.remove('done');
              }
              DisplayTodos();
        })
         
        // edit the itesm
         edit.addEventListener('blur',()=>{
            const input=content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur',(e)=>{
                input.setAttribute('readonly',true);
                todo.content=e.target.value;
                localStorage.setItem('todos',JSON.stringify(todos));
                DisplayTodos();
            })
         })

         deletebtn.addEventListener('click',(e)=>{
                todos=todos.filter(t=>t!=todo);
                localStorage.setItem('todos',JSON.stringify(todos));
                DisplayTodos();
         })


    })

}

