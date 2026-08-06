//

import Router from "./routes";
import { AuthProvider } from "./contexts/JWTContext";

// ----------------------------------------------

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
