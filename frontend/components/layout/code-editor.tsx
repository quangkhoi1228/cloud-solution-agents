"use client"

import { File, MoreHorizontal, Eye, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/stores/app-store"

const codeContent = `import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import BauCuaGame from './pages/BauCuaGame';
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/2048" element={<Index />} />
          <Route path="/" element={<BauCuaGame />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;`

export function CodeEditor() {
  const { selectedFile, editorTab, setEditorTab } = useAppStore()

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-full">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2 text-sm">
          <File className="w-4 h-4 text-blue-400" />
          <span>{selectedFile}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Compact Tab Switcher */}
      <div className="border-b border-gray-700 px-4 py-1.5 bg-gray-800">
        <div className="flex items-center gap-0.5 bg-gray-700 rounded-md p-0.5 w-fit">
          <button
            onClick={() => setEditorTab("raw")}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200
              ${
                editorTab === "raw"
                  ? "bg-gray-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-650"
              }
            `}
          >
            <Code className="w-3 h-3" />
            Raw
          </button>
          <button
            onClick={() => setEditorTab("preview")}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200
              ${
                editorTab === "preview"
                  ? "bg-gray-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-300 hover:bg-gray-650"
              }
            `}
          >
            <Eye className="w-3 h-3" />
            Preview
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {editorTab === "raw" ? (
          <div className="h-full relative">
            <div className="absolute inset-0 font-mono text-sm">
              <div className="flex h-full">
                <div className="w-12 bg-gray-800 border-r border-gray-700 py-4 flex-shrink-0">
                  {codeContent.split("\n").map((_, index) => (
                    <div key={index} className="px-2 text-right text-gray-500 text-xs leading-6">
                      {index + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  <pre className="text-gray-300 leading-6">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: codeContent
                          .replace(/import/g, '<span style="color: #ff79c6">import</span>')
                          .replace(/from/g, '<span style="color: #ff79c6">from</span>')
                          .replace(/const/g, '<span style="color: #ff79c6">const</span>')
                          .replace(/export/g, '<span style="color: #ff79c6">export</span>')
                          .replace(/default/g, '<span style="color: #ff79c6">default</span>')
                          .replace(/'[^']*'/g, '<span style="color: #f1fa8c">$&</span>')
                          .replace(/{[^}]*}/g, '<span style="color: #8be9fd">$&</span>')
                          .replace(/\/\/.*$/gm, '<span style="color: #6272a4">$&</span>'),
                      }}
                    />
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-white text-black p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Preview Mode</h1>
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">React Application Preview</h2>
                <p className="text-gray-700 mb-4">
                  This is a preview of your React application. The current file{" "}
                  <code className="bg-gray-200 px-2 py-1 rounded">{selectedFile}</code> contains:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>React Query setup for data fetching</li>
                  <li>React Router for navigation</li>
                  <li>Tooltip provider for UI components</li>
                  <li>Toast notifications system</li>
                  <li>Multiple route definitions</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Routes</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>/ → BauCuaGame</li>
                    <li>/2048 → Index</li>
                    <li>* → NotFound</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Features</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>Query Client</li>
                    <li>Toast System</li>
                    <li>Tooltips</li>
                    <li>Routing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
