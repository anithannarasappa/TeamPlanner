
function Login({ onLogin, onRegister }) {
  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) return;

    onLogin();
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo">T</div>
        <h1>Welcome Back!</h1>
        <p>Sign in to your TeamPlanner account.</p>

        <label>Email Address</label>
        <input name="email" type="email"
          placeholder="Enter your email" required/>

        <label>Password</label>
        <input name="password" type="password"
          placeholder="Enter your password" required/>

        <button type="submit">Login to Dashboard</button>

        <p className="auth-switch">
          Don't have an account?
          <button type="button" onClick={onRegister}>Register</button>
        </p>
      </form>
    </div>
  );
}

export default Login;
