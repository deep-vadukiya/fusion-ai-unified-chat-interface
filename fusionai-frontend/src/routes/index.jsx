//

import { useRoutes } from "react-router-dom";
// utility page
import NotFound from "../pages/NotFound";

// ------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: "", element: <></> },

    { path: "*", element: <NotFound /> },
  ]);
}
