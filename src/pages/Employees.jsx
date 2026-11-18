import React, { useState } from "react";

function Employees({ employees = [], setEmployees }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    department: "Development",
    role: "",
    availability: "Available"
  };

  const [form, setForm] = useState(emptyForm);

  const departments = [
    "All",
    ...new Set(employees.map((e) => e.department).filter(Boolean))
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      (employee.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (employee.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (employee.role || "").toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  const available = employees.filter(
    (e) => e.availability === "Available"
  ).length;

  const onLeave = employees.filter(
    (e) => e.availability === "On Leave"
  ).length;

  const openAddForm = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (employee) => {
    setEditId(employee.id);
    setForm({
      name: employee.name || "",
      email: employee.email || "",
      department: employee.department || "Development",
      role: employee.role || "",
      availability: employee.availability || "Available"
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.role.trim()) {
      alert("Please complete all required fields.");
      return;
    }

    if (editId !== null) {
      setEmployees((old) =>
        old.map((employee) =>
          employee.id === editId
            ? { ...employee, ...form }
            : employee
        )
      );
      alert("Employee updated successfully!");
    } else {
      const newEmployee = {
        id: Date.now(),
        ...form
      };

      setEmployees((old) => [...old, newEmployee]);
      alert("New employee added successfully!");
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditId(null);
  };

  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmDelete) {
      setEmployees((old) =>
        old.filter((employee) => employee.id !== id)
      );
    }
  };

  const avatarColors = [
    "employee-purple",
    "employee-blue",
    "employee-pink",
    "employee-orange",
    "employee-green"
  ];

  return (
    <div className="employee-page">

      {/* Welcome Banner */}
      <section className="employee-welcome">
        <div>
          <span>✦ PEOPLE MANAGEMENT</span>
          <h1>Meet Your Team 👋</h1>
          <p>
            Manage your employees, organize departments
            and build a stronger workforce.
          </p>
        </div>
        <div className="employee-welcome-icon">👩‍💼</div>
      </section>

      {/* Heading */}
      <div className="employee-heading">
        <div>
          <span>YOUR ORGANIZATION</span>
          <h2>Employee Directory</h2>
          <p>All your team members in one place.</p>
        </div>

        <button
          className="employee-add-btn"
          onClick={openAddForm}
        >
          + Add Employee
        </button>
      </div>

      {/* Statistics */}
      <section className="employee-stats">

        <div className="employee-stat-card emp-total">
          <span>👥</span>
          <div>
            <p>Total Employees</p>
            <h2>{employees.length}</h2>
          </div>
        </div>

        <div className="employee-stat-card emp-available">
          <span>⚡</span>
          <div>
            <p>Available Staff</p>
            <h2>{available}</h2>
          </div>
        </div>

        <div className="employee-stat-card emp-leave">
          <span>🏖️</span>
          <div>
            <p>On Leave</p>
            <h2>{onLeave}</h2>
          </div>
        </div>

        <div className="employee-stat-card emp-department">
          <span>🏢</span>
          <div>
            <p>Departments</p>
            <h2>{departments.length - 1}</h2>
          </div>
        </div>

      </section>

      {/* Search and Filters */}
      <section className="employee-toolbar">

        <div className="employee-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Departments" : item}
            </option>
          ))}
        </select>

      </section>

      {/* Employee Cards */}
      <div className="employee-results-heading">
        <h3>Our Team Members</h3>
        <span>{filteredEmployees.length} employees found</span>
      </div>

      <section className="employee-grid">

        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, index) => (

            <article className="employee-card" key={employee.id}>

              <div className={`employee-card-top ${avatarColors[index % avatarColors.length]}`}>
                <span className="employee-card-symbol">✦ TEAM MEMBER</span>

                <span className={
                  employee.availability === "Available"
                    ? "employee-status available"
                    : "employee-status away"
                }>
                  {employee.availability || "Unknown"}
                </span>

                <div className="employee-avatar">
                  {(employee.name || "E").charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="employee-card-body">

                <h3>{employee.name}</h3>
                <p className="employee-role">{employee.role}</p>

                <div className="employee-detail">
                  <span>✉</span>
                  {employee.email}
                </div>

                <div className="employee-detail">
                  <span>🏢</span>
                  {employee.department}
                </div>

                <div className="employee-card-actions">

                  <button
                    className="employee-edit"
                    onClick={() => openEditForm(employee)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="employee-delete"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </article>

          ))
        ) : (
          <div className="employee-empty">
            <span>🔎</span>
            <h3>No Employees Found</h3>
            <p>Try another search or add a new employee.</p>
            <button onClick={openAddForm}>
              + Add Employee
            </button>
          </div>
        )}

      </section>

      {/* Add / Edit Modal */}
      {showForm && (

        <div
          className="employee-modal-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="employee-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="employee-close"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

            <div className="employee-modal-heading">
              <span>👤</span>
              <h2>
                {editId !== null ? "Edit Employee" : "Add New Employee"}
              </h2>
              <p>Enter your employee information below.</p>
            </div>

            <form onSubmit={handleSubmit}>

              <label>Employee Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <label>Department</label>
              <select
                value={form.department}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              >
                <option>Development</option>
                <option>Human Resources</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Sales</option>
                <option>Operations</option>
              </select>

              <label>Job Role</label>
              <input
                type="text"
                placeholder="Enter job role"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
                required
              />

              <label>Availability</label>
              <select
                value={form.availability}
                onChange={(e) =>
                  setForm({ ...form, availability: e.target.value })
                }
              >
                <option>Available</option>
                <option>On Leave</option>
              </select>

              <div className="employee-form-actions">
                <button type="submit">
                  {editId !== null ? "Save Changes" : "Add Employee"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>

      )}

    </div>
  );
}

export default Employees;