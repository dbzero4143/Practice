const main = document.querySelector('#main');
const userID = localStorage.getItem('userID');
const userPW = localStorage.getItem('userPW');

const selectDate = document.querySelector('#selectDate');

const inputContent = document.querySelector('#inputContent');
const contentClick = document.querySelector('#contentClick');
const contentList = document.querySelector('#contentList');

const todoList = [];
const pageNumberArray = [];

const index = todoList.length;

function inputContentProcess(){
    const p = document.createElement('li');
    const q = document.createElement('span');
    const br = document.createElement('br');
    const deleteBtn = document.createElement('button');

    const todoObj = {
        todo:inputContent.value
    }

    //todo 입력
    //todoList.push(JSON.stringify(todoObj));
    todoList.push(todoObj);

    console.log(todoList);

    //배열을 String으로 바꾸고 로컬 스토리지에 넣음
    localStorage.setItem(index,JSON.stringify(todoList));
    inputContent.value='';

    //todo 삭제
    deleteBtn.addEventListener("click", function(event){
        var todoListIndex = todoList.indexOf(todoObj.todo);

        todoList.splice(todoListIndex,1);

        contentList.removeChild(p);
        contentList.removeChild(q);

        console.log(contentList);
        
        
        localStorage.setItem(index,JSON.stringify(todoList));
    })

    //todo 리스트
    function contentListLoad(){
        deleteBtn.innerText = 'X';
        p.setAttribute("draggable", "true");

        for(var i in todoList){
            var todoListTodo = JSON.parse(localStorage.getItem(0));
            
            p.innerHTML = todoListTodo[i].todo;
        }
        
        q.appendChild(deleteBtn);
        q.appendChild(br);
        
        contentList.appendChild(q);
        
        contentList.insertBefore(p,q);

        p.style.display = 'inline-block';
    }
    contentListLoad();

    //드래그 시작점
    p.addEventListener("drag", function(){
        console.log('drag start');

        //드래그 시작되는 태그의 값 가져오기
        var temp = todoObj.todo;
        
        console.log(temp);
        
    },false)

    p.addEventListener("dragend", function () {
        var todoListLocal = JSON.stringify(localStorage.getItem(0));

        
        console.log('dragend'+todoObj.todo);
        
        
    })

    

    //todo 완료체크
    p.addEventListener("click", function(){
        p.style.textDecoration = 'line-through';
    })
    p.addEventListener("dblclick", function(){
        p.style.textDecoration = '';
    })
}

$( function() {
    $( "#datepicker" ).datepicker({
        dateFormat: 'yy-mm-dd'
        ,showOtherMonths: true
        ,onSelect: function(dateText, inst) {
            var date = $(this).val();
            console.log(date);
       }
    });
});

//아이디 불러오기
function init(){
     main.innerHTML = '<div>'+userID+' 님 어서오세요'+'</div>';
}

init();