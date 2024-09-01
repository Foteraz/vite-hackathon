  import remarkGfm from 'remark-gfm';
  import remarkMath from 'remark-math';
  import { cn } from '@lib/utils'; // Utility function for conditional class names
  import { CodeBlock } from '@src/components/ui/codeblock'; // Component for code blocks
  import { MemoizedReactMarkdown } from './markdown'; // Markdown rendering component
  import { IconOpenAI, IconUser } from '@src/components/ui/icons'; // Icons for AI and user messages
  import { ChartComponent } from './ChartComponent'; // Component for rendering charts

  export interface Message {
    role: 'user' | 'ai';
    content: string;
  }

  export interface ChatMessageProps {
    message: Message;
  }

  export function ChatMessage({ message }: ChatMessageProps) {
    const isUserMessage = message.role === 'user';
    const messageClassName = isUserMessage
      ? 'bg-gray-200 text-black' // User message styling
      : 'bg-blue-200 text-white'; // AI message styling
    const alignmentClassName = isUserMessage ? 'justify-start' : 'justify-starting'; // User messages align left, AI align right

    return (
      <div className={`flex ${alignmentClassName} mb-4`}>
        {/* Message icon */}
        <div
          className={cn(
            'flex items-center justify-center w-8 h-8 rounded-full border shadow-md',
            messageClassName
          )}
        >
          {isUserMessage ? <IconUser /> : <IconOpenAI />}
        </div>

        {/* Message content */}
        <div className={`flex-1 px-3 ml-2 space-y-2 overflow-hidden ${messageClassName}`}>
          {/* If the content includes chart data, render the ChartComponent */}
          {message.content.includes('chart-data') ? (
            <ChartComponent dataUrl="/api/chart-data" />
          ) : (
            <MemoizedReactMarkdown
              className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
              remarkPlugins={[remarkGfm, remarkMath]}
              components={{
                p({ children }) {
                  return <p className="mb-2 last:mb-0">{children}</p>;
                },
                code({ node, inline, className, children, ...props }) {
                  // Special processing for code blocks and inline code
                  if (children.length && children[0] === '▍') {
                    return <span className="mt-1 cursor-default animate-pulse">▍</span>;
                  }

                  const match = /language-(\w+)/.exec(className || '');

                  if (inline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }

                  return (
                    <CodeBlock
                      key={Math.random()}
                      language={(match && match[1]) || ''}
                      value={String(children).replace(/\n$/, '')}
                      {...props}
                    />
                  );
                },
              }}
            >
              {message.content}
            </MemoizedReactMarkdown>
          )}
        </div>
      </div>
    );
  }
