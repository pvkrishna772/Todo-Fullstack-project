import { useState } from "react";

export default function TodoItem({todo, onUpdate, onToggle, onDelete }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  

  return (
    <>
    
    <div>
    

      {editIndex ===todo.id ? (
        <>
          <input
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />

          <button
            onClick={() => {
              if (!editText.trim()) return;

              onUpdate(todo.id,editText);
              setEditIndex(null);
            }}
          >
            Save
          </button>

          <button onClick={() => setEditIndex(null)}>Cancel</button>
        </>
      ) : (
        <>
          <p>{todo.text}</p>

          <button
            onClick={() => {
              setEditIndex(todo.id);
              setEditText(todo.text);
            }}
          >
            Edit
          </button>

          <button
            onClick={() =>
             onDelete(todo.id)
            }
          >
            Delete
          </button>
          <button onClick = {()=>onToggle(todo.id)}>
              {todo.completed?"completed":"Active"}</button>

      
        </>
      )}
    </div>
    </>
  );
}
