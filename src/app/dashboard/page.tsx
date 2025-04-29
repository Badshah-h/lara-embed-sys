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
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-1">
              Dashboard overview and quick actions
            </p>
          </div>
          <Button>
            View Live Widget <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Conversations
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Loading...</div>
              <p className="text-xs text-muted-foreground">Fetching data...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Loading...</div>
              <p className="text-xs text-muted-foreground">Fetching data...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Response Rate
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Loading...</div>
              <p className="text-xs text-muted-foreground">Fetching data...</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Response Time
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Loading...</div>
              <p className="text-xs text-muted-foreground">Fetching data...</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Settings className="h-6 w-6" />
                  Configure Widget
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <FileText className="h-6 w-6" />
                  Edit Context Rules
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Code className="h-6 w-6" />
                  Get Embed Code
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Status</span>
                  <span className="text-sm font-medium">Checking...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gemini API</span>
                  <span className="text-sm font-medium">Checking...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hugging Face API</span>
                  <span className="text-sm font-medium">Checking...</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <span className="text-sm font-medium">Checking...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Widget Configuration</CardTitle>
              <CardDescription>
                Customize your chat widget appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Theme:</span>
                  <span className="text-sm font-medium">Modern Dark</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Position:</span>
                  <span className="text-sm font-medium">Bottom Right</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-open:</span>
                  <span className="text-sm font-medium">After 5s</span>
                </div>
                <Link href="/dashboard/widget">
                  <Button variant="outline" className="w-full mt-2">
                    Configure Widget
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Context Rules</CardTitle>
              <CardDescription>
                Manage AI response rules and context settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Rules:</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Default Context:</span>
                  <span className="text-sm font-medium">General</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Updated:</span>
                  <span className="text-sm font-medium">Today</span>
                </div>
                <Link href="/dashboard/context-rules">
                  <Button variant="outline" className="w-full mt-2">
                    Manage Rules
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Manage your AI's knowledge sources and documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Documents:</span>
                  <span className="text-sm font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">FAQ Entries:</span>
                  <span className="text-sm font-medium">56</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Updated:</span>
                  <span className="text-sm font-medium">Yesterday</span>
                </div>
                <Link href="/dashboard/knowledge">
                  <Button variant="outline" className="w-full mt-2">
                    Manage Knowledge
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
