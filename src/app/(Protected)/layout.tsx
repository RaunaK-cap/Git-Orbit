import {  SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

import React from "react";
import { AppSidebar } from "./App-sidebar";
import { Themetoggler } from "@/components/Theme-toggler";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <SidebarProvider>
        <AppSidebar/>
        <main className=" w-full m-2 font-sans">
          <div className="flex item-centere gap-2 border-sidebar-border bg-sidebar border shadow p-4 rounded-xl ">
            <div className="ml-auto"> </div>
            <Themetoggler/>
            <UserButton />
          </div>
          <div className=" border-sidebar-border bg-sidebar border shadow  h-[90vh] m-2  p-5 rounded-lg overflow-y-scroll">
            {children}
          </div>
        </main>
      </SidebarProvider>
  );
};

export default layout;
