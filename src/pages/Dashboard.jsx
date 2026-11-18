import React from "react";

function Dashboard({ employees = [], leaves = [], setActivePage }) {
  const totalEmployees = employees.length;

  const availableEmployees = employees.filter(
    (e) => e.availability === "Available"
  ).length;

  const onLeave = employees.filter(
    (e) => e.availability === "On Leave"
  ).length;

  const pendingLeaves = leaves.filter(
    (l) => (l.status || "Pending").toLowerCase() === "pending"
  ).length;

  const recentLeaves = [...leaves].slice(-5).reverse();

  const departments = [...new Set(
    employees.map((e) => e.department || "Other")
  )];

  const colors = ["#7657e8", "#269de0", "#19b98a", "#f39a42", "#e66a9b"];

  const getEmployeeName = (leave) => {
    return leave.employeeName ||
      leave.name ||
      leave.employee ||
      "Employee";
  };

  const getLeaveDate = (leave) => {
    return leave.startDate ||
      leave.fromDate ||
      leave.date ||
      "Not specified";
  };

  const getStatus = (leave) => leave.status || "Pending";

  return (
    <div className="tp-dashboard">

      {/* Welcome Banner */}
      <section className="tp-welcome">
        <div>
          <span className="tp-welcome-label">
            ✦ WORKFORCE MANAGEMENT
          </span>
          <h1>Welcome to TeamPlanner!</h1>
          <p>
            Manage your people, monitor availability and
            keep your team moving forward.
          </p>
          <button onClick={() => setActivePage("employees")}>
            Explore Employees →
          </button>
        </div>
        <div className="tp-welcome-art">👩‍💻</div>
        <div className="tp-welcome-circle"></div>
      </section>

      {/* Page Heading */}
      <div className="tp-section-heading">
        <div>
          <span>YOUR WORKSPACE</span>
          <h2>Dashboard Overview</h2>
          <p>Here is what's happening with your team today.</p>
        </div>
        <div className="tp-live">
          <span></span> Dashboard Active
        </div>
      </div>

      {/* Statistic Cards */}
      <section className="tp-stats">

        <div className="tp-stat tp-stat-purple">
          <div className="tp-stat-top">
            <span>Total Employees</span>
            <div className="tp-icon">👥</div>
          </div>
          <h2>{totalEmployees}</h2>
          <p>People in your organization</p>
          <div className="tp-stat-bottom">✦ Workforce overview</div>
        </div>

        <div className="tp-stat tp-stat-blue">
          <div className="tp-stat-top">
            <span>Available Staff</span>
            <div className="tp-icon">⚡</div>
          </div>
          <h2>{availableEmployees}</h2>
          <p>Ready to work</p>
          <div className="tp-stat-bottom">✦ Available workforce</div>
        </div>

        <div className="tp-stat tp-stat-orange">
          <div className="tp-stat-top">
            <span>On Leave</span>
            <div className="tp-icon">🏖️</div>
          </div>
          <h2>{onLeave}</h2>
          <p>Employees currently away</p>
          <div className="tp-stat-bottom">✦ Leave overview</div>
        </div>

        <div className="tp-stat tp-stat-green">
          <div className="tp-stat-top">
            <span>Pending Requests</span>
            <div className="tp-icon">📩</div>
          </div>
          <h2>{pendingLeaves}</h2>
          <p>Requests awaiting approval</p>
          <div className="tp-stat-bottom">✦ Needs attention</div>
        </div>

      </section>

      {/* Main Dashboard Columns */}
      <section className="tp-main-grid">

        {/* Workforce Analytics */}
        <div className="tp-panel">
          <div className="tp-panel-heading">
            <div>
              <span>TEAM INSIGHTS</span>
              <h3>Department Overview</h3>
            </div>
            <div className="tp-panel-icon">📊</div>
          </div>

          {departments.length > 0 ? (
            <div className="tp-departments">
              {departments.map((department, index) => {
                const count = employees.filter(
                  (e) => (e.department || "Other") === department
                ).length;

                const percentage = totalEmployees
                  ? (count / totalEmployees) * 100
                  : 0;

                return (
                  <div className="tp-department" key={department}>
                    <div className="tp-dept-info">
                      <span>{department}</span>
                      <strong>{count} employees</strong>
                    </div>
                    <div className="tp-progress">
                      <div
                        style={{
                          width: `${percentage}%`,
                          background: colors[index % colors.length]
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="tp-empty">
              Add employees to see department analytics.
            </p>
          )}

          <button
            className="tp-text-button"
            onClick={() => setActivePage("employees")}
          >
            View All Employees →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="tp-panel tp-actions-panel">
          <div className="tp-panel-heading">
            <div>
              <span>QUICK ACCESS</span>
              <h3>Manage Your Team</h3>
            </div>
            <div className="tp-panel-icon">🚀</div>
          </div>

          <button
            className="tp-action tp-action-purple"
            onClick={() => setActivePage("employees")}
          >
            <span>👥</span>
            <div>
              <strong>Employees</strong>
              <small>Manage team members</small>
            </div>
            <b>→</b>
          </button>

          <button
            className="tp-action tp-action-orange"
            onClick={() => setActivePage("leaves")}
          >
            <span>📅</span>
            <div>
              <strong>Leave Requests</strong>
              <small>Review applications</small>
            </div>
            <b>→</b>
          </button>

          <button
            className="tp-action tp-action-green"
            onClick={() => setActivePage("availability")}
          >
            <span>⚡</span>
            <div>
              <strong>Availability</strong>
              <small>Check staff availability</small>
            </div>
            <b>→</b>
          </button>
        </div>

      </section>

      {/* Employee Overview */}
      <section className="tp-panel tp-employee-panel">

        <div className="tp-panel-heading">
          <div>
            <span>YOUR PEOPLE</span>
            <h3>Employee Overview</h3>
          </div>
          <button
            className="tp-view-button"
            onClick={() => setActivePage("employees")}
          >
            View All →
          </button>
        </div>

        {employees.length > 0 ? (
          <div className="tp-table-wrap">
            <table className="tp-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {employees.slice(0, 5).map((employee, index) => (
                  <tr key={employee.id || index}>
                    <td>
                      <div className="tp-person">
                        <span className="tp-avatar">
                          {(employee.name || "E").charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <strong>{employee.name}</strong>
                          <small>{employee.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>{employee.department || "—"}</td>
                    <td>{employee.role || "—"}</td>
                    <td>
                      <span className={
                        employee.availability === "Available"
                          ? "tp-status tp-status-green"
                          : "tp-status tp-status-orange"
                      }>
                        {employee.availability || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="tp-empty">No employees added yet.</p>
        )}

      </section>

      {/* Recent Leave Requests */}
      <section className="tp-panel tp-leave-panel">

        <div className="tp-panel-heading">
          <div>
            <span>TEAM UPDATES</span>
            <h3>Recent Leave Requests</h3>
          </div>
          <button
            className="tp-view-button"
            onClick={() => setActivePage("leaves")}
          >
            View All →
          </button>
        </div>

        {recentLeaves.length > 0 ? (
          <div className="tp-table-wrap">
            <table className="tp-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.map((leave, index) => (
                  <tr key={leave.id || index}>
                    <td>
                      <strong>{getEmployeeName(leave)}</strong>
                    </td>
                    <td>{leave.leaveType || leave.type || "Leave"}</td>
                    <td>{getLeaveDate(leave)}</td>
                    <td>
                      <span className={
                        `tp-status ${
                          getStatus(leave).toLowerCase() === "approved"
                            ? "tp-status-green"
                            : getStatus(leave).toLowerCase() === "rejected"
                              ? "tp-status-red"
                              : "tp-status-orange"
                        }`
                      }>
                        {getStatus(leave)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="tp-no-leaves">
            <span>🌸</span>
            <h4>All caught up!</h4>
            <p>There are no leave requests to display yet.</p>
          </div>
        )}

      </section>

      {/* Footer Banner */}
      <section className="tp-bottom-banner">
        <span>✨</span>
        <div>
          <h3>Great teams build great things!</h3>
          <p>Keep your workforce organized with TeamPlanner.</p>
        </div>
        <span className="tp-bottom-emoji">💜</span>
      </section>

    </div>
  );
}

export default Dashboard;