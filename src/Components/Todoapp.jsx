import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Todoapp() {
    const [task, setTask] = useState("");
    const [tasks,setTasks]=useState([]);

    useEffect(()=>{
        if(localStorage.getItem("plans")){
            const storedList = JSON.parse(localStorage.getItem("plans"));
            setTasks(storedList);
        }
    },[])

    const addTask = (e) => {
        if (task) {
          const newTask = { id: Math.floor(Math.random()*1000), title: task };
          setTasks([...tasks, newTask]);
          localStorage.setItem("plans", JSON.stringify([...tasks, newTask]));
          setTask("");
        }
      };

    const handleDelete = (task)=>{
        const deleted = tasks.filter((t)=>t.id !== task.id);
        setTasks(deleted);
        localStorage.setItem("plans", JSON.stringify(deleted))
    }

    return (
    <div>
        <div className="container">
            <div className="row mt-5">
                <div className="col-5 mt-5 m-auto arkaplan">
                    <h3 className="baslik text-center text-white mt-3">TO DO APP</h3>
                    <InputGroup style={{width:'29rem'}} className="m-auto mt-3">
                        <Form.Control
                         placeholder="Planınızı yazınız" 
                         aria-label="Recipient's username" 
                         aria-describedby="basic-addon2"
                         value={task}
                         onChange={(e) => setTask(e.target.value)}
                         />
                        <Button style={{width:'8rem'}} 
                        className="btnekle" 
                        id="button-addon2"
                        onClick={()=> addTask()}>ekle</Button>
                    </InputGroup>
                
                    {tasks.map((task) => (
                        <div className='row justify-content-center' key={task.id}>
                            <div className="col-12">
                                <span onDoubleClick ={()=> handleDelete(task)} className = "form-control btn mt-2" style={{fontWeight: "bold"}}>{task.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Todoapp