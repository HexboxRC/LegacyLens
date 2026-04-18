# LegacyLens 📖

**An AI-powered storytelling platform for seniors — built for GenLink Hacks.**

LegacyLens helps senior citizens capture, preserve, and share their life stories with the next generation. Speak naturally, upload old photos, and receive beautiful AI-polished memory chapters that can be shared with family through a simple portal.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — emotional hero, features, sample stories |
| `/dashboard` | Senior-friendly home dashboard |
| `/capture` | Voice recording + AI follow-up + story generation |
| `/photos` | Photo upload + AI caption/story generation |
| `/stories` | All saved story chapters |
| `/stories/[id]` | Full story view with listen, share, edit |
| `/family` | Family portal — shareable memory timeline |

---

## Project Structure

```
legacylens/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Tailwind + custom animations
│   ├── not-found.tsx         # 404 page
│   ├── dashboard/page.tsx    # Senior dashboard
│   ├── capture/page.tsx      # Voice + text story capture
│   ├── photos/page.tsx       # Photo upload + AI captions
│   ├── stories/
│   │   ├── page.tsx          # Stories list
│   │   └── [id]/page.tsx     # Individual story view
│   ├── family/page.tsx       # Family portal
│   └── api/
│       ├── transcribe/       # Mock speech-to-text endpoint
│       ├── generate-story/   # Mock AI story generation
│       └── generate-caption/ # Mock AI photo captioning
├── components/
│   ├── ui/
│   │   ├── Button.tsx        # Accessible button component
│   │   ├── Card.tsx          # Card layout components
│   │   └── Badge.tsx         # Tag/label badges
│   ├── layout/
│   │   ├── Navbar.tsx        # Responsive navigation
│   │   └── PageWrapper.tsx   # Page container
│   ├── story/
│   │   ├── StoryCard.tsx     # Story preview card
│   │   ├── AIFollowUp.tsx    # AI interview question component
│   │   └── WaveformVisualizer.tsx
│   └── photo/
│       ├── PhotoUploadZone.tsx  # Drag-and-drop upload
│       └── PhotoCard.tsx        # Photo + caption card
├── lib/
│   ├── mock-data.ts          # Sample stories, family members, AI responses
│   └── utils.ts              # Helper functions
└── public/
    └── photos/               # Static photo assets
```

---

## Connecting Real AI APIs

### 1. Speech-to-Text (Voice Recording)
**File:** `app/api/transcribe/route.ts`

Replace mock with **OpenAI Whisper**:
```typescript
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const transcription = await openai.audio.transcriptions.create({
  file: audioBlob,
  model: "whisper-1",
});
```

Or **Google Speech-to-Text** / **Gemini** equivalents.

### 2. Story Generation
**File:** `app/api/generate-story/route.ts`

Replace mock with **Anthropic Claude** (recommended for warm, empathetic writing):
```typescript
import Anthropic from "@anthropic-ai/sdk";
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const message = await anthropic.messages.create({
  model: "claude-opus-4-7",
  max_tokens: 1500,
  messages: [{
    role: "user",
    content: `Transform this memory into a polished story chapter:\n\n${transcript}`,
  }],
});
```

### 3. Photo Captioning
**File:** `app/api/generate-caption/route.ts`

Replace mock with **GPT-4o Vision**:
```typescript
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{
    role: "user",
    content: [
      { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
      { type: "text", text: "Generate a warm, evocative title and caption for this old photo..." },
    ],
  }],
});
```

### 4. Text-to-Speech (Listen button)
**File:** `app/stories/[id]/page.tsx` — "Listen to Story" button

Connect to **ElevenLabs**, **OpenAI TTS**, or browser **Web Speech API**:
```typescript
// Browser Web Speech API (no API key needed):
const utterance = new SpeechSynthesisUtterance(story.fullText);
utterance.rate = 0.85;
speechSynthesis.speak(utterance);
```

---

## Environment Variables

Create a `.env.local` file:

```bash
# OpenAI (for Whisper + GPT-4o)
OPENAI_API_KEY=your_key_here

# Anthropic Claude (for story generation)
ANTHROPIC_API_KEY=your_key_here

# ElevenLabs (for TTS)
ELEVENLABS_API_KEY=your_key_here
```

---

## Future Improvements

### Short-term (post-hackathon)
- [ ] Real audio recording with `MediaRecorder` API
- [ ] Persistent storage (Supabase / PostgreSQL)
- [ ] User authentication (NextAuth.js)
- [ ] PDF export of full life book
- [ ] Email family invite system

### Medium-term
- [ ] Mobile app (React Native / Expo)
- [ ] Multi-language support
- [ ] Video memory capture
- [ ] Collaborative editing with family members
- [ ] AI-generated "documentary script" for video slideshows

### Longer-term
- [ ] Senior center / care home partnerships
- [ ] Print-on-demand physical book generation
- [ ] Memory preservation with AR/VR experiences

---

## Accessibility

LegacyLens is built with senior accessibility as a first-class concern:
- Minimum 44px tap targets on all interactive elements
- High contrast text (WCAG AA compliant)
- Large default font sizes (18px+)
- Keyboard navigation support throughout
- ARIA labels on all interactive elements
- No dense menus or small text
- Screen reader compatible

---

## Built With

- [Next.js 15](https://nextjs.org/) — React framework
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Lucide React](https://lucide.dev/) — Icons
- [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) — Utility classes

---

*Built with ❤️ for GenLink Hacks — connecting generations through the power of story.*
