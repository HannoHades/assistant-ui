"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { Thread } from "@/components/assistant-ui/thread";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { frontendTool } from "assistant-stream/core/tool/tool-types";
import z from "zod";
import { createToolbox } from "@assistant-ui/react/model-context/tool";
import { BackendTools } from "./api/chat/route";

const toolbox = createToolbox<BackendTools>()({
  hi: frontendTool({
    parameters: z.object({
      name: z.string(),
    }),
    execute: async (args) => {
      return `Other: ${args.name}`;
    },
    render: (args) => <div>Hi: {JSON.stringify(args)} confirmed</div>,
    // CG TODO: Add disable frontend rendering.
  }),
  weather: {
    render: (args) => <div>Weather: {args.weather}</div>,
  },
  day: {
    render: (args) => <div>Day: {args.day}</div>,
  },
});

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime} toolbox={toolbox}>
      <div className="grid h-dvh gap-x-2 px-4 py-4">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
