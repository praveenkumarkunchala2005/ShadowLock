import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"


const DuressModePasswordSet = () => {
  return (
   <div className="flex justify-center items-center w-full h-screen">
        <div className="lg:w-1/3 md:w-1/2 sm:w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Set Duress Mode Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="p-2 text-slate-800">Enter Password</p>
                    <input type="text" className="border-2 border-slate-900 rounded-3xl w-full p-2" />
                    <p className="p-2 text-slate-800">ReEnter Password</p>
                    <input type="text" className="border-2 border-slate-900 rounded-3xl w-full p-2" />
                </CardContent>
                <CardFooter>
                    <div className="flex justify-center items-center w-full">
                        <Button variant="outline" style={{ width: "150px" }}>Save Password</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
};

export default DuressModePasswordSet;
