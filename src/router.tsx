import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./pages/home/home";
import Detail from "./pages/post/detail";
import PostCreate from "./pages/post/postCreate";
import PostEdit from "./pages/post/postEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element:<Home/>
      },
      {
        path: "/post/detail/:id",
        element:<Detail/>
      },
      {
        path: "/post/create",
        element: <PostCreate/>
      },
      {
        path: "/post/edit/:id",
        element: <PostEdit/>
      }
    ]
  },
]);
export default router;
