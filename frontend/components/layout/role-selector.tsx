"use client"

import type React from "react"

import { Users, Lightbulb, ClipboardList, DollarSign, FileText, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAppStore } from "@/stores/app-store"

interface Role {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  avatar: string
}

const roles: Role[] = [
  {
    id: "pre-sale",
    name: "Pre-Sale",
    icon: <Users className="w-3 h-3" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500",
    avatar: "PS",
  },
  {
    id: "solution-architect",
    name: "Solution Architect",
    icon: <Lightbulb className="w-3 h-3" />,
    color: "text-purple-400",
    bgColor: "bg-purple-500",
    avatar: "SA",
  },
  {
    id: "project-manager",
    name: "Project Manager",
    icon: <ClipboardList className="w-3 h-3" />,
    color: "text-green-400",
    bgColor: "bg-green-500",
    avatar: "PM",
  },
  {
    id: "sale",
    name: "Sale",
    icon: <DollarSign className="w-3 h-3" />,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500",
    avatar: "SL",
  },
  {
    id: "document-manager",
    name: "Document Manager",
    icon: <FileText className="w-3 h-3" />,
    color: "text-orange-400",
    bgColor: "bg-orange-500",
    avatar: "DM",
  },
]

export function RoleSelector() {
  const { activeRole, loadingRole, switchRole } = useAppStore()

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
      <div className="flex items-center justify-center gap-4 max-w-4xl mx-auto">
        {roles.map((role) => {
          const isActive = activeRole === role.id
          const isLoading = loadingRole === role.id
          const isDimmed = activeRole && activeRole !== role.id && !isLoading

          return (
            <div
              key={role.id}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300
                ${isActive ? "bg-gray-700 shadow-sm" : "hover:bg-gray-750"}
                ${isDimmed ? "opacity-40" : "opacity-100"}
              `}
              onClick={() => switchRole(role.id)}
            >
              <div className="relative">
                <Avatar className="w-6 h-6">
                  <AvatarFallback
                    className={`${isActive ? role.bgColor : "bg-gray-600"} text-white text-xs font-medium`}
                  >
                    {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : role.avatar}
                  </AvatarFallback>
                </Avatar>
                {isActive && !isLoading && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-gray-800" />
                )}
              </div>

              <div>
                <div
                  className={`
                  text-xs font-medium transition-colors duration-300
                  ${isActive ? "text-white" : "text-gray-300"}
                  ${isDimmed ? "text-gray-500" : ""}
                `}
                >
                  {role.name}
                </div>
                {isLoading && <div className="text-xs text-blue-400">Working...</div>}
                {isActive && !isLoading && <div className="text-xs text-green-400">Active</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
