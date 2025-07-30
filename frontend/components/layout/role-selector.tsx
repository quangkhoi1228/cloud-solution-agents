'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppStore } from '@/stores/app-store';
import { Loader2, Sparkles, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';

interface Role {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  avatar: string;
}

export const roles: Role[] = [
  {
    id: 'Pre-Sale',
    name: 'Pre-Sale',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    avatar: '/avatar/avatar1.jpg',
  },
  {
    id: 'Solution-Architect',
    name: 'Solution Architect',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    avatar: '/avatar/avatar3.jpg',
  },
  {
    id: 'Project-Manager',
    name: 'Project Manager',
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    avatar: '/avatar/avatar2.jpg',
  },
  {
    id: 'Sale',
    name: 'Sale',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500',
    avatar: '/avatar/avatar4.jpg',
  },
  {
    id: 'Document-Manager',
    name: 'Document Manager',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    avatar: '/avatar/avatar6.jpg',
  },
  {
    id: 'Delivery-Manager',
    name: 'Delivery Manager',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    avatar: '/avatar/avatar5.jpg',
  },
];

export function RoleSelector() {
  const { activeRole, loadingRole, switchRole } = useAppStore();

  return (
    <div className='bg-gray-800 border-b border-gray-700 px-4 py-2'>
      <div className='flex items-center justify-center gap-4 mx-auto'>
        {roles.map((role) => {
          const isActive = activeRole === role.id;
          const isLoading = loadingRole === role.id;
          const isDimmed = activeRole && activeRole !== role.id && !isLoading;

          return (
            <div
              key={role.id}
              className={`
                group flex w-56 items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer 
                transition-all duration-500 ease-out border relative overflow-hidden
                ${isActive 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-600 shadow-lg shadow-gray-900/50 border-gray-500 scale-105' 
                  : 'bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-600 hover:scale-102'
                }
                ${isDimmed ? 'opacity-60' : 'opacity-100'}
              `}
              onClick={() => switchRole(role.id)}
            >
              {/* Animated background glow for active role */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 animate-pulse rounded-md" />
              )}
              
              {/* Sparkle effect for active role */}
              {isActive && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-ping" />
                </div>
              )}

              <div className='relative z-10'>
                <Avatar className={`w-8 h-8 transition-all duration-300 ${isActive ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-gray-800' : ''}`}>
                  <AvatarFallback
                    className={`${
                      isActive ? role.bgColor : 'bg-slate-300'
                    } text-white text-xs font-medium transition-all duration-300`}
                  >
                    {isLoading ? (
                      <Loader2 className='w-3 h-3 animate-spin' />
                    ) : (
                      <Image
                        src={role.avatar}
                        alt={role.name}
                        width={42}
                        height={42}
                        className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}
                      />
                    )}
                  </AvatarFallback>
                </Avatar>
                
                {/* Status indicator */}
                {isActive && !isLoading && (
                  <div className='absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse' />
                )}
                {isLoading && (
                  <div className='absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-400 rounded-full border-2 border-gray-800 animate-ping' />
                )}
              </div>

              <div className='z-10'>
                <div
                  className={`
                    text-xs font-medium transition-all duration-300
                    ${isActive ? 'text-white font-semibold' : 'text-neutral-200'}
                    ${isDimmed ? 'text-gray-500' : ''}
                  `}
                >
                  {role.name}
                </div>
                
                {/* Status text with icons */}
                <div className="flex items-center gap-1">
                  {isLoading ? (
                    <>
                      <Loader2 className='w-3 h-3 text-blue-400 animate-spin' />
                      <div className='text-xs text-blue-400 animate-pulse'>Working...</div>
                    </>
                  ) : isActive ? (
                    <>
                      <CheckCircle className='w-3 h-3 text-green-400' />
                      <div className='text-xs text-green-400 font-medium'>Active</div>
                    </>
                  ) : (
                    <>
                      <Clock className='w-3 h-3 text-gray-400' />
                      <div className='text-xs text-gray-400'>Waiting</div>
                    </>
                  )}
                </div>
              </div>

              {/* Hover effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                ${isActive ? 'opacity-20' : ''}
              `} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
