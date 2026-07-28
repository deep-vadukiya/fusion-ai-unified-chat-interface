//

import { useRoutes } from "react-router-dom";
// guards
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
// pages
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Chats from "../pages/Chats";
// utility page
import NotFound from "../pages/NotFound";

// ------------------------------------------------

export default function Router() {
  return useRoutes([
    { path: "", element: <></> },

    {
      path: "auth",
      children: [
        {
          path: "sign-in",
          element: (
            <GuestGuard>
              <SignIn />
            </GuestGuard>
          ),
        },
        {
          path: "sign-up",
          element: (
            <GuestGuard>
              <SignUp />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: "chat",
      element: (
        <AuthGuard>
          <p>Chatroom wrapper</p>
        </AuthGuard>
      ),
      children: [
        {
          path: "",
          element: (
            <AuthGuard>
              <Chats />
            </AuthGuard>
          ),
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);
}
