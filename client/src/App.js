import { Route, Routes } from "react-router-dom";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import Layout from "./components/Layout";
import Public from "./components/Public";
import DashLayout from "./components/DashLayout";
import Welcome from './features/Auth/Welcome';
import UserList from "./features/Users/UserList";
import ContactsList from "./features/Contacts/ContactsList";
import NotFound from "./features/NotFound";


//<Route path="/dashboard" element={[<Navbar/>,<Dashboard/>]}></Route>
 
function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Public />}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register/>}/>
          <Route path="*" element={<NotFound />}/>

          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />

            <Route path="user">
              <Route index element={<UserList />} />
            </Route>

            <Route path="contacts">
              <Route index element={<ContactsList />} />
            </Route>
            
          </Route>
        
        </Route>
      </Routes>
  );
}
 
export default App;