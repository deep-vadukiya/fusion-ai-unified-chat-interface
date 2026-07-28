//

import { useState } from "react";

import useAuth from "../../../hooks/useAuth";

// ------------------------------------------------

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(true);

  const { register } = useAuth();

  // TODO: add register here ...

  return (
    <div>
      <div>
        <input
          name="firstName"
          placeholder="First name"
        />
        <input
          name="lastName"
          placeholder="Last name"
        />
      </div>

      <input placeholder="email" />

      <input
        placeholder="password"
        type={showPassword ? "text" : "password"}
      />

      <button disabled={isSubmitting}>Register</button>
    </div>
  );
};

export default SignupForm;
