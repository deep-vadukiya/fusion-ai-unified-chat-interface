//

import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// paths
import { PATH_AUTH } from "../../../routes/paths";
import useAuth from "../../../hooks/useAuth";

// ------------------------------------------------

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInError, setSignInError] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(userEmail, userPassword);
      setIsSubmitting(false);
    } catch (error) {
      setSignInError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {signInError && <p severity="error">{signInError}</p>}

          <input
            placeholder="email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <input
            placeholder="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <div>
          <a
            component={RouterLink}
            to={PATH_AUTH.forgotPassword}
          >
            Forgot password?
          </a>
        </div>

        <button disabled={isSubmitting}>Log in</button>
      </form>
    </>
  );
};

export default LoginForm;
