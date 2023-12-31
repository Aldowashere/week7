import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodoAsync,
  fetchTodos,
  removeAllTodos,
  removeTodoAsync,
} from '@/store/todoSlice';

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (!todoText.trim()) return;
    dispatch(addTodoAsync({ title: todoText }));
    setTodoText('');
  };

  const handleRemove = (todoId) => {
    dispatch(removeTodoAsync(todoId));
  };

  const handleRemoveAllTodos = () => {
    dispatch(removeAllTodos());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add New Todo"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleRemoveAllTodos}>Delete All Todos</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} {todo.title}
            <button onClick={() => handleRemove(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
