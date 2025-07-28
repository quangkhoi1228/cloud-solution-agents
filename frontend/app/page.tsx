'use client';

import { ChatSidebar } from '@/components/layout/chat-sidebar';
import { CodeEditor } from '@/components/layout/code-editor';
import { FileExplorer } from '@/components/layout/file-explorer';
import { RoleSelector } from '@/components/layout/role-selector';
import { TopBar } from '@/components/layout/top-bar';
import { useAppStore } from '@/stores/app-store';
import { useEffect } from 'react';

export default function CodeEditorInterface() {
  const {
    showChat,
    showFileExplorer,
    setCloudSolutionState,
    cloudSolutionState,
  } = useAppStore();

  useEffect(() => {
    const es = new EventSource('/api/stream_chat');
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('Received:', data);
      setCloudSolutionState(data);
    };
    es.onerror = (err) => {
      console.error('SSE error:', err);
      es.close();
    };

    return () => es.close();
  }, []);

  useEffect(() => {
    // console.log('cloudSolutionState', cloudSolutionState);
  }, [cloudSolutionState]);

  return (
    <div className='h-screen bg-gray-900 text-white flex flex-col'>
      <TopBar />
      <RoleSelector />

      <div className='flex flex-1 overflow-hidden'>
        {showChat && <ChatSidebar />}
        {showFileExplorer && <FileExplorer />}
        <CodeEditor />
      </div>
    </div>
  );
}
