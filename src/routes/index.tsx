import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Login from '../pages/Login/Login';
import Editor from "../pages/Editor/Editor";
import CheckAuthWrapper from "./CheckAuthWrapper";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <CheckAuthWrapper>
        <Editor />
      </CheckAuthWrapper>
    ),
  },
  {
    path: "/login",
    element: (
      <CheckAuthWrapper>
        <Login />
      </CheckAuthWrapper>
    )
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes