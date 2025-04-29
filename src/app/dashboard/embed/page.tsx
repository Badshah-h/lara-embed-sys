import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EmbedCodeGenerator from "@/components/dashboard/EmbedCodeGenerator";

export default function EmbedCodePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Embed Code</h1>
          <p className="text-muted-foreground mt-1">
            Generate code to embed your chat widget on your website
          </p>
        </div>

        <div className="flex justify-center">
          <EmbedCodeGenerator
            widgetId="chat-widget-123"
            domain="https://chat-admin.example.com"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
