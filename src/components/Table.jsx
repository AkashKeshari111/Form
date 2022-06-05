import React, { useEffect} from 'react'

import styles from './styles.module.css'
function Table({send,setSend}) {
  const handleClick=(value)=>{
    fetch(`http://localhost:3003/forms/${value}`,{
        method:"DELETE",
      
    })

      fetch(`http://localhost:3003/forms`)
    .then((res)=>res.json())
    .then((data)=>(
        
        setSend(data)
   
      ));
  }
 
  return (
    <div>
        <table  >
            <thead  >
                <tr >
                    <th className={styles.th1}>Name</th>
                    <th className={styles.th2}>Age</th>
                    <th className={styles.th3}>Address</th>
                    <th className={styles.th4}>Department</th>
                    <th className={styles.th5}>Salary</th>
                    <th className={styles.th6}>Marital Status</th>
                    <th className={styles.th7}>Image</th>
                    <th className={styles.th8}>Remove</th>

                </tr>
            </thead>
               
            <tbody>
            {send.map((el)=>
                <tr key={el.id}>
                  
                  <td>{el.username}</td>
                  <td>{el.age}</td>
                  <td>{el.address}</td>
                  <td>{el.department}</td>
                  <td>{el.salary}</td>
                  <td>{el.marital_status?"Married":"Unmarried"}</td>
                  <td>{`Image`}</td>
                   <td><button onClick={()=>handleClick(el.id)}>Del</button> </td> 
                 

                 </tr>
     ) }   
            </tbody>
        </table>
    </div>
  )


 
}





export default Table