import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  Code,
  FileText,
  Database,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      message: "Widget configuration updated",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "warning",
      message: "API usage approaching limit",
      time: "15 min ago",
    },
    {
      id: 3,
      type: "info",
      message: "New user registration",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "error",
      message: "Failed to connect to Hugging Face API",
      time: "3 hours ago",
    },
  ]);

  // Mock data for stats
  const stats = {
    conversations: { value: 1248, change: 12.5 },
    activeUsers: { value: 356, change: 8.2 },
    responseRate: { value: 94.3, change: 2.1 },
    responseTime: { value: 1.2, change: -0.3 },
  };

  const toggleCardExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Header with tabs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your AI chat widget platform
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                {refreshing ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh
              </Button>
              <Button>
                View Live Widget <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full max-w-md grid grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Notifications
                <Badge variant="secondary" className="ml-1">
                  {notifications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Status
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value="overview" className="mt-0 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer group">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-muted/50"
                onClick={() => toggleCardExpand("conversations")}
              >
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  Total Conversations
                  {expandedCard === "conversations" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {stats.conversations.value.toLocaleString()}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${stats.conversations.change > 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                  >
                    {stats.conversations.change > 0 ? "+" : ""}
                    {stats.conversations.change}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  vs. previous period
                </p>

                {expandedCard === "conversations" && (
                  <div className="mt-4 pt-4 border-t border-border animate-in fade-in-50">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Today</span>
                        <span className="font-medium">124</span>
                      </div>
                      <Progress value={40} className="h-1" />

                      <div className="flex justify-between text-xs">
                        <span>This Week</span>
                        <span className="font-medium">568</span>
                      </div>
                      <Progress value={65} className="h-1" />

                      <div className="flex justify-between text-xs">
                        <span>This Month</span>
                        <span className="font-medium">1,248</span>
                      </div>
                      <Progress value={80} className="h-1" />
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 p-0 h-auto"
                    >
                      View detailed analytics
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer group">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-muted/50"
                onClick={() => toggleCardExpand("users")}
              >
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  Active Users
                  {expandedCard === "users" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {stats.activeUsers.value}
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${stats.activeUsers.change > 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                  >
                    {stats.activeUsers.change > 0 ? "+" : ""}
                    {stats.activeUsers.change}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  vs. previous period
                </p>

                {expandedCard === "users" && (
                  <div className="mt-4 pt-4 border-t border-border animate-in fade-in-50">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>New Users</span>
                        <span className="font-medium">42</span>
                      </div>
                      <Progress value={30} className="h-1" />

                      <div className="flex justify-between text-xs">
                        <span>Returning Users</span>
                        <span className="font-medium">314</span>
                      </div>
                      <Progress value={70} className="h-1" />
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 p-0 h-auto"
                    >
                      View user details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer group">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-muted/50"
                onClick={() => toggleCardExpand("response-rate")}
              >
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  Response Rate
                  {expandedCard === "response-rate" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {stats.responseRate.value}%
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${stats.responseRate.change > 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                  >
                    {stats.responseRate.change > 0 ? "+" : ""}
                    {stats.responseRate.change}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  vs. previous period
                </p>

                {expandedCard === "response-rate" && (
                  <div className="mt-4 pt-4 border-t border-border animate-in fade-in-50">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Successful Responses</span>
                        <span className="font-medium">94.3%</span>
                      </div>
                      <Progress value={94.3} className="h-1" />

                      <div className="flex justify-between text-xs">
                        <span>Failed Responses</span>
                        <span className="font-medium">5.7%</span>
                      </div>
                      <Progress value={5.7} className="h-1" />
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 p-0 h-auto"
                    >
                      View response details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer group">
              <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pb-2 group-hover:bg-muted/50"
                onClick={() => toggleCardExpand("response-time")}
              >
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  Avg. Response Time
                  {expandedCard === "response-time" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardTitle>
                <Clock className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {stats.responseTime.value}s
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${stats.responseTime.change < 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}
                  >
                    {stats.responseTime.change > 0 ? "+" : ""}
                    {stats.responseTime.change}s
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  vs. previous period
                </p>

                {expandedCard === "response-time" && (
                  <div className="mt-4 pt-4 border-t border-border animate-in fade-in-50">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Gemini Model</span>
                        <span className="font-medium">0.9s</span>
                      </div>
                      <Progress value={45} className="h-1" />

                      <div className="flex justify-between text-xs">
                        <span>Hugging Face Models</span>
                        <span className="font-medium">1.4s</span>
                      </div>
                      <Progress value={70} className="h-1" />
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 p-0 h-auto"
                    >
                      View performance metrics
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Link href="/dashboard/widget">
                    <Button
                      variant="outline"
                      className="h-24 w-full flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    >
                      <Palette className="h-6 w-6 text-primary" />
                      Configure Widget
                    </Button>
                  </Link>

                  <Link href="/dashboard/context-rules">
                    <Button
                      variant="outline"
                      className="h-24 w-full flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    >
                      <FileText className="h-6 w-6 text-primary" />
                      Edit Context Rules
                    </Button>
                  </Link>

                  <Link href="/dashboard/embed">
                    <Button
                      variant="outline"
                      className="h-24 w-full flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    >
                      <Code className="h-6 w-6 text-primary" />
                      Get Embed Code
                    </Button>
                  </Link>

                  <Link href="/dashboard/knowledge">
                    <Button
                      variant="outline"
                      className="h-24 w-full flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    >
                      <Database className="h-6 w-6 text-primary" />
                      Knowledge Base
                    </Button>
                  </Link>

                  <Link href="/dashboard/ai-config">
                    <Button
                      variant="outline"
                      className="h-24 w-full flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                    >
                      <Brain className="h-6 w-6 text-primary" />
                      AI Configuration
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-colors"
                  >
                    <PlusCircle className="h-6 w-6 text-primary" />
                    Add New Widget
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  System Status
                </CardTitle>
                <CardDescription>Current system health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      API Status
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200"
                    >
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Gemini API
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200"
                    >
                      Connected
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      Hugging Face API
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200"
                    >
                      Error
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      Database
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200"
                    >
                      Connected
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Check System Status
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Configuration Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Widget Configuration
                </CardTitle>
                <CardDescription>
                  Customize your chat widget appearance and behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Theme:</span>
                    <Badge>Modern Dark</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Position:</span>
                    <span className="text-sm font-medium">Bottom Right</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-open:</span>
                    <span className="text-sm font-medium">After 5s</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/widget" className="w-full">
                  <Button variant="outline" className="w-full">
                    Configure Widget
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Context Rules
                </CardTitle>
                <CardDescription>
                  Manage AI response rules and context settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Rules:</span>
                    <Badge>2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Default Context:</span>
                    <span className="text-sm font-medium">General</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Updated:</span>
                    <span className="text-sm font-medium">Today</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/context-rules" className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Rules
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Knowledge Base
                </CardTitle>
                <CardDescription>
                  Manage your AI's knowledge sources and documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Documents:</span>
                    <Badge>24</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">FAQ Entries:</span>
                    <span className="text-sm font-medium">56</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Updated:</span>
                    <span className="text-sm font-medium">Yesterday</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/knowledge" className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Knowledge
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Notifications</span>
                <Button variant="outline" size="sm">
                  Mark all as read
                </Button>
              </CardTitle>
              <CardDescription>
                System alerts and important updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex gap-3">
                        {notification.type === "success" && (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        )}
                        {notification.type === "warning" && (
                          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        )}
                        {notification.type === "error" && (
                          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        {notification.type === "info" && (
                          <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-medium">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Bell className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      You're all caught up! No new notifications at this time.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>AI Models Status</CardTitle>
              <CardDescription>
                Performance metrics and availability of AI models
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Gemini Pro</h3>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Response Time</span>
                      <span>0.9s avg</span>
                    </div>
                    <Progress value={45} className="h-1" />

                    <div className="flex justify-between text-xs">
                      <span>Usage</span>
                      <span>68% of quota</span>
                    </div>
                    <Progress value={68} className="h-1" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">
                      Hugging Face - Mistral
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200"
                    >
                      Error
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Response Time</span>
                      <span>N/A</span>
                    </div>
                    <Progress value={0} className="h-1" />

                    <div className="flex justify-between text-xs">
                      <span>Usage</span>
                      <span>0% of quota</span>
                    </div>
                    <Progress value={0} className="h-1" />

                    <div className="text-xs text-red-500 mt-1">
                      Error: Failed to connect to API endpoint. Check
                      credentials.
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Hugging Face - BERT</h3>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Response Time</span>
                      <span>1.4s avg</span>
                    </div>
                    <Progress value={70} className="h-1" />

                    <div className="flex justify-between text-xs">
                      <span>Usage</span>
                      <span>32% of quota</span>
                    </div>
                    <Progress value={32} className="h-1" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Settings className="mr-2 h-4 w-4" />
                Configure AI Models
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </div>
    </DashboardLayout>
  );
}
