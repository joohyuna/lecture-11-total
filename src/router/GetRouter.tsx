import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";


const GetRouter = createBrowserRouter([
    // "/" 로 시작하는 주소로 사용자가 들어왔다면,
    // <MainLayout />  만출력하하고
    // 주소가 "/" 만 있다면 , <Home />을 덧붙이고,

    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "todo", element: <TodoPage /> },
        ],
    },
]);

export default GetRouter ;