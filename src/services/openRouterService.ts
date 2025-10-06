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
    acrostic: `Create 3 different acrostic mnemonics for: "${text}".

For each mnemonic:

Take first letter from each word of "${text}" (e.g., for "Asad Bdf Cfw Dfw Ewer", use A, B, C, D, E).

Create a memorable single word for each letter combining the above selected letters.

Add a brief description explaining how each letter connects to the original sequence or concept.

Format EXACTLY like this:

MNEMONIC 1:
[Word for first letter] [Word for second letter] [Word for third letter]...
Description: [Provide a 1-2 sentence explanation about how this mnemonic helps remember "${text}"]

MNEMONIC 2:
[Different words...]
Description: [Different explanation...]

MNEMONIC 3:
[Different words...]
Description: [Different explanation...]

Make them creative, memorable, and easy to visualize. Use vivid, concrete words.`,
    
    story: `Create 3 different story mnemonics for: "${text}".

For each story:
1. Weave the letters or concepts into a SHORT, vivid narrative (2-3 sentences max)
2. Make it visual and memorable
3. Add a brief note on why it works

Format EXACTLY like this:
STORY 1:
[Your vivid 2-3 sentence story]
Why it works: [Brief explanation]

STORY 2:
[Different story]
Why it works: [Different explanation]

STORY 3:
[Different story]
Why it works: [Different explanation]`,
    
    rhyme: `Create 3 different rhyming mnemonics for: "${text}".

For each rhyme:
1. Make it catchy and rhythmic (2-4 lines)
2. Use simple rhyme schemes
3. Add a note on memorability

Format EXACTLY like this:
RHYME 1:
[Your catchy rhyme]
Memorability tip: [Brief note]

RHYME 2:
[Different rhyme]
Memorability tip: [Different note]

RHYME 3:
[Different rhyme]
Memorability tip: [Different note]`,
    
    chunking: `Create 3 different chunking strategies for: "${text}".

For each strategy:
1. Break the information into memorable chunks
2. Show clear separations
3. Explain the chunking logic

Format EXACTLY like this:
STRATEGY 1:
[Chunked version with separators]
Logic: [Why these chunks work]

STRATEGY 2:
[Different chunking]
Logic: [Different reasoning]

STRATEGY 3:
[Different chunking]
Logic: [Different reasoning]`
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
          content: 'You are a creative mnemonic expert. Create memorable, helpful mnemonics that make learning easy and fun. Always follow the exact format requested. Keep responses concise and focused.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.9,
      max_tokens: 1000
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