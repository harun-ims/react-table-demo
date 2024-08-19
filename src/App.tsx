import React from "react";
import UserTable from "./components/UserTable";

const App: React.FC = () => {
  return (
    <div className="w-screen min-h-screen max-w-7xl mx-auto pt-20">
      <UserTable />
    </div>
  );
};

export default App;
