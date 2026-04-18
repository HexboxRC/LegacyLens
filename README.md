# LegacyLens 📖

**An AI-powered storytelling platform for seniors — built for GenLink Hacks.**

LegacyLens helps senior citizens capture, preserve, and share their life stories with the next generation. Speak naturally, upload old photos, and receive beautiful AI-polished memory chapters that can be shared with family through a simple portal.

---

## Running the App

You need **two terminals** open at the same time — one for the Python backend, one for the Next.js frontend.

### Terminal 1 — Python FastAPI Backend

```bash
cd LegacyLens-main\backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

You should see:
```
Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

You can also open **http://localhost:8000/docs** to see the interactive API documentation.

### Terminal 2 — Next.js Frontend

```bash
cd LegacyLens-main
npm install
npm run dev
```

You should see:
```
Local: http://localhost:3000
```

Then open **http://localhost:3000** in your browser.

---

## Environment Variables

### Frontend — create `LegacyLens-main\.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend — create `LegacyLens-main\backend\.env`

```
OPENAI_API_KEY=paste-your-openai-key-here
ANTHROPIC_API_KEY=paste-your-anthropic-key-here
ELEVENLABS_API_KEY=paste-your-elevenlabs-key-here
```

> The app runs with mock data if no API keys are provided — you only need keys when connecting real AI features.

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
LegacyLens-main/
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
│   └── family/page.tsx       # Family portal
├── backend/
│   ├── main.py               # FastAPI server — all AI endpoints
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # API key template
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
│   ├── api.ts                # API helper — points to FastAPI backend
│   ├── mock-data.ts          # Sample stories, family members, AI responses
│   └── utils.ts              # Helper functions
├── .env.local.example        # Frontend env template
└── public/
    └── photos/               # Static photo assets
```

---

## API Endpoints (FastAPI)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/docs` | Interactive API docs |
| `POST` | `/api/transcribe` | Speech-to-text (accepts audio file) |
| `POST` | `/api/generate-story` | Generate polished story from transcript |
| `POST` | `/api/generate-caption` | Generate title + caption for a photo |
| `POST` | `/api/text-to-speech` | Convert story text to audio |

---

## Connecting Real AI APIs

All integration points are in `backend/main.py` with exact code comments. Here's a summary:

### 1. Speech-to-Text — OpenAI Whisper
```python
import openai
client = openai.AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
transcription = await client.audio.transcriptions.create(
    model="whisper-1",
    file=("audio.webm", audio_bytes, "audio/webm"),
)
```

### 2. Story Generation — Anthropic Claude
```python
import anthropic
client = anthropic.AsyncAnthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
message = await client.messages.create(
    model="claude-opus-4-7",
    max_tokens=1500,
    messages=[{"role": "user", "content": transcript}],
)
```

### 3. Photo Captions — OpenAI GPT-4o Vision
```python
import openai, base64
client = openai.AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
b64 = base64.b64encode(image_bytes).decode()
response = await client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": [
        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{b64}"}},
        {"type": "text", "text": "Generate a warm title and caption for this old photo."},
    ]}],
)
```

### 4. Text-to-Speech — OpenAI TTS
```python
response = await client.audio.speech.create(
    model="tts-1", voice="nova", input=story_text
)
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

**Frontend**
- [Next.js 15](https://nextjs.org/) — React framework
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Lucide React](https://lucide.dev/) — Icons

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) — Python web framework
- [Uvicorn](https://www.uvicorn.org/) — ASGI server
- [Pydantic](https://docs.pydantic.dev/) — Data validation
- [python-dotenv](https://pypi.org/project/python-dotenv/) — Environment variables

---

*Built with ❤️ for GenLink Hacks — connecting generations through the power of story.*
