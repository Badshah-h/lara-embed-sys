"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clipboard, Check, Code, Globe } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmbedCodeGeneratorProps {
  widgetId?: string;
  domain?: string;
}

export default function EmbedCodeGenerator({
  widgetId = "chat-widget-123",
  domain = "https://example.com",
}: EmbedCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState("script");

  const scriptCode = `<script src="${domain}/widget/${widgetId}.js" async></script>`;
  const iframeCode = `<iframe src="${domain}/widget/${widgetId}" width="350" height="500" frameborder="0"></iframe>`;
  const npmCode = `npm install @example/chat-widget\n\nimport { ChatWidget } from '@example/chat-widget';\n\nfunction App() {\n  return <ChatWidget widgetId="${widgetId}" />;\n}`;

  const getCodeForTab = () => {
    switch (selectedTab) {
      case "script":
        return scriptCode;
      case "iframe":
        return iframeCode;
      case "npm":
        return npmCode;
      default:
        return scriptCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeForTab());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-3xl bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Embed Code Generator
        </CardTitle>
        <CardDescription>
          Generate the code to embed your chat widget on your website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="domain">Domain</Label>
            <Input id="domain" value={domain} className="max-w-xs" readOnly />
          </div>
          <div className="flex items-center gap-4">
            <Code className="h-5 w-5 text-muted-foreground" />
            <Label htmlFor="widgetId">Widget ID</Label>
            <Input
              id="widgetId"
              value={widgetId}
              className="max-w-xs"
              readOnly
            />
          </div>
        </div>

        <Tabs defaultValue="script" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="script">Script Tag</TabsTrigger>
            <TabsTrigger value="iframe">iFrame</TabsTrigger>
            <TabsTrigger value="npm">NPM Package</TabsTrigger>
          </TabsList>

          <TabsContent value="script" className="space-y-4">
            <Alert className="bg-muted">
              <AlertDescription>
                Add this script tag to the{" "}
                <code className="bg-muted-foreground/20 px-1 rounded">
                  &lt;head&gt;
                </code>{" "}
                or{" "}
                <code className="bg-muted-foreground/20 px-1 rounded">
                  &lt;body&gt;
                </code>{" "}
                of your HTML.
              </AlertDescription>
            </Alert>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">{scriptCode}</code>
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="iframe" className="space-y-4">
            <Alert className="bg-muted">
              <AlertDescription>
                Use this iframe code to embed the chat widget in your website.
                You can adjust the width and height as needed.
              </AlertDescription>
            </Alert>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">{iframeCode}</code>
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="npm" className="space-y-4">
            <Alert className="bg-muted">
              <AlertDescription>
                Install our NPM package and use the React component in your
                application.
              </AlertDescription>
            </Alert>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm whitespace-pre">{npmCode}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => window.open(`${domain}/docs/integration`, "_blank")}
        >
          View Documentation
        </Button>
        <Button onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Clipboard className="mr-2 h-4 w-4" /> Copy Code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
