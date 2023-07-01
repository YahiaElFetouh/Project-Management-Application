import { useRoutes } from "react-router-dom"
import SignUp from "./Pages/SignUp";
import Boards from "./Pages/Boards";
import { LogoLayout } from "./layouts/logoLayout";



export default function Router() {
  return useRoutes([
      {
          path: "/",
          element: <LogoLayout />,
          children: [
              {
                  path: "Boards",
                  element: <Boards />,
              },
              {
                path: "SignUp",
                element: <SignUp />,
            }
          ],
      },
  ]);
}
