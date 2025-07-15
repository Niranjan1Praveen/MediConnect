"use client";
import {
  Inbox,
  Calendar,
  User2,
  ChevronUp,
  Plus,
  Projector,
  Handshake,
  BarChart,
  MapIcon,
  Send,
  FormInput,
  FileText,
  Mic,
  Stethoscope,
  Dumbbell,
  Search,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";

const AppSidebar = () => {
  const { user } = useUser();
const items = [
  {
    title: "Documentation",
    url: "/doctor",
    icon: FileText,
    description: "View docs & guides",
    badge: null,
  },
  {
    title: "Conversation",
    url: "/doctor/liveConversation",
    icon: Mic,
    description: "Real-time chat",
    badge: "New",
  },
  {
    title: "Digital Prescription",
    url: "/doctor/digiPrescription",
    icon: Stethoscope,
    description: "Manage prescriptions",
    badge: null,
  },
  {
    title: "Fitness Generator",
    url: "/doctor/fitnessGenerator",
    icon: Dumbbell,
    description: "Create workout plans",
    badge: null,
  },
  {
    title: "Search Prescription",
    url: "/doctor/searchPrescription",
    icon: Search,
    description: "Find prescriptions",
    badge: null,
  },
  {
    title: "Report Analyser",
    url: "http://127.0.0.1:5001",
    icon: BarChart,
    description: "Anayse reports",
    badge: null,
  },
];
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Image
                src={user?.profileImage || "https://avatar.windsor.io/john@doe.com"}
                alt="logo"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span>Welcome {user?.firstName}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr />
      <SidebarContent>
        {/* Volunteer */}
        {user?.role.toLowerCase() === "doctor" && <SidebarGroup>
          <SidebarGroupLabel>Volunteer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative overflow-hidden"
                  >
                    <Link
                      href={item.url}
                      className="relative flex items-center gap-3 p-3 rounded-xl transition-all duration-500 backdrop-blur-sm"
                    >
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-sm" />

                      <div className="relative z-10 flex items-center gap-3 w-full">
                        <div className="relative">
                            <item.icon className="h-4 w-4 flex items-center justify-center text-emerald-400 transition-colors duration-300" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-200 group-hover:text-white transition-colors duration-300">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                            {item.description}
                          </div>
                        </div>

                        {item.badge && (
                          <div className="ml-auto">
                            <span className="inline-flex justify-center items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                              {item.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}
        {/* All Events */}
        {user?.role.toLowerCase() === "organization" && <SidebarGroup>
          <SidebarGroupLabel>Events</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/dashboard/yourevents"}>
                    <Calendar />
                    <span>Your Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/events">
                    <Projector />
                    See All Events
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/events/new">
                    <Plus />
                    Add Event
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}
        {/* CSR */}
        {user?.role.toLowerCase() === "corporate" && <SidebarGroup>
          <SidebarGroupLabel>CSR</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"https://dropconnect-csr-dashboard.onrender.com/"}>
                    <Handshake />
                    <span>CSR Dashboard</span>
                  </Link>
                  {/* <Link href={"http://127.0.0.1:9050/"}>
                    <Handshake />
                    <span>CSR Dashboard</span>
                  </Link> */}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}
        {/* NGO */}
        {user?.role.toLowerCase() === "organization" && <SidebarGroup>
          <SidebarGroupLabel>NGO</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"https://dropconnect-impact-assessment-dashboard.onrender.com"}>
                    <BarChart />
                    <span>Impact Dashboard</span>
                  </Link>
                  {/* <Link href={"http://127.0.0.1:8050/"}>
                    <BarChart />
                    <span>Impact Dashboard</span>
                  </Link> */}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}
        {/* Region Suitability */}
        {user?.role.toLowerCase() === "organization" && <SidebarGroup>
          <SidebarGroupLabel>Region Suitability</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"https://dropconnect-region-suitability-map.onrender.com"}>
                    <MapIcon />
                    <span>View Map</span>
                  </Link>
                  {/* <Link href={"http://127.0.0.1:5000"}>
                    <MapIcon />
                    <span>View Map</span>
                  </Link> */}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.firstName} <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Setting</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
