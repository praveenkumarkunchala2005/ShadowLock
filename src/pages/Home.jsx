import React, { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import Content from "@/components/Content";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContentPopUp from "@/components/ContentPopUp";
import { useUser } from "@clerk/clerk-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../service/FirebaseConfig";
const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userData, setUserData] = useState([]);
  const { user, isLoaded } = useUser()
  useEffect(() => {
    let unsubscribe;

    const getData = async () => {
      try {
        if (!db) {
          console.error("Firestore is not initialized.");
          return;
        }
        if (isLoaded && user) {
          const userEmail = user.primaryEmailAddress?.emailAddress;

          if (userEmail) {
            const q = query(
              collection(db, "credentials"),
              where("userEmail", "==", userEmail)
            );
            unsubscribe = onSnapshot(q, (querySnapshot) => {
              const fetchedData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setUserData(fetchedData);
              console.log("UserData updated:", fetchedData);
            });
          }
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, isLoaded]);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex px-2 md:px-24 mt-20">
      <div className="flex w-full h-screen">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 md:w-1/3 border-2">
          <SideBar
            setSelectedItem={(item) => {
              setSelectedItem(item);
              setIsOpen(true);
            }}
            credentials={userData}
          />
        </div>

        {!isMobile && (
          <div className="hidden md:block lg:w-2/3 md:w-2/3 border-2">
            <Content selectedItem={selectedItem} credentials={userData} />
          </div>
        )}

        {isMobile && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-lg bg-white rounded-lg p-6">
              <ContentPopUp
                selectedItem={selectedItem}
                credentials={userData}
                onClose={handleClose}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Home;
