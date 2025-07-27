import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface Message {
  id: number
  type: "user" | "system"
  content: string
  timestamp: string
  avatar: string
  name: string
  role?: string
  roleColor?: string
}

interface AppState {
  // UI State
  showChat: boolean
  showFileExplorer: boolean
  activeRole: string | null
  loadingRole: string | null
  selectedFile: string
  editorTab: "preview" | "raw"

  // Chat State
  messages: Message[]
  currentMessage: string

  // Actions
  setShowChat: (show: boolean) => void
  setShowFileExplorer: (show: boolean) => void
  setActiveRole: (roleId: string | null) => void
  setLoadingRole: (roleId: string | null) => void
  setSelectedFile: (fileName: string) => void
  setEditorTab: (tab: "preview" | "raw") => void
  setCurrentMessage: (message: string) => void
  addMessage: (message: Omit<Message, "id">) => void
  sendMessage: () => void

  // Async Actions
  switchRole: (roleId: string) => Promise<void>
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "user",
    content: "Tôi muốn tạo một game 2048 bằng React. Bạn có thể giúp tôi không?",
    timestamp: "10:30 AM",
    avatar: "U",
    name: "You",
  },
  {
    id: 2,
    type: "system",
    role: "Solution Architect",
    content:
      "Tôi sẽ giúp bạn thiết kế kiến trúc cho game 2048. Chúng ta sẽ cần các component chính: GameBoard, Tile, GameLogic và ScoreBoard.",
    timestamp: "10:31 AM",
    avatar: "SA",
    name: "Alex",
    roleColor: "bg-purple-500",
  },
  {
    id: 3,
    type: "system",
    role: "Project Manager",
    content:
      "Tôi đề xuất chia dự án thành 3 sprint: Sprint 1 - UI cơ bản, Sprint 2 - Game logic, Sprint 3 - Animation và polish.",
    timestamp: "10:32 AM",
    avatar: "PM",
    name: "Sarah",
    roleColor: "bg-green-500",
  },
  {
    id: 4,
    type: "user",
    content: "Sounds great! Hãy bắt đầu với Sprint 1 nhé.",
    timestamp: "10:33 AM",
    avatar: "U",
    name: "You",
  },
  {
    id: 5,
    type: "system",
    role: "Pre-Sale",
    content:
      "Tôi có thể cung cấp template và boilerplate code để bạn bắt đầu nhanh hơn. Bạn có muốn sử dụng TypeScript không?",
    timestamp: "10:34 AM",
    avatar: "PS",
    name: "Mike",
    roleColor: "bg-blue-500",
  },
  {
    id: 6,
    type: "user",
    content: "Có, TypeScript sẽ tốt hơn. Còn về styling thì sao?",
    timestamp: "10:35 AM",
    avatar: "U",
    name: "You",
  },
  {
    id: 7,
    type: "system",
    role: "Solution Architect",
    content: "Tôi recommend sử dụng Tailwind CSS cho styling. Nó sẽ giúp bạn tạo UI nhanh và responsive.",
    timestamp: "10:36 AM",
    avatar: "SA",
    name: "Alex",
    roleColor: "bg-purple-500",
  },
  {
    id: 8,
    type: "system",
    role: "Document Manager",
    content: "Tôi sẽ chuẩn bị documentation và setup guide cho project này. Bạn có cần README chi tiết không?",
    timestamp: "10:37 AM",
    avatar: "DM",
    name: "Emma",
    roleColor: "bg-orange-500",
  },
]

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial State
      showChat: true,
      showFileExplorer: true,
      activeRole: "solution-architect",
      loadingRole: null,
      selectedFile: "App.tsx",
      editorTab: "raw",
      messages: initialMessages,
      currentMessage: "",

      // UI Actions
      setShowChat: (show) => set({ showChat: show }),
      setShowFileExplorer: (show) => set({ showFileExplorer: show }),
      setActiveRole: (roleId) => set({ activeRole: roleId }),
      setLoadingRole: (roleId) => set({ loadingRole: roleId }),
      setSelectedFile: (fileName) => set({ selectedFile: fileName }),
      setEditorTab: (tab) => set({ editorTab: tab }),

      // Chat Actions
      setCurrentMessage: (message) => set({ currentMessage: message }),
      addMessage: (message) => {
        const messages = get().messages
        const newMessage = {
          ...message,
          id: Math.max(...messages.map((m) => m.id), 0) + 1,
        }
        set({ messages: [...messages, newMessage] })
      },
      sendMessage: () => {
        const { currentMessage, addMessage } = get()
        if (currentMessage.trim()) {  
          const now = new Date()
          const timestamp = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })

          addMessage({
            type: "user",
            content: currentMessage,
            timestamp,
            avatar: "U",
            name: "You",
          })

          set({ currentMessage: "" })
        }
      },

      setMessagesFromData: (data: Message[]) => {
        set({ messages: data })
      },

      // Async Actions
      switchRole: async (roleId) => {
        const { activeRole, setLoadingRole, setActiveRole } = get()

        if (activeRole === roleId) {
          setActiveRole(null)
          return
        }

        setLoadingRole(roleId)

        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setLoadingRole(null)
        setActiveRole(roleId)
      },
    }),
    {
      name: "app-store",
    },
  ),
)
