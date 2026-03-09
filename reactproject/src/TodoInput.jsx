import { useState } from "react";


export default function TodoInput({ onCreate }) {


const [text, setText] = useState("");



  

  return (
    <>

      <input
      
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" &&onCreate(text)}
        placeholder="Add todo"
      />
      <button className = "add-btn"onClick={()=>onCreate(text) }>Add</button>
    </>
  );
}
 







