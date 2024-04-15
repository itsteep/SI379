import React, { useState, useEffect, useRef } from 'react';

function MyTodoList() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [workDuration, setWorkDuration] = useState(
    JSON.parse(localStorage.getItem('workDuration')) || 25 * 60
  );
  const [breakDuration, setBreakDuration] = useState(
    JSON.parse(localStorage.getItem('breakDuration')) || 5 * 60
  );
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [sessionType, setSessionType] = useState('work'); // or 'break'
  const [activeTodoId, setActiveTodoId] = useState(null);
  
  const inputRef = useRef();
  const intervalRef = useRef();

  const handleStartTimer = (todoId) => {
    setActiveTodoId(todoId);
    setIsActive(true);
    setTimeLeft(workDuration);
    setSessionType('work');
  };

  const handleCancelTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(workDuration);
    setIsActive(false);
    setActiveTodoId(null);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            const nextSessionType = sessionType === 'work' ? 'break' : 'work';
            const nextDuration = nextSessionType === 'work' ? workDuration : breakDuration;

            if (sessionType === 'work') {
              setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                  todo.id === activeTodoId
                    ? { ...todo, completedSessions: todo.completedSessions + 1 }
                    : todo
                )
              );
            }

            setSessionType(nextSessionType);
            return nextDuration;
          }

          return prevTimeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current); // Cleanup interval on unmount
  }, [isActive, sessionType, activeTodoId, workDuration, breakDuration]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('workDuration', JSON.stringify(workDuration));
    localStorage.setItem('breakDuration', JSON.stringify(breakDuration));
  }, [todos, workDuration, breakDuration]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      description: inputRef.current.value,
      completedSessions: 0,
    };
    setTodos([...todos, newTodo]);
    inputRef.current.value = '';
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.description} - {todo.completedSessions} sessions
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
            <button onClick={() => handleStartTimer(todo.id)}>Start</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTodo}>Add Todo</button>
      <div>
        Timer: {sessionType} - {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
      </div>
      <button onClick={handleCancelTimer} disabled={!isActive}>
        Cancel Timer
      </button>
      <button onClick={resetTimer} disabled={!isActive}>
        Reset Timer
      </button>
    </div>
  );
}

export default MyTodoList;