'use client'

import { useState } from 'react'
import { Button } from '@heroui/react'
import { Check, Copy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  maxHeight?: string
  collapsible?: boolean
  collapseAt?: number
}

export function CodeBlock({
  code,
  language = 'bash',
  filename,
  showLineNumbers = false,
  maxHeight,
  collapsible = false,
  collapseAt = 30,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(!collapsible)

  const lines = code.trim().split('\n')
  const shouldCollapse = collapsible && lines.length > collapseAt

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const displayedCode =
    shouldCollapse && !isExpanded ? lines.slice(0, collapseAt).join('\n') : code.trim()

  return (
    <div className="relative group">
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between bg-default-200 dark:bg-default-100 px-4 py-2 rounded-t-lg border-b border-default-300 dark:border-default-200">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-xs font-mono text-default-600 dark:text-default-500">
              {filename}
            </span>
          )}
          {language && !filename && (
            <span className="text-xs font-mono text-default-600 dark:text-default-500 uppercase">
              {language}
            </span>
          )}
        </div>
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onPress={handleCopy}
          aria-label="Copy code to clipboard"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-4 h-4 text-success" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.2 }}
              >
                <Copy className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Code content with improved contrast */}
      <div className="relative rounded-b-lg overflow-hidden" style={{ maxHeight: maxHeight }}>
        <pre className="bg-[#1a1b26] dark:bg-[#16161e] px-3 py-2 overflow-x-auto text-xs font-mono leading-snug border border-default-300 dark:border-default-200 border-t-0 rounded-b-lg">
          <code className="text-[#a9b1d6] dark:text-[#c0caf5]">
            {showLineNumbers
              ? displayedCode.split('\n').map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell pr-4 text-right text-default-500 dark:text-default-400 select-none">
                      {i + 1}
                    </span>
                    <span className="table-cell">{line}</span>
                  </div>
                ))
              : displayedCode}
          </code>
        </pre>

        {/* Collapse/Expand button */}
        {shouldCollapse && (
          <div className="absolute bottom-0 left-0 right-0">
            {!isExpanded && (
              <div className="h-20 bg-gradient-to-t from-[#1a1b26] dark:from-[#16161e] to-transparent pointer-events-none" />
            )}
            <div className="bg-[#1a1b26] dark:bg-[#16161e] border-t border-default-300 dark:border-default-200 px-4 py-2 flex justify-center">
              <Button
                size="sm"
                variant="flat"
                onPress={() => setIsExpanded(!isExpanded)}
                className="text-primary hover:text-primary-600"
              >
                {isExpanded ? (
                  <>Show Less ({lines.length - collapseAt} lines hidden)</>
                ) : (
                  <>Show More ({lines.length - collapseAt} more lines)</>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
