import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import Layout from "./components/Private/Layout";
import Public from "./components/Public/Public.js";
import DashLayout from "./components/Private/DashLayout";
import Welcome from './features/Auth/Welcome';
import UsersList from "./features/Users/UsersList";
import ContactsList from "./features/Contacts/ContactsList";
import NotFound from "./features/NotFound";
import Prefetch from "./features/Auth/Prefetch";
import { ROLES } from './config/roles'
import PersistLogin from './features/Auth/PersistLogin'
import RequireAuth from './features/Auth/RequireAuth'
import UserById from './features/Users/UserById'


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        {/* Public route */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected routes customers */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />
                {/*ADMIN ONLY ROUTE*/}
                <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.moderator]} />}> 
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<UserById />} />
                  <Route path="register" element={<Register />} />
                </Route>
                </Route> {/*END ADMIN ONLY ROUTE*/}
                <Route path="contacts">
                  <Route index element={<ContactsList />} />
                </Route>

              </Route> {/* End dash */}
            </Route>
          </Route>
        </Route> {/*End protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;