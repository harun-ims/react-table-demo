import React from "react";
import UserTable from "./components/UserTable";
// import TaskTable from "./Table/TaskTable";

const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen max-w-7xl mx-auto pt-20">
      <UserTable />
      {/* <TaskTable /> */}
    </div>
  );
};

export default App;
