import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ROUTES } from "./Routes";
import {FC} from 'react'
import MainPage from "./pages/main/Main";
import HelpsPage from "./pages/Helps/Helps";
import HelpPage from "./pages/Help/Help";
import LoginPage from "./pages/Login/Login";
import RegistrationPage from "./pages/Registration/Registration";
import AccountPage from "./pages/Account/Account";
import LesionPage from "./pages/Lesion/Lesion";
import LesionsPage from "./pages/Lesions/Lesions"
import HelpsTablePage from "./pages/HelpsTable/HelpsTable";
import AddEditHelpPage from "./pages/AddEditHelp/AddEditHelp";
import NavigationBar from "./components/NavigationBar/NavigationBar"
import ForbiddenPage from "./pages/Forbidden/Forbidden";
import NotFoundPage from "./pages/NotFound/NotFound";
import "./App.css"
import { setupInterceptors } from "./api";

const App: FC = () => {
  const navigate = useNavigate()
  setupInterceptors(navigate)

  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path={ROUTES.MAIN} index element={<MainPage />} />
        <Route path={ROUTES.HELPS} index element={<HelpsPage />} />
        <Route path={`${ROUTES.HELPS}/:helpId`} element={<HelpPage />} />
        <Route path={ROUTES.LOGIN} index element={<LoginPage />} />
        <Route path={ROUTES.REGISTRATION} index element={<RegistrationPage />} />
        <Route path={ROUTES.ACCOUNT} index element={<AccountPage />} />
        <Route path={ROUTES.LESIONS} index element={<LesionsPage/>}/>
        <Route path={`${ROUTES.LESIONS}/:lesionId`} index element={<LesionPage />} />
        <Route path={ROUTES.HELPS_TABLE} index element={<HelpsTablePage />} />
        <Route path={`${ROUTES.ADDEDITELEMENT}/:helpId?`} index element={<AddEditHelpPage />} />
        <Route path={ROUTES.FORBIDDEN} index element={<ForbiddenPage />} />
        <Route path='*' index element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App
