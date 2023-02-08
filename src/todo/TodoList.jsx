import { FaCheck, FaCircle, FaRegTrashAlt } from "react-icons/fa";

const TodoList = ({todo , setTodoEvent ,setTodosEvent, setTodoCheckdEvent , setTodoDeleteEvent, data}) => {
    return (
        <div className="App">
            <input type="text" value={todo} onChange={(e) => setTodoEvent(e.target.value)}></input>
            <input type="button" onClick={() => setTodosEvent()} value="저장"></input>
            {
                data.map((element, index) => {
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


export default TodoList