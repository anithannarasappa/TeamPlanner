
import { useState } from "react";

function LeaveRequests({ employees, leaves, setLeaves }) {
  const [form, setForm] = useState({
    employeeId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  function submitLeave(e) {
    e.preventDefault();

    if (form.startDate > form.endDate) {
      alert("End date cannot be before start date.");
      return;
    }

    const employee = employees.find(
      emp => emp.id === Number(form.employeeId)
    );

    if (!employee) {
      alert("Please select an employee.");
      return;
    }

    const newLeave = {
      ...form,
      id: Date.now(),
      employeeName: employee.name,
      status: "Pending"
    };

    setLeaves([...leaves, newLeave]);

    setForm({
      employeeId: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: ""
    });

    alert("Leave application submitted!");
  }

  function updateStatus(id, status) {
    setLeaves(leaves.map(leave =>
      leave.id === id ? {...leave, status} : leave
    ));
  }

  return (
    <div className="page-content">
      <div className="page-heading">
        <h2>Leave Management</h2>
        <p>Manage employee leave applications and approvals.</p>
      </div>

      <div className="content-card">
        <h3>Apply for Employee Leave</h3>

        <form className="form-grid" onSubmit={submitLeave}>
          <select
            value={form.employeeId}
            onChange={e => setForm({...form, employeeId:e.target.value})}
            required
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>

          <select
            value={form.leaveType}
            onChange={e => setForm({...form, leaveType:e.target.value})}
            required
          >
            <option value="">Select Leave Type</option>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Annual Leave</option>
            <option>Emergency Leave</option>
          </select>

          <label>
            Start Date
            <input type="date" required value={form.startDate}
              onChange={e => setForm({...form, startDate:e.target.value})}/>
          </label>

          <label>
            End Date
            <input type="date" required value={form.endDate}
              onChange={e => setForm({...form, endDate:e.target.value})}/>
          </label>

          <textarea
            placeholder="Reason for leave"
            value={form.reason}
            onChange={e => setForm({...form, reason:e.target.value})}
            required
          />

          <button type="submit">Submit Leave Request</button>
        </form>
      </div>

      <div className="content-card">
        <h3>All Leave Applications</h3>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map(leave => (
                <tr key={leave.id}>
                  <td>{leave.employeeName}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>
                    <span className={`status ${leave.status}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    {leave.status === "Pending" ? (
                      <>
                        <button className="approve-button"
                          onClick={() => updateStatus(leave.id, "Approved")}>
                          Approve
                        </button>
                        <button className="delete-button"
                          onClick={() => updateStatus(leave.id, "Rejected")}>
                          Reject
                        </button>
                      </>
                    ) : "Processed"}
                  </td>
                </tr>
              ))}

              {leaves.length === 0 && (
                <tr><td colSpan="6">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequests;
