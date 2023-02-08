import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaCheck, FaCircle , FaRegTrashAlt} from "react-icons/fa";
import _ from 'lodash';

import './App.css'

import { deleteTodoAPI, getTodoAPI, postTodoAPI, putTodoAPI } from './api'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const setTodosEvent = async () => {
    const _todo = { id: uuidv4(), value: todo, checked: false }

    await postTodoAPI(_todo, async () => {
      setTodo("");
      await getTodos();
    })
  }

  const getTodos = async () => {
    await getTodoAPI({}, async (res) => {
      if (res.data) {
        setTodos(res.data);
      }
    });
  }

  const setTodoEvent = (value) => {
    setTodo(value)
  }

  const setTodoCheckdEvent = async (id, checked) => {
    await putTodoAPI({ id, checked: !checked }, async () => {
      await getTodos();
    });
  }

  const setTodoDeleteEvent = async (id) => {
    await deleteTodoAPI({ id }, async () => {
      await getTodos();
    });
  }

  useEffect(() => {
    const _getTodo = async () => {
      await getTodos();
    }
    _getTodo();
  }, []);

  return (
    <div className="App">
      <input type="text" value={todo} onChange={(e) => setTodoEvent(e.target.value)}></input>
      <input type="button" onClick={() => setTodosEvent()} value="저장"></input>

      {
        todos.map((element, index) => {
          return <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <div onClick={() => setTodoCheckdEvent(element.id, element.checked)}>
              {element.checked ? <FaCheck /> : <FaCircle />}
            </div>
            {element.value} 
            <div onClick={() => setTodoDeleteEvent(element.id)}>
              <FaRegTrashAlt />
            </div>
          </div>
        })
      }
    </div>
  )
}

export default App
