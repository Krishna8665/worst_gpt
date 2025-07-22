// src/types/deepseek.d.ts

// For /v1/completions
export interface DeepseekResponse {
  choices?: { text: string }[];
  usage?: { total_tokens: number };
}

// For /v1/chat/completions
export interface DeepseekChatResponse {
  choices?: { message: { content: string } }[];
  usage?: { total_tokens: number };
}
