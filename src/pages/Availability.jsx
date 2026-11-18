
function Availability({ employees, leaves }) {
  const today = new Date().toISOString().slice(0, 10);

  const staff = employees.map(emp => {
    const onLeave = leaves.some(leave =>
      leave.employeeId === emp.id &&
      leave.status === "Approved" &&
      leave.startDate <= today &&
      leave.endDate >= today
    );

    return {
      ...emp,
      availability: onLeave ? "On Leave" : "Available"
    };
  });

  return (
    <div className="page-content">
      <div className="page-heading">
        <h2>Workforce Availability</h2>
        <p>Monitor your employee availability and workforce status.</p>
      </div>

      <div className="availability-cards">
        <div className="availability-card">
          <h3>{staff.filter(e => e.availability === "Available").length}</h3>
          <p>Available Employees</p>
        </div>

        <div className="availability-card">
          <h3>{staff.filter(e => e.availability === "On Leave").length}</h3>
          <p>Employees on Leave</p>
        </div>

        <div className="availability-card">
          <h3>{staff.length}</h3>
          <p>Total Workforce</p>
        </div>
      </div>

      <div className="content-card">
        <h3>Employee Availability Details</h3>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Job Role</th>
                <th>Availability</th>
              </tr>
            </thead>

            <tbody>
              {staff.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.role}</td>
                  <td>
                    <span className={`status ${
                      emp.availability === "Available" ? "Approved" : "Rejected"
                    }`}>
                      {emp.availability}
                    </span>
                  </td>
                </tr>
              ))}

              {staff.length === 0 && (
                <tr><td colSpan="4">No employee records available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Availability;
