import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from './features/Auth/Welcome';
import UsersList from "./features/Users/UsersList";
import ContactsList from "./features/Contacts/ContactsList";
import NotFound from "./features/NotFound";
import Prefetch from "./features/Auth/Prefetch";
import { ROLES } from './config/roles'
import PersistLogin from './features/Auth/PersistLogin'
import RequireAuth from './features/Auth/RequireAuth'
//<Route path="/dashboard" element={[<Navbar/>,<Dashboard/>]}></Route>


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
                <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.moderator]} />}> {/*ADMIN ONLY ROUTE*/}
                <Route path="users">
                  <Route index element={<UsersList />} />
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