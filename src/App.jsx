import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
//actions
import { logoutAction } from "./actions/logout";
//layouts
import MainLayout, { mainLoader } from "./layout/Main";
//components
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/error";
//libs
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Expenses, { expensesLoader, expensesAction } from "./pages/Expenses";
import Budget, { budgedLoader, budgetAction } from "./pages/Budget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      },
      {
        path: "expenses-detail",
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />
      },
      {
        path: "budget/:id",
        element: <Budget />,
        loader: budgedLoader,
        action: budgetAction,
        errorElement: <Error />
      }
    ]
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
