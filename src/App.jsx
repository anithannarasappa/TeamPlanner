
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import LeaveRequests from "./pages/LeaveRequests";
import Availability from "./pages/Availability";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

const initialEmployees = [
  {
    id: 1001,
    name: "Anitha",
    email: "anitha@example.com",
    department: "Development",
    role: "Software Developer",
    availability: "Available"
  },
  {
    id: 1002,
    name: "Priya",
    email: "priya@example.com",
    department: "Human Resources",
    role: "HR Executive",
    availability: "Available"
  },
  {
    id: 1003,
    name: "Rahul",
    email: "rahul@example.com",
    department: "Design",
    role: "UI Designer",
    availability: "Available"
  }
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [employees, setEmployees] = useState(() => {
    return JSON.parse(localStorage.getItem("teamEmployees")) || initialEmployees;
  });

  const [leaves, setLeaves] = useState(() => {
    return JSON.parse(localStorage.getItem("teamLeaves")) || [];
  });

  const [authPage, setAuthPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    localStorage.setItem("teamEmployees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("teamLeaves", JSON.stringify(leaves));
  }, [leaves]);

  const titles = {
    dashboard: "Dashboard Overview",
    employees: "Employee Management",
    leaves: "Leave Management",
    availability: "Workforce Availability"
  };

  if (!loggedIn) {
    return authPage === "login" ? (
      <Login
        onLogin={() => setLoggedIn(true)}
        onRegister={() => setAuthPage("register")}
      />
    ) : (
      <Register
        onRegister={() => {
          alert("Registration page demo completed.");
          setAuthPage("login");
        }}
        onLogin={() => setAuthPage("login")}
      />
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <Navbar />

        <Header title={titles[activePage]} />

        {activePage === "dashboard" && (
          <Dashboard
            employees={employees}
            leaves={leaves}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "employees" && (
          <Employees
            employees={employees}
            setEmployees={setEmployees}
          />
        )}

        {activePage === "leaves" && (
          <LeaveRequests
            employees={employees}
            leaves={leaves}
            setLeaves={setLeaves}
          />
        )}

        {activePage === "availability" && (
          <Availability
            employees={employees}
            leaves={leaves}
          />
        )}

        <Footer />
      </main>
    </div>
  );
}

export default App;
