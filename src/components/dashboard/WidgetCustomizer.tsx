"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  CornerRightDown,
  CornerLeftDown,
  Palette,
  Settings,
  MessageSquare,
  Save,
  RotateCcw,
  Code,
} from "lucide-react";
import DashboardLayout from "./DashboardLayout";

interface WidgetCustomizerProps {
  onSave?: (settings: WidgetSettings) => void;
  initialSettings?: WidgetSettings;
}

interface WidgetSettings {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  size: {
    width: number;
    height: number;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
  };
  behavior: {
    autoOpen: boolean;
    autoOpenDelay: number;
    soundEffects: boolean;
    showNotifications: boolean;
  };
  content: {
    welcomeMessage: string;
    botName: string;
    inputPlaceholder: string;
  };
  borderRadius: number;
  chatIconSize: number;
}

const defaultSettings: WidgetSettings = {
  colors: {
    primary: "#4f46e5",
    secondary: "#10b981",
    background: "#ffffff",
    text: "#1f2937",
  },
  position: "bottom-right",
  size: {
    width: 350,
    height: 500,
  },
  typography: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  behavior: {
    autoOpen: false,
    autoOpenDelay: 5,
    soundEffects: true,
    showNotifications: true,
  },
  content: {
    welcomeMessage: "Hello! How can I help you today?",
    botName: "AI Assistant",
    inputPlaceholder: "Type your message here...",
  },
  borderRadius: 8,
  chatIconSize: 40,
};

const colorOptions = [
  { color: "#4f46e5", class: "bg-[#4f46e5]" },
  { color: "#22c55e", class: "bg-[#22c55e]" },
  { color: "#ef4444", class: "bg-[#ef4444]" },
  { color: "#f59e0b", class: "bg-[#f59e0b]" },
  { color: "#6366f1", class: "bg-[#6366f1]" },
  { color: "#000000", class: "bg-black" },
  { color: "#7c3aed", class: "bg-[#7c3aed]" },
];

const WidgetCustomizer: React.FC<WidgetCustomizerProps> = ({
  onSave,
  initialSettings = defaultSettings,
}) => {
  const [settings, setSettings] = useState<WidgetSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState("appearance");

  const handleSettingsChange = (path: string[], value: any) => {
    setSettings((prevSettings) => {
      const newSettings = { ...prevSettings };
      let current: any = newSettings;

      // Navigate to the nested property
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }

      // Set the value
      current[path[path.length - 1]] = value;
      return newSettings;
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(settings);
    }
  };

  const handleReset = () => {
    setSettings(initialSettings);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Widget Configurator
          </h1>
          <p className="text-muted-foreground mt-1">
            Customize how your chat widget looks and behaves
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Settings Panel */}
          <div className="w-full lg:w-1/2" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WidgetCustomizer;
