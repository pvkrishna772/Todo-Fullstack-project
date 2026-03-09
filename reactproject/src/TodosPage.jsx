import {useEffect} from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import * as todoServices from "./api/todoServices";
import {useState} from "react";
import LogoutButton from "./Pages/Logout"


export default function TodosPage(){

    const [todos, setTodos] = useState([]);
      const [filter,setFilter] = useState("All");

    useEffect(()=>{
        const fetchTodos = async() =>{
            try{
                const res = await todoServices.getTodos();
                setTodos(res.data);
            }catch(err){
                console.log(err);

            }
        };

        fetchTodos();
    },[]);


    const handleCreate = async(text) => {
  
  try{
     const res = await todoServices.createTodo({text});
    setTodos(prev => [...prev, res.data]);
    
    
   
  }catch(err){
    console.log(err);
  }
  
   
};

const handleDelete = async(id) => {
    try{
        await todoServices.deleteTodo(id);
        setTodos(prev=>prev.filter(t=>t.id !== id));
    }catch(err){
        console.log(err);
    }
};

const handleUpdate = async(id,editText) => {
    try{
        const res = await todoServices.updateTodo(id,{text:editText});
        setTodos(prev=>prev.map(t=>(t.id == id?res.data:t)));
    }catch(err){
        console.log(err);
    }
};

const handleToggle = async(id) =>{
    try{
        const res = await todoServices.partialUpdate(id);

        setTodos(prev=>prev.map(t=>(t.id===id?res.data:t)))
    }catch(err){
        console.log(err);
    }
}



    return(

        <>
        <h2>My Tasks</h2>
        <LogoutButton />
        < TodoInput onCreate = {handleCreate} />
        < TodoFilter filter ={filter} setFilter = {setFilter}/>
        < TodoList todos = {todos}  filter = {filter} onDelete ={handleDelete} onToggle ={handleToggle} onUpdate ={handleUpdate} />
        
        </>
    );

}