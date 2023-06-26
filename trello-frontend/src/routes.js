import { useRoutes } from "react-router-dom"
import SignUp from "./Pages/SignUp";
import { LogoLayout } from "./layouts/logoLayout";



export default function Router() {
  return useRoutes([
      {
          path: "/",
          element: <LogoLayout />,
          children: [
              {
                  path: "SignUp",
                  element: <SignUp />,
              }
          ],
      },
  ]);
}
