//

import { Link as RouterLink } from "react-router-dom";

import LoginForm from "./components/LoginForm";
// paths
import { PATH_AUTH } from "../../routes/paths";

// ------------------------------------------------

// ------------------------------------------------

export default function SignIn() {
  return (
    <div>
      <h4>
        Hi,
        <br />
        Welcome Back
      </h4>

      <div>
        <div>
          <div>
            <div sx={{ flexGrow: 1 }}>
              <h5>Sign in to Open Chat</h5>
              <p>Enter your details below.</p>
            </div>
          </div>

          <LoginForm />

          <p>
            Don’t have an account?{" "}
            <a
              component={RouterLink}
              to={PATH_AUTH.signUp}
            >
              Get started
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
