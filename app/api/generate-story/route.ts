import { NextRequest, NextResponse } from "next/server";

// REAL AI INTEGRATION: Replace mock with OpenAI GPT-4 or Anthropic Claude
// Example with OpenAI:
// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const completion = await openai.chat.completions.create({
//   model: "gpt-4o",
//   messages: [
//     {
//       role: "system",
//       content: `You are a warm, empathetic ghostwriter helping a senior citizen
//                 preserve their life story. Transform the raw transcript into a
//                 polished, first-person narrative chapter. Keep the senior's voice
//                 and personality. Add sensory details. Use accessible, warm language.
//                 Output a title, summary (2 sentences), and full chapter (400-600 words).`,
//     },
//     { role: "user", content: transcript },
//   ],
// });
//
// Example with Anthropic Claude:
// import Anthropic from "@anthropic-ai/sdk";
// const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
// const message = await anthropic.messages.create({
//   model: "claude-opus-4-7",
//   max_tokens: 1024,
//   messages: [{ role: "user", content: transcript }],
// });

const MOCK_GENERATED_STORIES = [
  {
    title: "The Summer We Learned to Dance",
    summary:
      "A warm July evening in 1962 when Father came home with a record under his arm and a rare smile on his face — and everything changed.",
    fullText: `It was the summer of 1962, and the heat in Cincinnati sat heavy on everything like a wool blanket that nobody asked for. My father — a quiet man who rarely showed much of anything — came home one Friday evening with a record under his arm and a rare grin on his face.

"Rosie," he said, using the name only he ever called me, "tonight we're going to dance."

I was seventeen and certain I knew everything. But the way he said it stopped me cold. He set up the old RCA on the back porch, and when that first note of Glenn Miller drifted out into the warm evening air, something shifted.

He held out his hand like a gentleman at a ball and taught me the foxtrot, step by patient step. I kept stepping on his feet. He never once winced.

By nine o'clock, Mrs. Patterson from next door had pulled up a lawn chair. The whole neighborhood was there, without anyone planning it that way.

That night lives in me still. Not because of the dancing, though I've loved it ever since. But because it was the first time I understood that quiet people have whole worlds inside them, and sometimes, if you're lucky, they let you in.

I think of him every time I hear Glenn Miller.`,
    followUpQuestion: "What song was playing, and did you ever dance with him again?",
    tags: ["family", "father", "dancing", "summer"],
    year: "1962",
    location: "Cincinnati, Ohio",
    emotion: "Warm and grateful",
  },
  {
    title: "The Christmas We Had Nothing",
    summary:
      "The year Father lost his job, but Mother turned the kitchen into pure magic — and it became the Christmas the whole family still talks about.",
    fullText: `The Christmas of 1949 was the year my father lost his job at the foundry. He tried to keep it from us children, the way parents do — speaking in low voices after we were in bed, money suddenly becoming something that hung in the air unspoken.

There would be no gifts. We knew, without being told.

But my mother — God, my mother — she treated that Christmas like a personal challenge. She spent three days in that kitchen. The smells alone were a kind of magic: star anise and orange peel, rosemary and browning butter.

On Christmas morning, there was no pile of boxes under the tree. There was instead a table so full it strained.

We ate for four hours. My uncle played the harmonica. My grandmother sat at the head of the table looking at all of us with an expression I now understand was not happiness exactly, but something deeper — the recognition that enough was actually, truly enough.

We had nothing. We had everything.`,
    followUpQuestion:
      "What did your mother make that was everyone's favorite? Does anyone still make it?",
    tags: ["Christmas", "family", "mother", "gratitude"],
    year: "1949",
    location: "South Philadelphia",
    emotion: "Gratitude, warmth",
  },
];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { transcript, followUpAnswers } = body;

  // Simulate AI processing time
  await new Promise((r) => setTimeout(r, 2000));

  const story =
    MOCK_GENERATED_STORIES[Math.floor(Math.random() * MOCK_GENERATED_STORIES.length)];

  return NextResponse.json({
    story,
    tokensUsed: 847,
    model: "mock-gpt-4o",
  });
}
