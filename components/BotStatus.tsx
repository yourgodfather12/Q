import { useEffect, useState, useCallback, useRef } from 'react';
import { AlertCircle, CheckCircle2, Send, RefreshCw, Server, Users, Zap, Clock } from 'lucide-react';

interface BotStatus {
  guilds: number;
  users: number;
  latency: number;
  uptime: number;
}

interface Guild {
  id: string;
  name: string;
  member_count: number;
  icon_url: string | null;
}

interface Message {
  id: string;
  content: string;
  timestamp: number;
  status: 'success' | 'error';
  guildName?: string;
}

export function BotStatus() {
  const [status, setStatus] = useState<BotStatus | null>(null);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [selectedGuildId, setSelectedGuildId] = useState<string>('');
  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageHistory, scrollToBottom]);

  const addToMessageHistory = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    setMessageHistory(prev => [
      ...prev,
      {
        ...message,
        id: crypto.randomUUID(),
        timestamp: Date.now()
      }
    ].slice(-50)); // Keep last 50 messages
  }, []);

  const fetchGuilds = useCallback(() => {
    if (!wsRef.current) return;
    setIsLoading(true);
    
    try {
      wsRef.current.send(JSON.stringify({
        type: 'command',
        command: 'get_guilds'
      }));
    } catch (err) {
      console.error('Failed to fetch guilds:', err);
      setError('Failed to fetch guilds');
    }
  }, []);

  const refreshStatus = useCallback(() => {
    if (!wsRef.current) return;
    setIsLoading(true);
    
    try {
      wsRef.current.send(JSON.stringify({
        type: 'command',
        command: 'refresh_status'
      }));
    } catch (err) {
      console.error('Failed to refresh status:', err);
      setError('Failed to refresh status');
    }
  }, []);

  const sendMessage = useCallback(() => {
    if (!wsRef.current || !message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    const targetGuild = selectedGuildId ? guilds.find(g => g.id === selectedGuildId) : undefined;
    setIsLoading(true);

    try {
      wsRef.current.send(JSON.stringify({
        type: 'command',
        command: 'broadcast_message',
        content: message,
        guild_id: selectedGuildId || undefined
      }));

      addToMessageHistory({
        content: message,
        status: 'success',
        guildName: targetGuild?.name || 'All Servers'
      });

      setMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message');
      addToMessageHistory({
        content: message,
        status: 'error',
        guildName: targetGuild?.name || 'All Servers'
      });
    } finally {
      setIsLoading(false);
    }
  }, [message, selectedGuildId, guilds, addToMessageHistory]);

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        const response = await fetch('/api/ws');
        const { wsUrl } = await response.json();

        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setIsConnected(true);
          setError(null);
          fetchGuilds();
        };

        ws.onmessage = (event) => {
          setIsLoading(false);
          try {
            const data = JSON.parse(event.data);
            
            switch (data.type) {
              case 'status':
                setStatus(data.data);
                break;
              case 'guilds_data':
                setGuilds(data.data);
                break;
              case 'error':
                setError(data.message);
                addToMessageHistory({
                  content: data.message,
                  status: 'error'
                });
                break;
              case 'success':
                setError(null);
                if (data.message) {
                  addToMessageHistory({
                    content: data.message,
                    status: 'success'
                  });
                }
                break;
            }
          } catch (err) {
            console.error('Failed to parse WebSocket message:', err);
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          wsRef.current = null;
          setTimeout(connectWebSocket, 5000);
        };

        ws.onerror = () => {
          setError('WebSocket connection error');
          setIsConnected(false);
          wsRef.current = null;
        };
      } catch {
        setError('Failed to connect to WebSocket');
        setIsConnected(false);
        wsRef.current = null;
      }
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [fetchGuilds, addToMessageHistory]);

  const formatUptime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    
    return parts.join(' ') || '< 1m';
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Bot Status</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {isConnected ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              )}
              <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <button
              onClick={refreshStatus}
              disabled={!isConnected || isLoading}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              title="Refresh Status"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {status && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg flex items-center">
              <Server className="w-6 h-6 mr-3 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Servers</p>
                <p className="text-2xl font-bold">{status.guilds}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg flex items-center">
              <Users className="w-6 h-6 mr-3 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Users</p>
                <p className="text-2xl font-bold">{status.users}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg flex items-center">
              <Zap className="w-6 h-6 mr-3 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Latency</p>
                <p className="text-2xl font-bold">{status.latency}ms</p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg flex items-center">
              <Clock className="w-6 h-6 mr-3 text-gray-600" />
              <div>
                <p className="text-sm text-gray-500">Uptime</p>
                <p className="text-2xl font-bold">{formatUptime(status.uptime)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Send Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Server
                </label>
                <select
                  className="w-full p-2 border rounded-md bg-white"
                  value={selectedGuildId}
                  onChange={(e) => setSelectedGuildId(e.target.value)}
                >
                  <option value="">All Servers</option>
                  {guilds.map((guild) => (
                    <option key={guild.id} value={guild.id}>
                      {guild.name} ({guild.member_count} members)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full p-2 border rounded-md resize-none bg-white"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
              </div>
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                onClick={sendMessage}
                disabled={!isConnected || isLoading}
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Message History</h2>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {messageHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg ${
                    msg.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{msg.guildName || 'System'}</span>
                    <span>{formatTimestamp(msg.timestamp)}</span>
                  </div>
                  <p className={msg.status === 'success' ? 'text-green-800' : 'text-red-800'}>
                    {msg.content}
                  </p>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 