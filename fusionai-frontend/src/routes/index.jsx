//

import { Navigate, useRoutes } from "react-router-dom";
// guards
import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";
// auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
// pages
import Chats from "../pages/Chats";
import Prompt from "../pages/Chats/components/Prompt";
import ChatThread from "../pages/Chats/components/ChatThread";
// utility page
import NotFound from "../pages/NotFound";
// config
import { PATH_AFTER_LOGIN } from "../config";

// ------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <Navigate
          to={PATH_AFTER_LOGIN}
          replace
        />
      ),
      index: true,
    },

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
          <Chats />
        </AuthGuard>
      ),
      children: [
        {
          element: (
            <Navigate
              to={PATH_AFTER_LOGIN}
              replace
            />
          ),
          index: true,
        },
        {
          path: "new",
          element: <Prompt />,
        },
        {
          path: "thread/:chat_id",
          element: <ChatThread />,
        },
      ],
    },

    { path: "*", element: <NotFound /> },
  ]);
}
