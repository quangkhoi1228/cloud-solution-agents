'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppStore } from '@/stores/app-store';
import { Loader2 } from 'lucide-react';
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
      <div className='flex items-center justify-center gap-4  mx-auto'>
        {roles.map((role) => {
          const isActive = activeRole === role.id;
          const isLoading = loadingRole === role.id;
          const isDimmed = activeRole && activeRole !== role.id && !isLoading;

          return (
            <div
              key={role.id}
              className={`
                flex w-45 items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300 border border-gray-700
                ${isActive ? 'bg-gray-600 shadow-sm' : 'bg-gray-900'}
                ${isDimmed ? 'opacity-100' : 'opacity-100'}
              `}
              onClick={() => switchRole(role.id)}
            >
              <div className='relative'>
                <Avatar className='w-8 h-8'>
                  <AvatarFallback
                    className={`${
                      isActive ? role.bgColor : 'bg-slate-300'
                    } text-white text-xs font-medium`}
                  >
                    {isLoading ? (
                      <Loader2 className='w-3 h-3 animate-spin' />
                    ) : (
                      <Image
                        src={role.avatar}
                        alt={role.name}
                        width={42}
                        height={42}
                      />
                    )}
                  </AvatarFallback>
                </Avatar>
                {isActive && !isLoading && (
                  <div className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-gray-800' />
                )}
              </div>

              <div>
                <div
                  className={`
                  text-xs font-medium transition-colors duration-300
                  ${isActive ? 'text-white' : 'text-neutral-200'}
                  ${isDimmed ? 'text-gray-500' : ''}
                `}
                >
                  {role.name}
                </div>
                {isLoading && (
                  <div className='text-xs text-blue-400'>Working...</div>
                )}
                {isActive ? (
                  <div className='text-xs text-green-400'>Active</div>
                ) : (
                  <div className='text-xs text-gray-400'>Waiting</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
