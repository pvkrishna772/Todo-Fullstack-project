import TodoItem from "./TodoItem";



export default function TodoList({ todos, filter,onDelete, onToggle, onUpdate })
 {

  const filtered = todos.filter(t=>{
    if(filter==="Completed") return t.completed;
    if(filter === "Active") return !t.completed;
    return true;
    });
  return (
    <>

      {filtered.length===0?<p>Empty</p>:filtered.map(t  => (
        <TodoItem
          key={t.id}
          todo={t}
          onDelete = {onDelete}
          onToggle = {onToggle}
          onUpdate = {onUpdate}
          
          
        />

       
      ))}
      
    </>
  );
}
