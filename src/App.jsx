
import './App.css';
import { useState } from 'react';
import edit from "../src/images/edit.png";
import del from "../src/images/delete.png";


function App() {
  let [value, setValue] = useState("")
  let [todos, setTodos] = useState([

  ])

  let inp = document.querySelector(".todo__inp")
  let todoText = document.querySelector(".todo__text")
  let elItem = document.querySelector(".todo__item")

  let formSubmit = (evt) => {
    evt.preventDefault()
    setTodos([...todos, {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      text: value,
      isComplated: false,
    }]);
    console.log(todos);
    inp.value = " "
  }

  let delItem = (evt) => {
    evt.preventDefault()
    if (evt.target.matches(".imgdel")) {
      let todoId = evt.target.dataset.id
      console.log(todoId);
      let findedIndex = todos.findIndex((el) => el.id == todoId)
      todos.splice(findedIndex, 1)
      setTodos(todos.map((item) => item))
    }
    if (evt.target.matches(".imgedit")){
      let todoId = evt.target.dataset.id
 
      let elEdit = prompt("Edit text TO-DO", "");
     
      let findedItem = todos.find((el) => el.id == todoId)
      
      findedItem.text = elEdit
     
    }
    setTodos(todos.map((item) => item))
  }

  let editItem = (evt) =>{
    evt.preventDefault()
    
  }


  return (
    <div className="App">
      <div className='container'>
        <h2 className='todo__title'> TO-DO</h2>
        <form className='todo__form' onSubmit={formSubmit}>

          <input className='todo__inp' type="text" onChange={(evt) => setValue(evt.target.value)} placeholder="Add todo" />
          <button className='todo__submit' type='submit'>SUBMIT</button>

        </form>

        <ul className='todo__list' onClick={delItem}  >
          {
            todos.map(item => (
              <li data-id={item.id} className='todo__item' >
                <div className='text__wrapper' >
                <span className='todo__number'>{todos.indexOf(item)+1}</span>
                <span className='todo__text'  data-id={item.id} >{item.text}</span>
                </div>
                <div className='btn__wrapper'>
                <button className='todo__edit' data-id={item.id}><img data-id={item.id} className='imgedit' src={edit} alt="" width={23} height={23} /></button>
                <button className='todo__delete' data-id={item.id}> <img className='imgdel' src={del} alt="" width={20} height={20} /> </button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>

  );
}

export default App;
