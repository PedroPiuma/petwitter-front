import { Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./context/auth-context";
import Login from "./routes/Login";
import Layout from "./components/Layout";
import ProtectedPage from "./routes/ProtectedPage";
import SignUp from "./routes/SignUp";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route element={<Layout />}> */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/protected" element={
          <RequireAuth>
            <ProtectedPage />
          </RequireAuth>
        }
        />
        {/* </Route> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
