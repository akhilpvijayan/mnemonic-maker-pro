import { MnemonicMode, AIResponse } from '../types';

// OpenRouter AI Service
const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// AI models in priority order (will try next if one fails)
const AI_MODELS: string[] = [
  'anthropic/claude-3.5-sonnet',
  'openai/gpt-4-turbo',
  'google/gemini-pro-1.5',
  'meta-llama/llama-3.1-70b-instruct',
  'mistralai/mistral-large'
];

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature: number;
  max_tokens: number;
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * Generate mnemonic prompts based on mode
 */
export const getMnemonicPrompt = (text: string, modeType: MnemonicMode): string => {
  const prompts: Record<MnemonicMode, string> = {
    acrostic: `Create a mnemonic using the acrostic method for: "${text}". 
    For each letter, provide a memorable word that starts with that letter. 
    Make it creative, easy to remember, and meaningful. 
    Format: Just provide the mnemonic phrase, nothing else.`,
    
    story: `Create a memorable story mnemonic for: "${text}". 
    Weave the letters or concepts into a short, vivid, and memorable narrative. 
    Make it engaging and easy to visualize. 
    Keep it concise (2-4 sentences).`,
    
    rhyme: `Create a rhyming mnemonic for: "${text}". 
    Make it catchy, rhythmic, and easy to remember. 
    Use simple rhyme schemes and memorable phrases. 
    Keep it short and punchy.`,
    
    chunking: `Break down "${text}" into memorable chunks using the chunking method. 
    Group the information into smaller, meaningful pieces that are easier to remember. 
    Provide the chunked version with clear separations and memory aids.`
  };
  
  return prompts[modeType];
};

/**
 * Call OpenRouter API with automatic fallback to next model
 */
const callOpenRouterAPI = async (prompt: string, modelIndex: number = 0): Promise<AIResponse> => {
  if (modelIndex >= AI_MODELS.length) {
    throw new Error('All AI models failed. Please try again later.');
  }

  const currentModel = AI_MODELS[modelIndex];
  
  try {
    const requestBody: OpenRouterRequest = {
      model: currentModel,
      messages: [
        {
          role: 'system',
          content: 'You are a creative mnemonic expert. Create memorable, helpful mnemonics that make learning easy and fun. Keep responses concise and focused.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Mnemonic Maker Pro'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Model ${currentModel} failed:`, errorData);
      
      // Try next model if this one fails
      return callOpenRouterAPI(prompt, modelIndex + 1);
    }

    const data: OpenRouterResponse = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      // Try next model
      return callOpenRouterAPI(prompt, modelIndex + 1);
    }

    return {
      success: true,
      content: data.choices[0].message.content.trim(),
      model: currentModel
    };
    
  } catch (err) {
    console.error(`Error with model ${currentModel}:`, err);
    // Try next model
    return callOpenRouterAPI(prompt, modelIndex + 1);
  }
};

/**
 * Main function to generate mnemonic
 */
export const generateMnemonic = async (text: string, mode: MnemonicMode): Promise<AIResponse> => {
  if (!API_KEY) {
    throw new Error('OpenRouter API key not configured. Please add REACT_APP_OPENROUTER_API_KEY to your .env file');
  }

  const prompt = getMnemonicPrompt(text, mode);
  const result = await callOpenRouterAPI(prompt);
  
  return result;
};

export default {
  generateMnemonic,
  getMnemonicPrompt
};