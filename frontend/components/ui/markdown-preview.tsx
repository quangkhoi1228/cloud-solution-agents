'use client'

import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { FadeInBlock } from './FadeInBlock'
import { MermaidDiagram } from './MermaidDiagram'

export const MarkdownPreview = ({ markdownContent }: { markdownContent: string }) => {
  const components = useMemo(() => {
    let blockIndex = 0
    const nextIndex = () => blockIndex++

    return {
      h1: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
        </FadeInBlock>
      ),
      h2: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <h2 className="text-3xl font-semibold mb-4 mt-6 border-l-4 pl-3 border-blue-500">{children}</h2>
        </FadeInBlock>
      ),
      h3: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <h3 className="text-2xl font-medium mb-3 mt-5">{children}</h3>
        </FadeInBlock>
      ),
      p: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <p className="mb-3 text-gray-800">{children}</p>
        </FadeInBlock>
      ),
      ul: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <ul className="list-disc ml-6 mb-4">{children}</ul>
        </FadeInBlock>
      ),
      ol: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <ol className="list-decimal ml-6 mb-4">{children}</ol>
        </FadeInBlock>
      ),
      li: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <li className="mb-1">{children}</li>
        </FadeInBlock>
      ),
      blockquote: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <blockquote className="border-l-4 pl-4 italic text-gray-600 bg-gray-50">{children}</blockquote>
        </FadeInBlock>
      ),
      a: ({ href, children }) => (
        <FadeInBlock index={nextIndex()}>
          <a
            href={href}
            className="text-blue-600 underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        </FadeInBlock>
      ),
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        const codeString = String(children).replace(/\n$/, '')

        if (match?.[1] === 'mermaid') {
          return (
            <FadeInBlock index={nextIndex()}>
              <MermaidDiagram chart={codeString} />
            </FadeInBlock>
          )
        }

        return !inline ? (
          <FadeInBlock index={nextIndex()}>
            <div className="mb-4">
              <SyntaxHighlighter language={match?.[1]} style={vscDarkPlus} PreTag="div" {...props}>
                {codeString}
              </SyntaxHighlighter>
            </div>
          </FadeInBlock>
        ) : (
          <code className="bg-gray-200 px-1 py-0.5 rounded">{children}</code>
        )
      },
      table: ({ children }) => (
        <FadeInBlock index={nextIndex()}>
          <div className="overflow-x-auto my-4 border">
            <table className="table-auto w-full text-sm text-left">{children}</table>
          </div>
        </FadeInBlock>
      ),
      thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
      tbody: ({ children }) => <tbody>{children}</tbody>,
      tr: ({ children }) => <tr className="border-b">{children}</tr>,
      th: ({ children }) => <th className="px-4 py-2 font-medium">{children}</th>,
      td: ({ children }) => <td className="px-4 py-2">{children}</td>,
    }
  }, [markdownContent])

  return (
    <div className="prose max-w-full dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}
