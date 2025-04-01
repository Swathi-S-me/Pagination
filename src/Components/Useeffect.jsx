import React, { useEffect, useState } from 'react'
import './Useeffect.css'

export default function Useeffect(){
    const [data,setdata] = useState([]);
    const [load,setload] = useState(true);

    const [currentpage,setcurrentpage] = useState(1);
    const [postperpage,setpostperpage] = useState(10);


    useEffect(()=>{
        async function fetchdata(){
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts");
                const result = await res.json();
                setdata(result);
                setload(false);
                 
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    },[])

    const indexoflast = postperpage * currentpage ;
    const indexoffirst = indexoflast - postperpage;     

    const currentpagepost = data.slice(indexoffirst, indexoflast)

    const totalpages = Math.ceil(data.length/postperpage);

    const paginate=(page)=>setcurrentpage(page);

    if(load) return <h2>Loading data....Please wait</h2>
    return(
        <>
        
        <h2>Pagination </h2>
        <ul>
            {currentpagepost.map((item)=><li>{item.id} - {item.title} </li>)}
        </ul>

        <div className="pages">  </div>
        <button onClick={()=>paginate(1)}>first</button>
        <button disabled = {currentpage==1} onClick={()=>paginate(currentpage-1)}>previous</button>

         {new Array(totalpages).fill(0).map((_,index)=>{
            return <button className={currentpage === index+1 ? "active" : ""}    onClick={()=>paginate(index+1)}key={index+1}>{index+1}</button>
         })}

        <button  disabled = {currentpage==totalpages} onClick={()=>paginate(currentpage+1)}>next</button>
        <button  onClick={()=>paginate(totalpages)}>last</button>
        
        </>
    )
}