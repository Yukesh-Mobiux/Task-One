"use client";
import {useState} from "react"
import Task from "../components/Task"  

function Main() {
  const [category,setCategory] = useState([])
  const [taskList,setTaskList] = useState([])
  const [categoryName,setCategoryName] = useState()
  const [show,setShow] = useState()

  const handleCheckbox = (e,list) => {
     let previous = taskList
     
     if(e.target.checked) {
        previous.push(list)
        setTaskList([...previous])
     }else{
        previous = previous.filter(items => items !== list)
        setTaskList([...previous])
     }
     
  }

  const handleCategoryName = (e) => {
    setCategoryName(e.target.value)
  }

  const addNewCategory = (e) => {
    e.preventDefault()
    if(categoryName){
        category.push(<Task categoryName={categoryName}/>)
        setCategory([...category])
        setCategoryName("")
    }
  }

  return (
    <div className="border-2 border-black-200 m-1 rounded flex h-full" >

        <div className="w-1/6 m-1">

            {
                category.map(list => (
                    <div className="flex text-1xl rounded border-2 border-gray-100 m-2 p-2" key={list.props.categoryName}>
                        <input type="checkbox" onChange={(e)=>handleCheckbox(e,list)}/>
                        <div>{list.props.categoryName}</div>
                    </div>
                ))
            }

            <div>
                    <span className="cursor-pointer m-2 text-center" onClick={()=>setShow(!show)}> + Create new list</span>
                    {
                        show &&
                        <form onSubmit={(e)=>addNewCategory(e)}>
                            <input className="p-2 border-2 border-gray-100 m-2 focus:outline-none focus:shadow-2xl focus:ring focus:border-none rounded " autoFocus value={categoryName} onChange={(e)=>handleCategoryName(e)}/> 
                        </form>
                    }
              
            </div>

        </div>

        <div className="w-screen flex flex-wrap border-2 border-gray-100">
            {
                taskList.map(item=>(
                    <div className="w-2/5 mb-8 border-2 cursor-pointer border-gray-100 mx-auto mt-2 rounded-2xl p-10 transition-all ease-in-out delay-200 hover:shadow-2xl" key={item.props.categoryName}>{item}</div>
                ))
            }

        </div>
    </div>
  )
}

export default Main