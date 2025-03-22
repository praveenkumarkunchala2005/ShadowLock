import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider, } from "@clerk/clerk-react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" signInUrl="/sign-in" signUpUrl="/sign-up" appearance={{ baseTheme: "light" }}>
        <div className="flex flex-col min-h-screen">
          <Navbar/>
          <App/>
          <Footer/>
        </div>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);
