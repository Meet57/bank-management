import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import AccountsPage from "./pages/AccountsPage";
import UsersPage from "./pages/UsersPage";
import UserForm from "./pages/UserForm";
import { AppProvider } from "./context/AppContext";
import AccountForm from "./pages/AccountForm";
import DynamicModal from "./components/DynamicModal";

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <DynamicModal />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/create-user" element={<UserForm />} />
              <Route path="/edit-user/:id" element={<UserForm />} />
              <Route path="/create-account" element={<AccountForm />} />
              <Route path="/edit-account/:id" element={<AccountForm />} />
            </Routes>
          </div>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;