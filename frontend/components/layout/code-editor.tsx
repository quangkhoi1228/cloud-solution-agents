'use client';

import { useAppStore } from '@/stores/app-store';
import { Code, Eye, File } from 'lucide-react';
import mermaid from 'mermaid';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { MermaidDiagram } from '../ui/mermaid-diagram';
import ContentRevealPreview from '../ui/content-reveal-preview';

const readmeContent = `# ☁️ Cloud Solution Agents

👋 **Xin chào!**

Chào mừng bạn đến với **Cloud Solution Agent** – multi-agent system hỗ trợ bạn trong việc tư vấn, triển khai và lựa chọn giải pháp điện toán đám mây phù hợp trên FPT Smart Cloud.

## 🚀 Tính năng chính

### 1. Tư vấn giải pháp
- Phân tích yêu cầu của khách hàng
- Đề xuất kiến trúc phù hợp
- Tối ưu chi phí và hiệu suất

### 2. Triển khai tự động
- Tự động provisioning resources
- Configuration management
- Monitoring và alerting

### 3. Hỗ trợ 24/7
- Chatbot thông minh
- Knowledge base đầy đủ
- Escalation tự động
`;

// Initialize Mermaid with proper config
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
  },
});

export function CodeEditor() {
  // Local state instead of external store
  const [editorTab, setEditorTab] = useState<'raw' | 'preview'>('preview');

  const {
    selectedFile,
    cloudSolutionState,
    revealSettings,
    setRevealSettings,
  } = useAppStore();

  // Add local state to track file changes
  const [localRevealEnabled, setLocalRevealEnabled] = useState(false);
  const previousFileRef = useRef(selectedFile);

  // Handle file change to trigger reveal
  useEffect(() => {
    if (previousFileRef.current !== selectedFile && editorTab === 'preview') {
      // Enable reveal for new file
      setLocalRevealEnabled(true);

      // Disable reveal after animation completes
      const timer = setTimeout(() => {
        setLocalRevealEnabled(false);
      }, 5000); // 5 seconds for reveal animation

      return () => clearTimeout(timer);
    }
    previousFileRef.current = selectedFile;
  }, [selectedFile, editorTab]);

  console.log('revealSettings', revealSettings);

  // Determine if current file is markdown
  const isMarkdownFile = selectedFile?.endsWith('.md');
  const currentContent: string =
    selectedFile === 'README.md'
      ? readmeContent
      : (cloudSolutionState[
          selectedFile.replace('.md', '') as keyof typeof cloudSolutionState
        ] as string);
  const PreviewContent = () => (
    <div className='h-full overflow-auto bg-white'>
      {isMarkdownFile ? (
        <div className='h-full bg-white text-gray-900'>
          <div className='w-full max-w-6xl mx-auto p-8 overflow-x-auto'>
            <div className='min-w-0'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Headers
                  h1: ({ children }) => (
                    <h1 className='text-4xl font-bold mb-8 text-gray-900 border-b-2 border-blue-500 pb-4 mt-8 first:mt-0'>
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className='text-3xl font-semibold mb-6 text-gray-800 mt-12 first:mt-0 border-l-4 border-blue-500 pl-4'>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className='text-2xl font-semibold mb-4 text-gray-800 mt-8'>
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className='text-xl font-semibold mb-3 text-gray-800 mt-6'>
                      {children}
                    </h4>
                  ),
                  h5: ({ children }) => (
                    <h5 className='text-lg font-semibold mb-2 text-gray-800 mt-4'>
                      {children}
                    </h5>
                  ),
                  h6: ({ children }) => (
                    <h6 className='text-base font-semibold mb-2 text-gray-800 mt-4'>
                      {children}
                    </h6>
                  ),
                  // Paragraphs
                  p: ({ children }) => (
                    <p className='mb-4 leading-relaxed text-gray-700 text-base'>
                      {children}
                    </p>
                  ),
                  // Lists
                  ul: ({ children }) => (
                    <ul className='mb-6 space-y-2 pl-6'>{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className='mb-6 space-y-2 pl-6 list-decimal'>
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className='text-gray-700 leading-relaxed list-disc'>
                      {children}
                    </li>
                  ),
                  // Tables with horizontal scroll
                  table: ({ children }) => (
                    <div className='overflow-x-auto mb-8 shadow-lg rounded-lg'>
                      <table className='min-w-full bg-white border border-gray-200 table-auto'>
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className='bg-gradient-to-r from-blue-500 to-blue-600 text-white'>
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className='divide-y divide-gray-200'>
                      {children}
                    </tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className=' transition-colors duration-200'>
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className='px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider whitespace-nowrap'>
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className='px-6 py-4 text-sm text-gray-700 border-t border-gray-200 whitespace-nowrap'>
                      {children}
                    </td>
                  ),
                  // Blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className='border-l-4 border-blue-500 pl-6 py-4 mb-6 bg-blue-50 italic text-gray-700 rounded-r-lg'>
                      {children}
                    </blockquote>
                  ),
                  // Links
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className='text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors duration-200'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {children}
                    </a>
                  ),
                  // Strong/Bold
                  strong: ({ children }) => (
                    <strong className='font-bold text-gray-900'>
                      {children}
                    </strong>
                  ),
                  // Emphasis/Italic
                  em: ({ children }) => (
                    <em className='italic text-gray-800'>{children}</em>
                  ),
                  // Horizontal Rule
                  hr: () => <hr className='my-8 border-t-2 border-gray-300' />,
                  // Code with Mermaid support
                  code(props) {
                    const { children, className, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');

                    // Handle Mermaid diagrams
                    if (match && match[1] === 'mermaid') {
                      return <MermaidDiagram chart={codeString} />;
                    }

                    // Handle code blocks with syntax highlighting
                    if (match) {
                      return (
                        <div className='mb-6 overflow-x-auto'>
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag='div'
                            className='rounded-lg shadow-lg'
                            wrapLongLines={false}
                            {...rest}
                          >
                            {codeString}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }

                    // Handle inline code
                    return (
                      <code
                        className='bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600 border'
                        {...rest}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {currentContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-full bg-white text-black p-8 overflow-auto'>
          <div className='max-w-5xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>Preview Mode</h1>
            <div className='bg-gray-100 rounded-lg p-6 mb-6'>
              <h2 className='text-xl font-semibold mb-4'>
                React Application Preview
              </h2>
              <p className='text-gray-700 mb-4'>
                This is a preview of your React application. The current file{' '}
                <code className='bg-gray-200 px-2 py-1 rounded'>
                  {selectedFile}
                </code>{' '}
                contains:
              </p>
              <ul className='list-disc list-inside space-y-2 text-gray-700'>
                <li>React Query setup for data fetching</li>
                <li>React Router for navigation</li>
                <li>Tooltip provider for UI components</li>
                <li>Toast notifications system</li>
                <li>Multiple route definitions</li>
              </ul>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-blue-50 p-4 rounded-lg'>
                <h3 className='font-semibold text-blue-800 mb-2'>Routes</h3>
                <ul className='text-sm text-blue-700 space-y-1'>
                  <li>/ → BauCuaGame</li>
                  <li>/2048 → Index</li>
                  <li>* → NotFound</li>
                </ul>
              </div>
              <div className='bg-green-50 p-4 rounded-lg'>
                <h3 className='font-semibold text-green-800 mb-2'>Features</h3>
                <ul className='text-sm text-green-700 space-y-1'>
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
  );

  return (
    <div className='flex-1 flex flex-col bg-gray-900 h-full'>
      {/* Header with file selector */}
      <div className='flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700'>
        <div className='flex items-center gap-2 text-sm'>
          <File className='w-4 h-4 text-blue-400' />
          <span className='text-white'>{selectedFile}</span>
        </div>
      </div>

      {/* Compact Tab Switcher */}
      <div className='border-b border-gray-700 px-4 py-1.5 bg-gray-800'>
        <div className='flex items-center gap-0.5 bg-gray-700 rounded-md p-0.5 w-fit'>
          <button
            onClick={() => setEditorTab('raw')}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200
              ${
                editorTab === 'raw'
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-650'
              }
            `}
          >
            <Code className='w-3 h-3' />
            Raw
          </button>
          <button
            onClick={() => setEditorTab('preview')}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200
              ${
                editorTab === 'preview'
                  ? 'bg-gray-600 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-650'
              }
            `}
          >
            <Eye className='w-3 h-3' />
            Preview
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className='flex-1 overflow-hidden bg-gray-900 relative'>
        {editorTab === 'raw' ? (
          <div className='h-full bg-gray-900'>
            <div className='h-full font-mono text-sm flex'>
              {/* Line Numbers - Fixed */}
              <div className='w-12 bg-gray-800 border-r border-gray-700 flex-shrink-0 overflow-hidden'>
                <div className='py-4'>
                  {currentContent.split('\n').map((_, index) => (
                    <div
                      key={index}
                      className='px-2 text-right text-gray-500 text-xs leading-6 h-6'
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Editor Content - Scrollable with limited width */}
              <div className='flex-1 overflow-auto bg-gray-900'>
                <div className='p-4'>
                  <pre className='text-gray-300 leading-6 min-h-full whitespace-pre overflow-x-auto'>
                    <code
                      style={{ display: 'block', minWidth: 'fit-content' }}
                      dangerouslySetInnerHTML={{
                        __html: isMarkdownFile
                          ? currentContent
                              .replace(
                                /^(#{1,6})\s+(.+)$/gm,
                                '<span style="color: #ff79c6">$1</span> <span style="color: #50fa7b">$2</span>'
                              )
                              .replace(
                                /\*\*([^*]+)\*\*/g,
                                '<span style="color: #ffb86c">**$1**</span>'
                              )
                              .replace(
                                /\*([^*]+)\*/g,
                                '<span style="color: #f1fa8c">*$1*</span>'
                              )
                              .replace(
                                /`([^`]+)`/g,
                                '<span style="color: #8be9fd">`$1`</span>'
                              )
                              .replace(
                                /^- (.+)$/gm,
                                '<span style="color: #ff79c6">-</span> <span style="color: #f8f8f2">$1</span>'
                              )
                              .replace(
                                /^\d+\. (.+)$/gm,
                                '<span style="color: #ff79c6">$&</span>'
                              )
                              .replace(
                                /^\|(.+)\|$/gm,
                                '<span style="color: #8be9fd">|$1|</span>'
                              )
                              .replace(
                                /^---$/gm,
                                '<span style="color: #6272a4">---</span>'
                              )
                          : currentContent
                              .replace(
                                /import/g,
                                '<span style="color: #ff79c6">import</span>'
                              )
                              .replace(
                                /from/g,
                                '<span style="color: #ff79c6">from</span>'
                              )
                              .replace(
                                /const/g,
                                '<span style="color: #ff79c6">const</span>'
                              )
                              .replace(
                                /export/g,
                                '<span style="color: #ff79c6">export</span>'
                              )
                              .replace(
                                /default/g,
                                '<span style="color: #ff79c6">default</span>'
                              )
                              .replace(
                                /'[^']*'/g,
                                '<span style="color: #f1fa8c">$&</span>'
                              )
                              .replace(
                                /{[^}]*}/g,
                                '<span style="color: #8be9fd">$&</span>'
                              )
                              .replace(
                                /\/\/.*$/gm,
                                '<span style="color: #6272a4">$&</span>'
                              ),
                      }}
                    />
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ) : // Preview with optional reveal effect
        localRevealEnabled ? (
          <ContentRevealPreview
            duration={3}
            autoStart={true}
            overlayColor='bg-white'
            className='h-full'
            onRevealComplete={() => console.log('Content revealed!')}
          >
            <PreviewContent />
          </ContentRevealPreview>
        ) : (
          <PreviewContent />
        )}
      </div>
    </div>
  );
}
