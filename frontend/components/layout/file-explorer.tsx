'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  MoreHorizontal,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/stores/app-store';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  isOpen?: boolean;
}

export function FileExplorer() {
  const { selectedFile, setSelectedFile, cloudSolutionState } = useAppStore();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['shadcn-ui', 'src'])
  );

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const fileStructure: FileNode[] = [];

  if (cloudSolutionState.user_requirements) {
    fileStructure.push({ name: 'user_requirements.md', type: 'file' });
  }
  if (cloudSolutionState.solution_architect_report) {
    fileStructure.push({ name: 'solution_architect_report.md', type: 'file' });
  }
  if (cloudSolutionState.project_manager_report) {
    fileStructure.push({ name: 'project_manager_report.md', type: 'file' });
  }
  if (cloudSolutionState.sale_report) {
    fileStructure.push({ name: 'sale_report.md', type: 'file' });
  }
  if (cloudSolutionState.delivery_manager_report) {
    fileStructure.push({ name: 'delivery_manager_report.md', type: 'file' });
  }
  if (cloudSolutionState.final_proposal) {
    fileStructure.push({ name: 'final_proposal.md', type: 'file' });
  }

  const renderFileTree = (nodes: FileNode[], depth = 0, parentPath = '') => {
    return nodes.map((node) => {
      const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
      const isExpanded = expandedFolders.has(currentPath);

      return (
        <div key={currentPath}>
          <div
            className={`flex items-center gap-1 py-1 px-2 hover:bg-gray-800 cursor-pointer text-sm ${
              selectedFile === node.name ? 'bg-gray-700' : ''
            }`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={() => {
              if (node.type === 'folder') {
                toggleFolder(currentPath);
              } else {
                setSelectedFile(node.name);
              }
            }}
          >
            {node.type === 'folder' ? (
              <>
                {isExpanded ? (
                  <ChevronDown className='w-4 h-4 text-gray-400' />
                ) : (
                  <ChevronRight className='w-4 h-4 text-gray-400' />
                )}
                {isExpanded ? (
                  <FolderOpen className='w-4 h-4 text-blue-400' />
                ) : (
                  <Folder className='w-4 h-4 text-blue-400' />
                )}
              </>
            ) : (
              <>
                {/* <div className='w-4' /> */}
                <File className='w-4 h-4 text-gray-400' />
              </>
            )}
            <span className='text-gray-300'>{node.name}</span>
          </div>
          {node.type === 'folder' && isExpanded && node.children && (
            <div>{renderFileTree(node.children, depth + 1, currentPath)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div className='w-64 bg-gray-850 border-r border-gray-700 flex flex-col'>
      <div className='h-[49px] flex items-center  p-3 border-b border-gray-700'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <File className='w-4 h-4 text-blue-400' />
            <span className='text-sm font-medium'>File Explorer</span>
          </div>
          {/* <div className="flex items-center gap-1">
            <Avatar className="w-5 h-5">
              <AvatarFallback className="bg-blue-500 text-white text-xs">A</AvatarFallback>
            </Avatar>
            <span className="text-xs text-blue-400">Alex</span>
          </div> */}
        </div>
        {/* <div className="flex items-center gap-2 text-xs text-gray-400">
          <File className="w-3 h-3" />
          <span>Files</span>
          <MoreHorizontal className="w-3 h-3 ml-auto" />
        </div> */}
      </div>

      {/* <div className="p-2 border-b border-gray-700">
        <div className="text-xs text-gray-400 mb-2">Current chat files</div>
      </div> */}

      <ScrollArea className='flex-1'>
        <div className='p-2'>{renderFileTree(fileStructure)}</div>
      </ScrollArea>

      <div className='p-2 border-t border-gray-700'>
        <div className='text-xs text-gray-400 flex items-center gap-2'>
          <span>shadcn-ui</span>
          <span>/</span>
          <span>src</span>
          <span>/</span>
          <span className='text-white'>{selectedFile}</span>
        </div>
      </div>
    </div>
  );
}

// const fileStructure: FileNode[] = [
//   // {
//   // name: 'project_folder',
//   // type: 'folder',
//   // isOpen: true,
//   // children: [

//   // { name: ".mgx", type: "folder" },
//   // {
//   //   name: "public",
//   //   type: "folder",
//   //   children: [],
//   // },
//   // {
//   //   name: "src",
//   //   type: "folder",
//   //   isOpen: true,
//   //   children: [
//   //     {
//   //       name: "components",
//   //       type: "folder",
//   //       children: [],
//   //     },
//   //     {
//   //       name: "hooks",
//   //       type: "folder",
//   //       children: [],
//   //     },
//   //     {
//   //       name: "lib",
//   //       type: "folder",
//   //       children: [],
//   //     },
//   //     {
//   //       name: "pages",
//   //       type: "folder",
//   //       children: [
//   //         { name: "App.css", type: "file" },
//   //         { name: "App.tsx", type: "file" },
//   //         { name: "index.css", type: "file" },
//   //         { name: "main.tsx", type: "file" },
//   //         { name: "vite-env.d.ts", type: "file" },
//   //       ],
//   //     },
//   //   ],
//   // },
//   // ],
//   // },
//   { name: 'user_requirements.md', type: 'file' },
//   { name: 'solution_architect_report.md', type: 'file' },
//   { name: 'project_manager_report.md', type: 'file' },
//   { name: 'sale_report.md', type: 'file' },
//   { name: 'delivery_manager_report.md', type: 'file' },
//   { name: 'final_proposal.md', type: 'file' },
// ];
