import { createContext } from "react";

const AppContext = createContext({});

const reducer = (state: any, action: { [key: string]: any }) => {
  switch (action["type"]) {
    case "Create":
      var new_id: string = action.payload.id;
      var new_workload: any = action.payload.new_workload;
      return { ...state,new_id:new_workload };
  }
};
