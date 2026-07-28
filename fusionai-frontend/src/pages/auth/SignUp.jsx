//

import { Link as RouterLink } from "react-router-dom";
// components
import SignupForm from "./components/SignupForm";
// paths
import { PATH_AUTH } from "../../routes/paths";

// ------------------------------------------------

// ------------------------------------------------

export default function SignUp() {
  return (
    <div>
      <h4>Manage your prompts more effectively with Open Chat</h4>

      <div>
        <div>
          <div>
            <div>
              <div>Get started absolutely free.</div>
            </div>
          </div>
        </div>
      </div>

      <SignupForm />

      <p>
        By registering, I agree to Open Chat&nbsp;
        <a href="#">Terms of Servicet&nbsp;</a>
        and&nbsp;
        <a
          underline="always"
          color="text.primary"
          href="#"
        >
          Privacy Policy
        </a>
        .
      </p>

      <p>
        Already have an account?{" "}
        <a
          variant="subtitle2"
          component={RouterLink}
          color="inherit"
          to={PATH_AUTH.signIn}
        >
          Login
        </a>
      </p>
    </div>
  );
}
