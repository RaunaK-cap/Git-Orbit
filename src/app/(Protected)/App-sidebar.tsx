"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { Bot, CreditCard, EarthLock, LayoutDashboard, Presentation, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppRouter } from "../api/root";
import { useEffect, useState } from "react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meeting",
    url: "/Meeting",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/Billing",
    icon: CreditCard,
  },
];

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});



export function AppSidebar() {
  const pathname = usePathname();
  const {open }= useSidebar()
  const [ projects , setProjects] = useState<Array<{
    id: string; createdAt: string; updateAt: string; GithubURl: string; RepoName: string; deletedAt: string | null;
  }>>([])

  useEffect(()=>{
    (async () => {
      const data = await trpc.project.getproject.query()
      console.log("your project list data is here :", data)
      setProjects(data)
    })()
  } , [])


  return (
    <>
      <Sidebar className="font-sans" collapsible="icon" variant="floating">
        <SidebarHeader className="flex items-center justify-center mt-2 ">
          <div className="flex items-center gap-2">
          <EarthLock className="animate-out"/>
          { open && 
           <Link  href={"/"} className="font-bold text-primary/80 tracking-wider text-2xl" > Git_Orbit </Link>
          }
          </div>
           </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent className=" ">
              <SidebarMenu>
                {items.map((items) => (
                  <SidebarMenuItem key={items.title} className="">
                    <SidebarMenuButton
                      asChild
                      className={`${
                        pathname == items.url ? "bg-amber-700/60 text-white dark:bg-amber-800/50 dark:text-white" : " "
                      }`}
                    >
                      <Link href={items.url}>
                        <items.icon />
                        {items.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>

            <SidebarGroupLabel>
                Projects
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    { projects.slice(-3).map((projects)=>(
                        <SidebarMenuItem key={projects.RepoName}>
                            <SidebarMenuButton asChild >
                              
                                <Link href={""} className="space-y-2">
                                <Badge variant={"default"} > {projects.RepoName[0]}</Badge>
                                { projects.RepoName}
                                </Link>

                            </SidebarMenuButton>

                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <div className="h-4"> </div>
                <Link href={"/create"}>
                  <Button variant={"outline"} className="w-full">
                    Create project +
                  </Button>
                </Link>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroupContent>

        </SidebarGroupContent>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
