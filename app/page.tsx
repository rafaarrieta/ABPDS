'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodoText = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    setEditingId(null);
  };

  const deleteTodo = (id: number) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (todoToDelete) {
      setDeletedTodos([...deletedTodos, todoToDelete]);
    }
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <main style={{ width: '100%', maxWidth: '450px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '28px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        
        <h2 style={{ margin: '0 0 6px 0', color: '#111827', fontSize: '1.4rem', fontWeight: '700', textAlign: 'center' }}>
          Gestor de Tareas
        </h2>
        <p style={{ margin: '0 0 20px 0', color: '#6b7280', fontSize: '0.85rem', textAlign: 'center' }}>
          Sustentación de Proyecto
        </p>

        {/* Campo de texto */}
        <input
          type="text"
          placeholder="Escribe una tarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '0.95rem',
            outline: 'none',
            boxSizing: 'border-box',
            backgroundColor: '#f9fafb',
            color: '#111827',
            marginBottom: '20px'
          }}
        />

        {/* Lista de tareas activas */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                marginBottom: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />

                {editingId === todo.id ? (
                  <input
                    type="text"
                    defaultValue={todo.text}
                    autoFocus
                    onBlur={(e) => updateTodoText(todo.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') updateTodoText(todo.id, e.currentTarget.value);
                    }}
                    style={{ flex: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid #9ca3af', color: '#111827' }}
                  />
                ) : (
                  <span
                    onClick={() => setEditingId(todo.id)}
                    style={{
                      flex: 1,
                      cursor: 'pointer',
                      fontSize: '0.95rem',
                      color: todo.completed ? '#9ca3af' : '#1f2937',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        {/* Sección de Tareas Eliminadas */}
        {deletedTodos.length > 0 && (
          <section style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed #e5e7eb' }}>
            <h3 style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
               Papelera ({deletedTodos.length})
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {deletedTodos.map((todo) => (
                <li
                  key={todo.id}
                  style={{
                    padding: '8px 12px',
                    marginBottom: '6px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px',
                    color: '#9ca3af',
                    fontSize: '0.9rem',
                    textDecoration: 'line-through',
                  }}
                >
                  {todo.text}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}