
function Header({ title }) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <p>Manage your team and plan your workforce efficiently.</p>
      </div>

      <div className="header-right">
        <div className="notification">♧</div>
        <div className="profile">
          <div className="profile-avatar">A</div>
          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
