import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Landing from "./pages/Landing.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import Home from "./pages/Home.jsx";
import DuressModePasswordSet from "./pages/DuressModePasswordSet.jsx";
import { useState } from "react";

function App() {
  const [isDuressSet, setisDuressSet] = useState(true);
  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route
        path="/Home"
        element={
          <>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
            <SignedIn>
              {isDuressSet?<Home/>:<DuressModePasswordSet/> }
            </SignedIn>
          </>
        }
      />
      <Route
        path="/DuressPasswordSet"
        element={
          <>
            <SignedIn>
              <DuressModePasswordSet/>
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in" />
            </SignedOut>
          </>
        }
      />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
