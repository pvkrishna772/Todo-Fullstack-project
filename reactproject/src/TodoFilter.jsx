export default function TodoFilter( {filter, setFilter}){
    

    return(
        <><div>
      <select value ={filter}  onChange = {(e)=>setFilter(e.target.value)} >
        <option value = "All">All</option> 
        <option value = "Completed" >Completed</option> 
        <option value = "Active">Active</option> 
      </select>
    </div></>
    )

}