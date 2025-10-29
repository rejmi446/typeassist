import { defineFlow, defineStreamingFlow } from '@genkit-ai/genkit';
import { textToText } from '@genkit-ai/genkit/ai';

export const ocrTextRecognitionFlow = defineFlow({
  name: 'ocrTextRecognition',
  inputSchema: z.object({
    imageData: z.string().describe('Base64 encoded image data'),
    language: z.string().default('en').describe('Language for OCR'),
  }),
  outputSchema: z.object({
    recognizedText: z.string(),
    confidence: z.number(),
    boundingBoxes: z.array(z.object({
      text: z.string(),
      box: z.object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() }),
    })),
  }),
  async (input) => {
    // Process image with OCR
    const result = await textToText({
      prompt: `Extract and recognize text from the provided image. Language: ${input.language}. Return JSON with: { recognizedText: string, confidence: number (0-1), boundingBoxes: array of {text, box} }`,
      config: { temperature: 0 },
    });

    const parsed = JSON.parse(result.text());
    return {
      recognizedText: parsed.recognizedText || '',
      confidence: parsed.confidence || 0,
      boundingBoxes: parsed.boundingBoxes || [],
    };
  },
});

export const streamingOcrFlow = defineStreamingFlow({
  name: 'streamingOcr',
  inputSchema: z.object({
    imageData: z.string(),
  }),
  outputSchema: z.string(),
  async (input) => {
    yield 'Starting OCR processing...\n';
    // Stream OCR results
    const stream = await textToText({
      prompt: `Process OCR on image...`,
      config: { temperature: 0, stream: true },
    });
    
    for await (const chunk of stream) {
      yield chunk.text();
    }
  },
});
