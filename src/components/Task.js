import { useState } from "react"

export default function Task(props) {
    const [details,setDetails] = useState({value:"",time:""})
    const [list,setList] = useState([])

    const [add,setAdd] = useState(false)
    const [completed,setCompleted] = useState([])

    const handleTask = e => {
        const name = e.target.name
        const value = e.target.value
        setDetails(prev=>{
            return {
                ...prev,
                [name]:[value]
            }
        })
    }

    const submitTask = e =>{
        e.preventDefault()

        list.push(details)
        setList([...list])

        setDetails({value:"",time:""})
    }

    const handleCompleted = (item) =>{
         if(completed.indexOf(item)<0){
            completed.push(item)
            setCompleted([...completed])

            let newlist = list.filter(ctr => ctr !== item)
            setList([...newlist])
         }
    }

   
  return (
    <div>
        <h1>{props.categoryName}</h1>

        <div>

            <h4 onClick={()=>setAdd(!add)} className="addTask">
                {`${!add? "Add +": "Close -"}`}
            </h4>

            <div>
            {
                add && (
                    <div className="TaskInput">
                        <form onSubmit={submitTask}>
                            <input autoFocus value={details.value} name="value" onChange={handleTask} placeholder="Title" className="taskName"/>
                            <input value={details.time} type="datetime-local" name="time" onChange={handleTask} className="taskDate"/>
                            <button className="taskButton" type="submit">Add</button>
                        </form>
                    </div>
                )
            }

            {
                list.map(item=>(
                    <div key={item.value}>
                       <p> 
                        <input type="radio" onClick={()=>handleCompleted(item)}/> {item.value} {item.time}
                       </p>
                    </div>
                ))
            }
            </div>

        </div>

        <details className="completed">
            <summary>Completed</summary>
            {
                completed.length && completed.map(item=>(
                    <div key={item.value}>
                       <p style={{textDecoration:"line-through"}}> 
                        {item.value[0]} {item.time[0]}
                       </p>
                    </div>
                ))
            }
        </details>
    </div>
  )
}
