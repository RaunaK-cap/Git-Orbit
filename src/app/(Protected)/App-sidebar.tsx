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
import { Bot, CreditCard, EarthIcon, EarthLock, LayoutDashboard, Presentation, ProjectorIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const project = [
    { 
        Ptname: "Project1",
        url:"",
        icon: ProjectorIcon
    },
    { 
        Ptname: "Project2",
        url:"",
        icon: ProjectorIcon
    },
    { 
        Ptname: "Project3",
        url:"",
        icon: ProjectorIcon
    }
]
export function AppSidebar() {
  const pathname = usePathname();
  const {open }= useSidebar()
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
                    { project.map((projects)=>(
                        <SidebarMenuItem key={projects.Ptname}>
                            <SidebarMenuButton asChild >
                              
                                <Link href={projects.url} className="space-y-2">
                                <Badge variant={"default"} > {projects.Ptname[0]}</Badge>
                                { projects.Ptname}
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
