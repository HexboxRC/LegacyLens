import { NextRequest, NextResponse } from "next/server";

// REAL AI INTEGRATION: Use GPT-4V or Gemini Vision for photo analysis
// Example with OpenAI Vision:
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const response = await openai.chat.completions.create({
//   model: "gpt-4o",
//   messages: [
//     {
//       role: "user",
//       content: [
//         {
//           type: "image_url",
//           image_url: { url: `data:image/jpeg;base64,${base64Image}` },
//         },
//         {
//           type: "text",
//           text: `This is an old photo from a senior citizen's personal collection.
//                  Generate: 1) A warm, evocative title (6-10 words)
//                            2) A 2-3 sentence caption that brings the memory to life.
//                  Write in second person ("In this photo, you can see...").
//                  Be warm, specific, and emotionally resonant.`,
//         },
//       ],
//     },
//   ],
// });

const MOCK_CAPTIONS = [
  {
    title: "A Moment Frozen in Golden Light",
    caption:
      "This photograph holds a world. You can almost hear the sounds of that day — the voices, the laughter, the particular quiet that falls when everyone is content. Whoever took this knew they were capturing something worth keeping.",
  },
  {
    title: "Where Every Story Begins",
    caption:
      "There is a warmth here that no amount of time can fade. The faces, the setting, the small details in the background — all of it speaks of a life fully lived and a moment genuinely treasured.",
  },
  {
    title: "The People Who Made You",
    caption:
      "Some photographs are documents. This one is something more — it is a feeling, preserved. The love in this image is visible even across the decades, a testament to everything that matters most.",
  },
  {
    title: "Sunday Afternoon, Long Ago",
    caption:
      "You know this moment, even looking back at it now. The way the light fell, the sounds just out of frame, the feeling of time moving slowly the way it only did on the very best days.",
  },
];

export async function POST(req: NextRequest) {
  // In production: extract image from form data, send to vision model
  await new Promise((r) => setTimeout(r, 1500));

  const caption = MOCK_CAPTIONS[Math.floor(Math.random() * MOCK_CAPTIONS.length)];

  return NextResponse.json({
    ...caption,
    confidence: 0.91,
    model: "mock-gpt-4o-vision",
  });
}
