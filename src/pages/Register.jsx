
function Register({ onRegister, onLogin }) {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    if (data.get("password") !== data.get("confirmPassword")) {
      alert("Passwords do not match!");
      return;
    }

    onRegister();
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo">T</div>
        <h1>Create Account</h1>
        <p>Join TeamPlanner and manage your workforce.</p>

        <label>Full Name</label>
        <input name="name" placeholder="Enter your full name" required/>

        <label>Email Address</label>
        <input name="email" type="email" placeholder="Enter email" required/>

        <label>Password</label>
        <input name="password" type="password"
          placeholder="Create password" required minLength="6"/>

        <label>Confirm Password</label>
        <input name="confirmPassword" type="password"
          placeholder="Confirm password" required/>

        <button type="submit">Create Account</button>

        <p className="auth-switch">
          Already have an account?
          <button type="button" onClick={onLogin}>Login</button>
        </p>
      </form>
    </div>
  );
}

export default Register;
