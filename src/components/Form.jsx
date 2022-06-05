import React, { useEffect, useRef, useState } from 'react'
import Table from './Table'
// import axios from "axios"

function Form() {
const [send,setSend]=useState([])
const [form,setForm]=useState({})
     // we can take here a initial value and use this value inside the form like department example.
const ref=useRef()
const passref=useRef()

const onChange=(e)=>{
    const {name,value,type,checked,files}=e.target

    if(type==="checkbox"){
        setForm({
            ...form,
            [name]:checked
        })
    }
    else if(type==="file"){
        setForm({
            ...form,
            [name]:files
        })
    }
    else{
        setForm({
            ...form,
            [name]:value
        })
    }
   
  
}

let onSubmitform=(e)=>{
    e.preventDefault();

    if(!form.username){
        ref.current.focus()
    }
    else if(!form.address){
        passref.current.focus()
    }

    fetch(`http://localhost:3003/forms`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({ username:form.username,
        age:form.age,
        address:form.address,
        department:form.department,
        salary:form.salary,
        marital_status:form.marital_status,
        resume:form.resume})
    }).then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        setSend([...send,data])
        setForm("")
    })
}




useEffect(()=>{
    
    fetch(`http://localhost:3003/forms`)
  .then((res)=>res.json())
  .then((data)=>(
      
      setSend(data)
 
    ));
  },[])


  return (
    <div>
    <div>
        <form onSubmit={onSubmitform}>
          
            <div>
            <label>Name</label>
            <input type="text" name="username" value={form.username}  ref={ref} placeholder='Enter Name...'  onChange={onChange}/>
            </div>

           <div>
           <label>Age</label>
            <input type="number" name="age" value={form.age} placeholder='Enter Age...'  onChange={onChange}/>
           </div>

           <div>
           <label>Address</label>
            <input type="text" name="address" value={form.address} ref={passref} placeholder='Enter Address...'  onChange={onChange}/>
            </div> 
            
           
            <div>
                <label >Department : </label>
                <select name="department" value={form.department} onChange={onChange}>
                    <option value="" >Select</option>
                    <option value="Administrative">Administrative</option>
                    <option value="operations">Operations</option>
                </select>
            </div>
           
           <div>
           <label>Salary</label>
            <input type="number" name="salary" value={form.salary}  placeholder='Enter Salary...'  onChange={onChange}/>
           </div>
           
           <div>
             <label>marital Status</label>
            <input type="checkbox" checked={form.marital_status} name="marital_status" value={form.marital_status} onChange={onChange}/>
           </div>
         
            
           <div>
             <label>Image</label>
            <input type="file" accept='image/png, image/jpeg , image/jpg , aplication/pdf' name="resume" files={form.resume} onChange={onChange}/>
           </div>

           <button type="submit" >Submit</button>
           
          
        </form>
    </div>

         <div>

         <Table setSend={setSend} send={send}/> 
       
         </div>
    </div>

  )
}

export default Form