
function Sidebar({ activePage, setActivePage }) {
  const menu = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "employees", icon: "♙", label: "Employees" },
    { id: "leaves", icon: "▤", label: "Leave Requests" },
    { id: "availability", icon: "◷", label: "Availability" }
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">T</span>
        <span>TeamPlanner</span>
      </div>

      <p className="menu-label">WORKSPACE</p>

      <nav>
        {menu.map(item => (
          <button
            key={item.id}
            className={`nav-item ${
              activePage === item.id ? "selected" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="admin-avatar">A</div>
        <div>
          <strong>Administrator</strong>
          <small>Management</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
