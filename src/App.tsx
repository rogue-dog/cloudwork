import React from "react";
import { useEffect, useState } from "react";
import { WorkloadItemInterface } from "./components/interfaces/WorkloadItemInterface";
import { controller } from "./ControllerClass";
import"./App.css";
import { WorkloadItem } from "./components/WorkloadItem/WorkloadItem";
import { Observer } from "rxjs";
import { WorkloadItemForm } from "./components/WorkloadItemForm/WorkloadItemForm";


const App = React.memo( () =>{
  var [processes, setProcesses] = useState<WorkloadItemInterface[]>();

  useEffect(() => {
    controller.subscribeToController({
      next : (v : WorkloadItemInterface[])=>{

        setProcesses(v);
      }
    } as Observer<unknown>);
    
    controller.sendWorkloadData();
   
  }, []);

  return (
    <div className="main-container">
      <h1 className="cloudwork-heading">
        <b>CloudWork</b>
      </h1>
      <hr className="horizontal-line" />
      <h2 className="workload-heading">Workloads</h2>
      <div className="workload-container">
        <div className="workloadItem-container">
          {processes ? (
            processes.map((el: WorkloadItemInterface) => {
              return <WorkloadItem props={el} key={el.id} />;
            })
          ) : (
            <p>Loading</p>
          )}
        </div>
        <WorkloadItemForm />
      </div>
    </div>
  );
})

export default App;
