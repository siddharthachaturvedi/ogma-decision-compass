export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      contexts: {
        Row: {
          id: string;
          user_id: string;
          type: 'meeting' | 'social' | 'email' | 'document' | 'memory' | 'idea';
          title: string;
          content: string;
          priority: 'low' | 'medium' | 'high' | 'urgent';
          status: 'active' | 'pending' | 'completed' | 'archived';
          metadata: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'meeting' | 'social' | 'email' | 'document' | 'memory' | 'idea';
          title: string;
          content: string;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          status?: 'active' | 'pending' | 'completed' | 'archived';
          metadata?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          type?: 'meeting' | 'social' | 'email' | 'document' | 'memory' | 'idea';
          title?: string;
          content?: string;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          status?: 'active' | 'pending' | 'completed' | 'archived';
          metadata?: Record<string, any>;
          updated_at?: string;
        };
      };
      context_connections: {
        Row: {
          id: string;
          from_context_id: string;
          to_context_id: string;
          connection_type: 'related' | 'follows' | 'references' | 'similar';
          strength: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          from_context_id: string;
          to_context_id: string;
          connection_type?: 'related' | 'follows' | 'references' | 'similar';
          strength?: number;
          created_at?: string;
        };
        Update: {
          connection_type?: 'related' | 'follows' | 'references' | 'similar';
          strength?: number;
        };
      };
      insights: {
        Row: {
          id: string;
          user_id: string;
          type: 'pattern' | 'suggestion' | 'warning' | 'opportunity';
          title: string;
          description: string;
          confidence: number;
          actionable: boolean;
          metadata: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'pattern' | 'suggestion' | 'warning' | 'opportunity';
          title: string;
          description: string;
          confidence: number;
          actionable?: boolean;
          metadata?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          type?: 'pattern' | 'suggestion' | 'warning' | 'opportunity';
          title?: string;
          description?: string;
          confidence?: number;
          actionable?: boolean;
          metadata?: Record<string, any>;
          updated_at?: string;
        };
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          role: 'user' | 'assistant';
          content: string;
          metadata: Record<string, any>;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          role: 'user' | 'assistant';
          content: string;
          metadata?: Record<string, any>;
          created_at?: string;
        };
        Update: {
          content?: string;
          metadata?: Record<string, any>;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}