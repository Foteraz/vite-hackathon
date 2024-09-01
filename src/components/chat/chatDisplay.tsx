import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { MemoizedReactMarkdown } from './markdown';
import { IconOpenAI, IconUser } from '@src/components/ui/icons';
import ChartComponent from './ChartComponent'; // Import the ChartComponent
import { Options } from 'highcharts';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  isGraph?: boolean;
  chartOptions?: Options; // Optional for dynamic chart options
}

interface FetchResponse {
  success: boolean;
  conversation: string;
}

export function ChatDisplay() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [conversations, setConversations] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!conversationId) return;

      try {
        const response = await fetch(`http://localhost:3030/model/conversations/${conversationId}`);
        const data: FetchResponse = await response.json();

        if (data.success && data.conversation) {
          const parsedData = JSON.parse(data.conversation);
          const messages = parsedData.chat;

          // Find the last message with chart data
          let latestChartMessageIndex = -1;

          const formattedMessages = messages.map((msg: string, index: number) => {
            if (msg.includes('chart-data')) {
              latestChartMessageIndex = index;
            }
            return {
              role: index % 2 === 0 ? 'user' : 'ai',
              content: msg,
            };
          });

          // If there is a latest chart message, process the chart data only for that message
          if (latestChartMessageIndex !== -1) {
            const chartDataString = messages[latestChartMessageIndex].split('chart-data:')[1].trim();
            const parsedChartData = JSON.parse(chartDataString);
            const chartOptions: Options = {
              chart: {
                type: parsedChartData.graphType,
              },
              title: {
                text: 'AI Generated Chart',
              },
              xAxis: {
                categories: parsedChartData.xData,
                title: {
                  text: parsedChartData.xAxisName,
                },
              },
              yAxis: {
                title: {
                  text: parsedChartData.yAxisName,
                },
              },
              series: [
                {
                  name: 'Data',
                  data: parsedChartData.data,
                },
              ],
            };

            // Update the message at the latest chart message index to include chartOptions
            formattedMessages[latestChartMessageIndex] = {
              ...formattedMessages[latestChartMessageIndex],
              isGraph: true,
              chartOptions,
            };

            // Save the latest chart options to local storage
            localStorage.setItem(`chartData_${conversationId}`, JSON.stringify(chartOptions));
          }

          setConversations(formattedMessages);
        }
      } catch (error) {
        setError('Failed to fetch conversations');
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [conversationId]);

  if (loading) {
    return <div>Loading chat...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col w-full flex-grow px-4 py-6 bg-white shadow-md rounded-lg">
      {conversations.map((message, index) => (
        <div key={index} className="flex items-start mb-4">
          <div className="w-8 h-8 rounded-full border mr-4 flex items-center justify-center">
            {message.role === 'user' ? (
              <IconUser className="w-4 h-4 text-black" />
            ) : (
              <IconOpenAI className="w-4 h-4 text-white" />
            )}
          </div>
          <div className="flex-1 px-3 py-2 rounded-md bg-gray-200 text-black">
            {/* Render ChartComponent if the message has chart data and it's the newest chart */}
            {message.isGraph && message.chartOptions ? (
              <ChartComponent options={message.chartOptions} />
            ) : (
              <MemoizedReactMarkdown
                className="prose break-words dark:prose-invert"
                remarkPlugins={[remarkGfm, remarkMath]}
                components={{
                  p({ children }) {
                    return <p className="mb-2 last:mb-0">{children}</p>;
                  },
                  code({ node, inline, className, children, ...props }) {
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
                      <pre className={className} {...props}>
                        {String(children).replace(/\n$/, '')}
                      </pre>
                    );
                  },
                }}
              >
                {message.content}
              </MemoizedReactMarkdown>
            )}
          </div>
        </div>
      ))}

      {/* Placeholder */}
      <div className="flex items-start mb-4">
        <div className="w-8 h-8 rounded-full border mr-4 flex items-center justify-center">
          {/* Placeholder icon or empty */}
        </div>
        <div className="flex-1 px-3 py-2 rounded-md bg-gray-100 text-gray-500">
          <p className="text-center">No new messages</p>
        </div>
      </div>
    </div>
  );
}
