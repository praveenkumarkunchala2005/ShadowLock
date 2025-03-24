import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopupOpenToAdd, setIsPopupOpenToAdd] = useState(false);
  const [isPopupOpenToGenerate, setIsPopupOpenToGenerate] = useState(false);
  const { user } = useUser();
  const [websiteName, setwebsiteName] = useState("");
  const [websiteURL, setwebsiteURL] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [notes, setnotes] = useState("");
  const [addCredentialSave, setaddCredentialSave] = useState(false);

  useEffect(() => {
    if (isPopupOpenToAdd || isPopupOpenToGenerate) {
      setIsSidebarOpen(false);
    }
  }, [isPopupOpenToAdd, isPopupOpenToGenerate, setIsSidebarOpen]);

  const addCredential = async (
    websiteName,
    websiteURL,
    userName,
    password,
    notes
  ) => {
    setaddCredentialSave(true);
    const docId = Date.now().toString();
    try {
      await setDoc(doc(db, "credentials", websiteName), {
        websiteName: websiteName,
        websiteURL: websiteURL,
        userName: userName,
        password: password,
        notes: notes,
        safe: true,
        createdAt: new Date(),
        modifiedAt: new Date(),
        userEmail: user?.primaryEmailAddress?.emailAddress,
        id: docId,
      });
      console.log("done succesfully");
      toast.success("Added Succesfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Added Succesfully!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.error("Error adding document: ", error);
    }
    setaddCredentialSave(false);
  };

  return (
    <>
      <nav className="bg-gray-50 shadow-md top-0 left-0 w-full z-50 fixed">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="text-2xl font-serif font-semibold text-amber-500 hover:text-amber-600"
          >
            ShadowLock
          </Link>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded-md text-amber-500 hover:bg-gray-200"
          >
            <Menu size={28} />
          </button>

          <SignedIn>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsPopupOpenToAdd(true)}
                className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition duration-200"
              >
                Add A Credential
              </button>
              <button
                onClick={() => setIsPopupOpenToGenerate(true)}
                className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition duration-200"
              >
                Generate Password
              </button>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "42px",
                      height: "42px",
                    },
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
              <div className="hidden md:flex md:flex-row space-x-4">
                <div className="border-2 rounded-3xl px-5 py-2 text-white bg-amber-500 hover:bg-amber-600 transition duration-200 text-center">
                  <SignInButton />
                </div>
                <div className="border-2 rounded-3xl px-5 py-2 text-white bg-amber-500 hover:bg-amber-600 transition duration-200 text-center">
                  <SignUpButton />
                </div>
              </div>
          </SignedOut>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full shadow-lg p-4 flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="mb-4 self-end text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <SignedOut>
              <div className="flex flex-col space-y-4 mt-6">
                <div onClick={()=>setIsSidebarOpen(false)} className="border-2 rounded-3xl px-5 py-2 text-white bg-amber-500 hover:bg-amber-600 transition duration-200 text-center">
                  <SignInButton />
                </div>
                <div onClick={()=>setIsSidebarOpen(false)} className="border-2 rounded-3xl px-5 py-2 text-white bg-amber-500 hover:bg-amber-600 transition duration-200 text-center">
                  <SignUpButton />
                </div>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col space-y-4 mt-6">
                <button
                  onClick={() => setIsPopupOpenToAdd(true)}
                  className="px-4 py-2 bg-amber-500 font-medium text-lg h-14 text-white rounded-full hover:bg-amber-600 transition duration-200"
                >
                  Add A Credential
                </button>
                <button
                  onClick={() => setIsPopupOpenToGenerate(true)}
                  className="px-4 py-2 h-14 font-medium text-lg bg-amber-500 text-white rounded-full hover:bg-amber-600 transition duration-200"
                >
                  Generate Password
                </button>
                <div className="flex items-center justify-between bg-amber-500 px-3 py-2 rounded-full hover:bg-amber-600 transition duration-200">
                  <span className="text-white text-lg font-medium">
                    Profile
                  </span>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: {
                          width: "40px",
                          height: "40px",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      )}

      {isPopupOpenToAdd && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsPopupOpenToAdd(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add A Credential</h2>
            <input
              type="text"
              placeholder="Enter Website name"
              onChange={(e) => setwebsiteName(e.target.value)}
              className="w-full border p-2 rounded-md mt-2"
            />
            <input
              type="text"
              placeholder="Enter Website URL"
              onChange={(e) => setwebsiteURL(e.target.value)}
              className="w-full border p-2 rounded-md mt-2"
            />
            <input
              type="text"
              onChange={(e) => setuserName(e.target.value)}
              placeholder="Enter User Name or Email or Phone"
              className="w-full border p-2 rounded-md mt-2"
            />
            <input
              type="text"
              placeholder="Enter Password"
              onChange={(e) => setpassword(e.target.value)}
              className="w-full border p-2 rounded-md mt-2"
            />
            <input
              type="password"
              placeholder="Add Notes"
              onChange={(e) => setnotes(e.target.value)}
              className="w-full border p-2 rounded-md mt-2"
            />
            <button
              onClick={() =>
                addCredential(
                  websiteName,
                  websiteURL,
                  userName,
                  password,
                  notes
                )
              }
              className="mt-4 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600"
            >
              {addCredentialSave ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      )}

      {isPopupOpenToGenerate && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsPopupOpenToGenerate(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Generate Password</h2>
            <p className="text-gray-600">
              Click the button below to generate a secure password.
            </p>
            <button className="mt-4 w-full bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600">
              Generate
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Navbar;
