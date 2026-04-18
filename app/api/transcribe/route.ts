import { NextRequest, NextResponse } from "next/server";

// REAL AI INTEGRATION: Replace this with OpenAI Whisper or Gemini Speech-to-Text
// Example with OpenAI Whisper:
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const transcription = await openai.audio.transcriptions.create({
//   file: audioFile,
//   model: "whisper-1",
// });
// return NextResponse.json({ transcript: transcription.text });

const MOCK_TRANSCRIPTS = [
  "I remember it was the summer of nineteen sixty two, and my father came home with a record under his arm. He had this rare smile on his face, the kind you don't forget. He said tonight we're going to dance. And I was seventeen and thought I knew everything.",
  "We didn't have much that Christmas. My father had lost his job at the foundry earlier that fall. But my mother, she turned that kitchen into something magical for three whole days. The whole house smelled of star anise and orange peel.",
  "The day the war ended, I was eight years old, sitting on the front stoop shelling peas. Then I heard the radio change. My mother dropped her dish towel and made a sound I'd never heard her make before.",
  "I walked through those mill gates on a September morning in nineteen fifty five and the heat hit me like I'd opened an oven. I was eighteen years old and I had never been so scared in my life. But I was proud, too.",
];

export async function POST(req: NextRequest) {
  // In production: parse audio from request body, send to Whisper
  await new Promise((r) => setTimeout(r, 1200));

  const randomTranscript =
    MOCK_TRANSCRIPTS[Math.floor(Math.random() * MOCK_TRANSCRIPTS.length)];

  return NextResponse.json({
    transcript: randomTranscript,
    confidence: 0.97,
    duration_seconds: 28,
  });
}
