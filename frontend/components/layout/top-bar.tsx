'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/app-store';
import { FolderOpen, MessageSquare, Settings, Share } from 'lucide-react';
import Image from 'next/image';

export function TopBar() {
  const { showChat, showFileExplorer, setShowChat, setShowFileExplorer } =
    useAppStore();

  return (
    <div className='flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <Image
            src='/logo.png'
            alt='logo'
            width={32}
            height={32}
            className='rounded-sm'
          />
          <span className='text-sm font-medium'>Cloud Solution Agents</span>
          <Badge variant='secondary' className='text-xs'>
            Beta
          </Badge>
        </div>

        {/* <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Jul 26, 2025</span>
        </div> */}
      </div>

      <div className='flex items-center gap-2'>
        {/* Panel Toggle Buttons */}
        <Button
          variant={showChat ? 'default' : 'ghost'}
          size='sm'
          onClick={() => setShowChat(!showChat)}
          className='text-xs h-8'
        >
          <MessageSquare className='w-4 h-4 mr-1' />
          Chat
        </Button>

        <Button
          variant={showFileExplorer ? 'default' : 'ghost'}
          size='sm'
          onClick={() => setShowFileExplorer(!showFileExplorer)}
          className='text-xs h-8'
        >
          <FolderOpen className='w-4 h-4 mr-1' />
          Files
        </Button>

        <div className='w-px h-4 bg-gray-600 mx-2' />

        <Button variant='ghost' size='sm'>
          <Settings className='w-4 h-4' />
        </Button>
        {/* <Button variant="ghost" size="sm">
          Supabase
        </Button> */}
        <Button size='sm' className='bg-blue-600 hover:bg-blue-700'>
          <Share className='w-4 h-4 mr-2' />
          Share
        </Button>
      </div>
    </div>
  );
}
