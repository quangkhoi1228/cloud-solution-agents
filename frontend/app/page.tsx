"use client"

import { TopBar } from "@/components/layout/top-bar"
import { RoleSelector } from "@/components/layout/role-selector"
import { ChatSidebar } from "@/components/layout/chat-sidebar"
import { FileExplorer } from "@/components/layout/file-explorer"
import { CodeEditor } from "@/components/layout/code-editor"
import { useAppStore } from "@/stores/app-store"

export default function CodeEditorInterface() {
  const { showChat, showFileExplorer } = useAppStore()

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <TopBar />
      <RoleSelector />

      <div className="flex flex-1 overflow-hidden">
        {showChat && <ChatSidebar />}
        {showFileExplorer && <FileExplorer />}
        <CodeEditor />
      </div>
    </div>
  )
}
