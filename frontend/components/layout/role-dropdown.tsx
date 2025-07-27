"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, Users, Lightbulb, ClipboardList, DollarSign, FileText, Truck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Role {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

const roles: Role[] = [
  {
    id: "pre-sale",
    name: "Pre-Sale",
    icon: <Users className="w-4 h-4" />,
    color: "text-blue-400",
  },
  {
    id: "solution-architect",
    name: "Solution Architect",
    icon: <Lightbulb className="w-4 h-4" />,
    color: "text-purple-400",
  },
  {
    id: "project-manager",
    name: "Project Manager",
    icon: <ClipboardList className="w-4 h-4" />,
    color: "text-green-400",
  },
  {
    id: "sale",
    name: "Sale",
    icon: <DollarSign className="w-4 h-4" />,
    color: "text-yellow-400",
  },
  {
    id: "document-manager",
    name: "Document Manager",
    icon: <FileText className="w-4 h-4" />,
    color: "text-orange-400",
  },
  {
    id: "delivery-manager",
    name: "Delivery Manager",
    icon: <Truck className="w-4 h-4" />,
    color: "text-red-400",
  },
]

interface RoleDropdownProps {
  activeRole: string | null
  onRoleChange: (roleId: string | null) => void
}

export function RoleDropdown({ activeRole, onRoleChange }: RoleDropdownProps) {
  const [loadingRole, setLoadingRole] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleRoleClick = async (roleId: string) => {
    if (activeRole === roleId) {
      onRoleChange(null)
      setOpen(false)
      return
    }

    setLoadingRole(roleId)
    setOpen(false)

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoadingRole(null)
    onRoleChange(roleId)
  }

  const activeRoleData = roles.find((role) => role.id === activeRole)
  const isLoading = loadingRole !== null

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : activeRoleData ? (
            <>
              <span className={activeRoleData.color}>{activeRoleData.icon}</span>
              <span>{activeRoleData.name}</span>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </>
          ) : (
            <>
              <Users className="w-4 h-4" />
              <span>Select Role</span>
            </>
          )}
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => handleRoleClick(role.id)}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
              activeRole === role.id ? "bg-gray-700" : ""
            }`}
          >
            <span className={role.color}>{role.icon}</span>
            <span className="flex-1">{role.name}</span>
            {activeRole === role.id && <div className="w-2 h-2 bg-green-400 rounded-full" />}
          </DropdownMenuItem>
        ))}
        {activeRole && (
          <>
            <div className="border-t border-gray-600 my-1" />
            <DropdownMenuItem
              onClick={() => handleRoleClick(activeRole)}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer text-red-400"
            >
              <span>Clear Selection</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
