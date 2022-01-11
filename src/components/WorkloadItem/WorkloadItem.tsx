import { useEffect, useState } from "react";
import "./WorkloadItem.css"
import "../../ControllerClass";
import { WorkloadItemInterface } from "../interfaces/WorkloadItemInterface";
import { Subject } from "rxjs";
import { controller } from "../../ControllerClass";
import TimeAgo from "react-timeago";
import moment from "moment";
import React from "react";

export const WorkloadItem: React.FC<{ props: WorkloadItemInterface }> =
  React.memo(({ props }) => {
    let [isCompleted, setIfCompleted] = useState<boolean>(false); //this will be used solely for display purposes.
    let [status, setStatus] = useState<string>(props.status); //this will be used solely for display purposes.
    var process: NodeJS.Timeout;
    let sub: Subject<any>;

    useEffect(() => {
      sub = new Subject();
      controller.observeWorkloadItem(sub);

      //This will be how a workload would be mimiced.
      process = setTimeout(() => {
        setIfCompleted(true);
        setStatus("Completed");
        sub.next({
          event: "Completed",
          isCompleted: true,
          id: props.id,
        });
      }, props.complexity * 1000);
    }, []);

    //To be called when a wokload has been cancelled by the user.
    const CancelProcess = () => {
      setIfCompleted(true);

      clearTimeout(process);
      setStatus("Cancelled");
      sub.next({
        event: "Cancelled",
        isCompleted: false,
        id: props.id,
      });
    };

    return (
      <div className="item-container">
        <div className="workload-name-container">
          <h3>{props.name} </h3>
          <p> Complexity: {props.complexity}</p>
        </div>
        <div className="workload-status-container">
          {isCompleted ? (
            <p className="status-container">{status}</p>
          ) : (
            <div className="pending-status-container">
              <TimeAgo
                className="pending-time-container"
                date={moment().add(props.complexity, "seconds").toDate()}
              />
              <button
                className="cancel-button"
                onClick={(e) => CancelProcess()}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    );
  });
