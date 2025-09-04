import { SidebarContent, SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { Sidebar } from "lucide-react";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <Sidebar>
            
        </Sidebar>
        <main className=" w-full m-2">
          <div className="flex item-centere gap-2 border-sidebar-border p-4 rounded-xl bg-sidebar ">
            <div className="ml-auto"> </div>
            <UserButton />
          </div>
          <div  className="flex flex-col">

          {children}

          </div>

        </main>
      </SidebarProvider>
    </>
  );
};

export default layout;
