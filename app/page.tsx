'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // 1. CREATE: Crear con Enter (sin botón)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  // 2. TOGGLE: El chulito solo tacha/completa (no borra)
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 3. UPDATE: Guardar edición de texto (autoguardado al salir o presionar Enter)
  const updateTodoText = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    setEditingId(null);
  };

  // 4. DELETE: Botón aparte que elimina por completo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>TODO List — Sustentación</h2>

      {/* Input de creación */}
      <input
        type="text"
        placeholder="Escribe una tarea y presiona Enter..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box' }}
      />

      {/* Lista de tareas (READ) */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
              {/* Checkbox (solo tacha) */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />

              {/* Edición o Vista del ítem */}
              {editingId === todo.id ? (
                <input
                  type="text"
                  defaultValue={todo.text}
                  autoFocus
                  onBlur={(e) => updateTodoText(todo.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateTodoText(todo.id, e.currentTarget.value);
                    }
                  }}
                  style={{ width: '90%' }}
                />
              ) : (
                <span
                  onClick={() => setEditingId(todo.id)}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                    color: todo.completed ? '#888' : '#000',
                    flex: 1,
                  }}
                >
                  {todo.text}
                </span>
              )}
            </div>

            {/* Botón Eliminar */}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                backgroundColor: '#ff4d4d',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Eliminar
            </button>
          </li>
          <p>
            total de tareas
          </p>
        ))}
      </ul>
    </main>
  );
}