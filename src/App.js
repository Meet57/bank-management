import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import AccountsPage from "./pages/AccountsPage";
import UsersPage from "./pages/UsersPage";
import { AppProvider } from "./context/AppContext";
import CreateUser from "./pages/CreateUser";

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/edit-user/:id" element={<CreateUser />} />
            </Routes>
          </div>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;