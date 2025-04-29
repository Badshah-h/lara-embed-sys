"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  LayoutDashboard,
  Palette,
  MessageSquare,
  Database,
  Settings,
  Brain,
  Code,
  LogOut,
  Menu,
  X,
  FileText,
  BarChart,
  Users,
  Globe,
  Key,
  BookOpen,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({
  children = <div className="p-6">Dashboard Content</div>,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Widget Config",
      href: "/dashboard/widget",
      icon: <Palette className="h-5 w-5" />,
    },
    {
      name: "Context Rules",
      href: "/dashboard/context-rules",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        { name: "Create Rule", href: "/dashboard/context-rules/create" },
        { name: "Manage Rules", href: "/dashboard/context-rules/manage" },
        { name: "Test Rules", href: "/dashboard/context-rules/test" },
      ],
    },
    {
      name: "Prompt Templates",
      href: "/dashboard/prompts",
      icon: <MessageSquare className="h-5 w-5" />,
      submenu: [
        { name: "Create Template", href: "/dashboard/prompts/create" },
        { name: "Manage Templates", href: "/dashboard/prompts/manage" },
      ],
    },
    {
      name: "Knowledge Base",
      href: "/dashboard/knowledge",
      icon: <Database className="h-5 w-5" />,
    },
    {
      name: "Web Scraping",
      href: "/dashboard/scraping",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "Embed Code",
      href: "/dashboard/embed",
      icon: <Code className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "API Keys",
      href: "/dashboard/api-keys",
      icon: <Key className="h-5 w-5" />,
    },
    {
      name: "AI Configuration",
      href: "/dashboard/ai-config",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "User Management",
      href: "/dashboard/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-[hsla(var(--sidebar-foreground)/0.1)]">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">ChatAdmin</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-[hsl(var(--sidebar-foreground))]"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 border-b border-[hsla(var(--sidebar-foreground)/0.1)]">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs opacity-70">admin@example.com</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {/* Desktop Tab Navigation */}
          <div className="mb-4">
            <Tabs
              defaultValue="main"
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="w-full bg-[hsla(var(--sidebar-foreground)/0.1)] grid grid-cols-4">
                {navCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center justify-center gap-2 text-xs data-[state=active]:bg-[hsla(var(--sidebar-foreground)/0.2)] data-[state=active]:text-[hsl(var(--sidebar-foreground))] data-[state=active]:shadow-sm"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <ul className="space-y-1">
            {navItems
              .filter((item) => item.category === activeCategory)
              .map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[hsla(var(--sidebar-foreground)/0.1)]",
                      pathname === item.href
                        ? "bg-[hsla(var(--sidebar-foreground)/0.1)] text-[hsl(var(--sidebar-foreground))]"
                        : "text-[hsla(var(--sidebar-foreground)/0.7)]",
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                    {item.submenu && (
                      <svg
                        className="ml-auto h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </Link>
                  {item.submenu && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "flex items-center rounded-md px-3 py-2 text-xs font-medium transition-colors hover:bg-[hsla(var(--sidebar-foreground)/0.1)]",
                              pathname === subItem.href
                                ? "bg-[hsla(var(--sidebar-foreground)/0.1)] text-[hsl(var(--sidebar-foreground))]"
                                : "text-[hsla(var(--sidebar-foreground)/0.7)]",
                            )}
                          >
                            <span>{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </nav>

        <div className="border-t border-[hsla(var(--sidebar-foreground)/0.1)] p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[hsla(var(--sidebar-foreground)/0.7)] hover:text-[hsl(var(--sidebar-foreground))] hover:bg-[hsla(var(--sidebar-foreground)/0.1)]"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 lg:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </div>
            <ThemeSwitcher />
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-y-0 left-0 z-30 w-64 bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-foreground))] lg:hidden">
            <div className="flex h-16 items-center justify-between px-4 border-b border-[hsla(var(--sidebar-foreground)/0.1)]">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">ChatAdmin</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-[hsl(var(--sidebar-foreground))]"
                onClick={toggleMobileMenu}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 border-b border-[hsla(var(--sidebar-foreground)/0.1)]">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs opacity-70">admin@example.com</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              {/* Tab Navigation for Mobile */}
              <div className="mb-4">
                <Tabs
                  defaultValue="main"
                  value={activeCategory}
                  onValueChange={setActiveCategory}
                  className="w-full"
                >
                  <TabsList className="w-full bg-[hsla(var(--sidebar-foreground)/0.1)] grid grid-cols-4">
                    {navCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="text-xs data-[state=active]:bg-[hsla(var(--sidebar-foreground)/0.2)]"
                      >
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Navigation Items filtered by active category for Mobile */}
              <ul className="space-y-1">
                {navItems
                  .filter((item) => item.category === activeCategory)
                  .map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[hsla(var(--sidebar-foreground)/0.1)]",
                          pathname === item.href
                            ? "bg-[hsla(var(--sidebar-foreground)/0.1)] text-[hsl(var(--sidebar-foreground))]"
                            : "text-[hsla(var(--sidebar-foreground)/0.7)]",
                        )}
                        onClick={toggleMobileMenu}
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
