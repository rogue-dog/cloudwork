import { useState } from "react";
import { controller } from "../../ControllerClass";
import { WorkloadItemInterface } from "../interfaces/WorkloadItemInterface";
import {v4 as uuid4} from "uuid";
import "./WorkloadItemForm.css";

//This is the form for adding a new workload.
// This component will call controller class' addWorkload function where a workload would be added to the main data centre

export const WorkloadItemForm = () => {
    let [complexity, setComplexity] = useState<number>(10);
    let [name,setName] =useState<string>("");

    const createNewWorkload = () => {
      var a: WorkloadItemInterface = {
        name: name,
        id: uuid4(),
        complexity: complexity,
        isCompleted: false,
        status: "Pending",
      };
      if(name==""){alert("Name cannot be empty")}
        
        else{
          setName("");
          controller.addWorkloadItem(a);}
    }


    return (
      <div className="form-container">
        <h3 className="heading-container">Create a new workload</h3>
        <input
          className="name-input-box"
          value={name}
          placeholder="Write the name of the new workload"
          onChange={(e) => setName(e.target.value)}
        />
        <p className="complexity-container">Complexity-: {complexity}</p>

        <input
          value={complexity}
          placeholder="Complexity"
          type="range"
          max="60"
          min="10"
          onChange={(e) => setComplexity(Number(e.target.value))}
        />

        <button className="create-button" onClick={(e) => createNewWorkload()}>
          Create
        </button>
      </div>
    );
}