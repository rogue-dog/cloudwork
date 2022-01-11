import { Observer, Subject, Subscription } from "rxjs";
import ReturnData from "./Backend/WorkloadService";
import { WorkloadItemInterface } from "./components/interfaces/WorkloadItemInterface";

// The Controller class will be the one handling state changes behind the scene. It would act as an intermediary between 
// Main App and individual workloads.

// Each workload will be observed by its observers and any change that might occur in workloads would be recorded
// and merged into the main data.

class Controller {
  subject: Subject<unknown>;
  private workload_map : { [id: string]: WorkloadItemInterface }; //this is the mapping of all the workloads user has ever had
  private observers :Subscription[] //These will observe individual workload and report the changes so that workload_map can be updated

  constructor() {
    this.subject = new Subject();
    this.workload_map
     = {};
    this.observers = [];
    this.fetchData();
  }

  private async fetchData() {
    var res = await ReturnData().then((r) => {
      return r;
    });
    this.workload_map
     = res;
  }

  public sendWorkloadData() {
    var serializedData: WorkloadItemInterface[] = []; 
    var keys = Object.keys(this.workload_map
      );
    for (var key of keys) {
      serializedData.push(this.workload_map[key]);
    }
  
    this.subject.next(serializedData);
  }

  public subscribeToController(observer: Observer<unknown>) {
    return this.subject.subscribe(observer);
  }

  public observeWorkloadItem(subject :Subject<unknown>){
    this.observers.push(
      subject.subscribe({
        next: (event_obj: { [key: string]: any }) => {
          this.handleObserverNotifications(event_obj);
        },
      } as Observer<unknown>)
    );

  }
  private handleObserverNotifications(event_obj : {[key:string]:any}){
    this.workload_map[event_obj['id']].status = event_obj['event'];
    this.workload_map[event_obj["id"]].isCompleted = event_obj.isCompleted;
    
  }

  public addWorkloadItem(workloadItem : WorkloadItemInterface){
    this.workload_map = {
      [workloadItem["id"]]: workloadItem,
      ...this.workload_map
    };
    this.sendWorkloadData();

  }


}

export const controller = new Controller();
