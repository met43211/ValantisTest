import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Layout from "./components/Layout/Layout";

function Router() {
    return ( 
        <Routes>
            {routes.map(route=>
                <Route key={route.path} path={route.path} element={<Layout/>}>
                    <Route index element={<route.component/>}/>
                </Route>
            )}
        </Routes>
     );
}

export default Router;