//

import { useNavigate } from "react-router-dom";

// ------------------------------------------------

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h4>Page Not Fond</h4>

      <a onClick={() => navigate("/")}>Go Back To Home</a>
    </div>
  );
}
