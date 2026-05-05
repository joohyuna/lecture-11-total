import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";
import Home from "../pages/Home.tsx";
import TodoPage from "../pages/todo/TodoPage.tsx";
import CoinPage from "../pages/coin/CoinPage.tsx";
import MoviePage from "../pages/movie/MoviePage.tsx";
import MovieDetail from "../pages/movie/MovieDetail.tsx";
import MovieList from "../pages/movie/MovieList.tsx";
import BoardPage from "../pages/board/BoardPage.tsx";
import BoardDetail from "../pages/board/BoardDetail.tsx";
import RocketPage from "../pages/rocket/RocketPage.tsx";
import RocketDetail from "../pages/rocket/RocketDetail.tsx";
import BooksPage from "../pages/book/BooksPage.tsx";
import BooksSearch from "../pages/book/BooksSearch.tsx";
import BooksDetail from "../pages/book/BooksDetail.tsx";


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
            { path: "coin", element: <CoinPage /> },
            {
                path: "movie",
                children: [
                    { index: true, element: <MoviePage /> },
                    { path: "list", element: <MovieList /> },
                    { path: "detail/:id", element: <MovieDetail /> },
                ],
            },
            {
                path: "board",
                children: [
                    { index: true, element: <BoardPage /> },
                    { path: "detail/:id", element: <BoardDetail /> },
                ],
            },
            {
                path: "rocket",
                children: [
                    { index: true, element: <RocketPage /> },
                    { path: "detail/:id", element: <RocketDetail /> },
                ],
            },
            {
                path: "book",
                children: [
                    { index: true, element: <BooksPage /> },
                    { path: "search", element: <BooksSearch /> },
                    { path: "detail/:id", element: <BooksDetail /> },
                ],
            },
        ],
    },
]);

export default GetRouter;
