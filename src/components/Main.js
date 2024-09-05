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
    <div className="main">

        <div className="category">

            {
                category.map(list => (
                    <div className="categoryItems" key={list.props.categoryName}>
                        <input type="checkbox" onChange={(e)=>handleCheckbox(e,list)}/>
                        <div>{list.props.categoryName}</div>
                    </div>
                ))
            }

            <div className="newCatergory">
                    <span onClick={()=>setShow(!show)}> + Create new list</span>
                    {
                        show &&
                        <form onSubmit={(e)=>addNewCategory(e)}>
                            <input autoFocus value={categoryName} onChange={(e)=>handleCategoryName(e)}/> 
                        </form>
                    }
              
            </div>
        </div>

        <div className="list">
            {
                taskList.map(item=>(
                    <div className="listItems" key={item.props.categoryName}>{item}</div>
                ))
            }
        </div>
    </div>
  )
}

export default Main