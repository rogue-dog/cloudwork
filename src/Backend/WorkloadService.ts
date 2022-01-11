import { WorkloadItemInterface } from "../components/interfaces/WorkloadItemInterface";
import {v4 as uuid4} from "uuid";

//A pretend backend for the app.


var a: WorkloadItemInterface = {
  id: uuid4(),
  name: "First Process",
  complexity: 10,
  isCompleted: false,
  status: "Pending",
};
var b: WorkloadItemInterface = {
  id: uuid4(),
  name: "Second Process",
  complexity: 50,
  isCompleted: false,
  status: "Pending",
};
var c: WorkloadItemInterface = {
  id: uuid4(),
  name: "Third Process",
  complexity: 10,
  isCompleted: false,
  status: "Pending",
};

const backend_data :any = {
    [c['id']]:c,
    [b['id']]:b,
    [a['id']]:a
}
const ReturnData=() => {
    
    return Promise.resolve(backend_data)
}

export default ReturnData;