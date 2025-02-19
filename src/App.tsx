import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Head from "./modules/Head";
import SpaceObjectsPage from "./pages/SpaceObjectsPage";
import SpaceObjectDetailPage from "./pages/SpaceObjectDetailPage"
import { HomePage } from "./pages/HomePage.tsx";
//import Foot from "./modules/Foot";
import { ROUTES } from "./Routes";
import './App.css'

function App() {
  return (
    // <React.Fragment>
    //   {/*<Head></Head>*/}
    //   <SpaceObjectsPage></SpaceObjectsPage>
    //   {/*<Foot></Foot>*/}
    // </React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.SPACEOBJECTS} element={<SpaceObjectsPage />} />
        <Route path={`${ROUTES.SPACEOBJECTS}/:id`} element={<SpaceObjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App