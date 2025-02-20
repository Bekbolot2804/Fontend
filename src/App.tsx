import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Head from "./modules/Head";
import HelpsPage from "./pages/HelpsPage";
import HelpDetailPage from "./pages/HelpDetailPage"
import { HomePage } from "./pages/HomePage.tsx";
//import Foot from "./modules/Foot";
import { ROUTES } from "./Routes";
import './App.css'

function App() {
  return (
    // <React.Fragment>
    //   {/*<Head></Head>*/}
    //   <HelpsPage></HelpsPage>
    //   {/*<Foot></Foot>*/}
    // </React.Fragment>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.HelpS} element={<HelpsPage />} />
        <Route path={`${ROUTES.HelpS}/:id`} element={<HelpDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App