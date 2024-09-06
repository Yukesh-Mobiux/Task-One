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
        <h1 className="text-2xl text-cent mb-5">{props.categoryName}</h1>

        <div>

            <h4 onClick={()=>setAdd(!add)} className="text-indigo-600 cursor-pointer mt-2 mb-5">
                {`${!add? "Add +": "Close -"}`}
            </h4>

            <div>
            {
                add && (
                    <div className="border-2 border-gray rounded p-2 mt-3 mb-3">
                        <form onSubmit={submitTask}>
                            <input className="border-none m-1 p-1 w-3/4 bg-gray-100 focus:outline-none" autoFocus value={details.value} name="value" onChange={handleTask} placeholder="Title" />
                            <input value={details.time} type="datetime-local" name="time" onChange={handleTask} className="ml-1 border-2 border-gray-100"/>
                            <button className="ml-2 bg-blue-500 p-1 rounded text-white transition-all ease-in-out delay-150 hover:bg-blue-700" type="submit">Add</button>
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

        <details className="cursor-pointer mt-6">
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
