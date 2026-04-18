"""
LegacyLens — FastAPI Backend
Run with: uvicorn main:app --reload --port 8000
"""

import random
import asyncio
from typing import Optional

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="LegacyLens API",
    description="AI-powered backend for the LegacyLens senior storytelling platform",
    version="1.0.0",
)

# Allow the Next.js frontend (localhost:3000) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Pydantic models ────────────────────────────────────────────────────────

class GenerateStoryRequest(BaseModel):
    transcript: str
    follow_up_answers: Optional[list[str]] = []


class GeneratedStory(BaseModel):
    title: str
    summary: str
    full_text: str
    follow_up_question: str
    tags: list[str]
    year: str
    location: str
    emotion: str


class TranscribeResponse(BaseModel):
    transcript: str
    confidence: float
    duration_seconds: int


class CaptionResponse(BaseModel):
    title: str
    caption: str
    confidence: float


# ─── Mock data ──────────────────────────────────────────────────────────────

MOCK_TRANSCRIPTS = [
    "I remember it was the summer of nineteen sixty two, and my father came home "
    "with a record under his arm. He had this rare smile on his face, the kind you "
    "don't forget. He said tonight we're going to dance. And I was seventeen and "
    "thought I knew everything.",

    "We didn't have much that Christmas. My father had lost his job at the foundry "
    "earlier that fall. But my mother, she turned that kitchen into something magical "
    "for three whole days. The whole house smelled of star anise and orange peel.",

    "The day the war ended, I was eight years old, sitting on the front stoop shelling "
    "peas. Then I heard the radio change. My mother dropped her dish towel and made a "
    "sound I had never heard her make before.",

    "I walked through those mill gates on a September morning in nineteen fifty five "
    "and the heat hit me like I'd opened an oven. I was eighteen years old and I had "
    "never been so scared in my life. But I was proud, too.",
]

MOCK_STORIES = [
    {
        "title": "The Summer We Learned to Dance",
        "summary": (
            "A warm July evening in 1962 when Father came home with a record under "
            "his arm and a rare smile on his face — and everything changed."
        ),
        "full_text": (
            "It was the summer of 1962, and the heat in Cincinnati sat heavy on "
            "everything like a wool blanket that nobody asked for. My father — a quiet "
            "man who rarely showed much of anything — came home one Friday evening with "
            "a record under his arm and a rare grin on his face.\n\n"
            '"Rosie," he said, using the name only he ever called me, "tonight we\'re '
            'going to dance."\n\n'
            "I was seventeen and certain I knew everything. But the way he said it "
            "stopped me cold. He set up the old RCA on the back porch, and when that "
            "first note of Glenn Miller drifted out into the warm evening air, something "
            "shifted.\n\n"
            "He held out his hand like a gentleman at a ball and taught me the foxtrot, "
            "step by patient step. I kept stepping on his feet. He never once winced.\n\n"
            "By nine o'clock, Mrs. Patterson from next door had pulled up a lawn chair. "
            "The whole neighborhood was there, without anyone planning it that way.\n\n"
            "That night lives in me still. Not because of the dancing, though I've loved "
            "it ever since. But because it was the first time I understood that quiet "
            "people have whole worlds inside them, and sometimes, if you're lucky, "
            "they let you in."
        ),
        "follow_up_question": "What song was playing, and did you ever dance with him again?",
        "tags": ["family", "father", "dancing", "summer"],
        "year": "1962",
        "location": "Cincinnati, Ohio",
        "emotion": "Warm and grateful",
    },
    {
        "title": "The Christmas We Had Nothing",
        "summary": (
            "The year Father lost his job, but Mother turned the kitchen into pure magic "
            "— and it became the Christmas the whole family still talks about."
        ),
        "full_text": (
            "The Christmas of 1949 was the year my father lost his job at the foundry. "
            "He tried to keep it from us children, the way parents do — speaking in low "
            "voices after we were in bed, money suddenly becoming something that hung "
            "in the air unspoken.\n\n"
            "There would be no gifts. We knew, without being told.\n\n"
            "But my mother — God, my mother — she treated that Christmas like a personal "
            "challenge. She spent three days in that kitchen. The smells alone were a "
            "kind of magic: star anise and orange peel, rosemary and browning butter.\n\n"
            "On Christmas morning, there was no pile of boxes under the tree. There was "
            "instead a table so full it strained.\n\n"
            "We ate for four hours. My uncle played the harmonica. My grandmother sat at "
            "the head of the table looking at all of us with an expression I now understand "
            "was not happiness exactly, but something deeper — the recognition that enough "
            "was actually, truly enough.\n\n"
            "We had nothing. We had everything."
        ),
        "follow_up_question": "What did your mother make that was everyone's favourite? Does anyone still make it?",
        "tags": ["Christmas", "family", "mother", "gratitude"],
        "year": "1949",
        "location": "South Philadelphia",
        "emotion": "Gratitude, warmth",
    },
]

MOCK_CAPTIONS = [
    {
        "title": "A Moment Frozen in Golden Light",
        "caption": (
            "This photograph holds a world. You can almost hear the sounds of that day "
            "— the voices, the laughter, the particular quiet that falls when everyone "
            "is content. Whoever took this knew they were capturing something worth keeping."
        ),
    },
    {
        "title": "Where Every Story Begins",
        "caption": (
            "There is a warmth here that no amount of time can fade. The faces, the "
            "setting, the small details in the background — all of it speaks of a life "
            "fully lived and a moment genuinely treasured."
        ),
    },
    {
        "title": "The People Who Made You",
        "caption": (
            "Some photographs are documents. This one is something more — it is a "
            "feeling, preserved. The love in this image is visible even across the "
            "decades, a testament to everything that matters most."
        ),
    },
    {
        "title": "Sunday Afternoon, Long Ago",
        "caption": (
            "You know this moment, even looking back at it now. The way the light fell, "
            "the sounds just out of frame, the feeling of time moving slowly the way it "
            "only did on the very best days."
        ),
    },
]


# ─── Routes ─────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {"message": "LegacyLens API is running", "docs": "/docs"}


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/transcribe", response_model=TranscribeResponse)
async def transcribe(audio: Optional[UploadFile] = File(None)):
    """
    Transcribe audio to text.

    REAL AI INTEGRATION — replace the mock below with OpenAI Whisper:

        import openai
        client = openai.AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])

        audio_bytes = await audio.read()
        transcription = await client.audio.transcriptions.create(
            model="whisper-1",
            file=("audio.webm", audio_bytes, "audio/webm"),
        )
        return TranscribeResponse(
            transcript=transcription.text,
            confidence=0.97,
            duration_seconds=30,
        )
    """
    # Simulate processing time
    await asyncio.sleep(1.2)

    transcript = random.choice(MOCK_TRANSCRIPTS)
    return TranscribeResponse(
        transcript=transcript,
        confidence=0.97,
        duration_seconds=28,
    )


@app.post("/api/generate-story", response_model=GeneratedStory)
async def generate_story(request: GenerateStoryRequest):
    """
    Turn a raw transcript + follow-up answers into a polished story chapter.

    REAL AI INTEGRATION — replace the mock below with Anthropic Claude:

        import anthropic
        client = anthropic.AsyncAnthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

        combined = request.transcript
        if request.follow_up_answers:
            combined += "\\n\\nAdditional details:\\n" + "\\n".join(request.follow_up_answers)

        message = await client.messages.create(
            model="claude-opus-4-7",
            max_tokens=1500,
            messages=[{
                "role": "user",
                "content": (
                    "You are a warm, empathetic ghostwriter helping a senior citizen "
                    "preserve their life story. Transform this memory into a polished, "
                    "first-person narrative chapter. Keep the senior's voice and "
                    "personality. Add sensory details. Use accessible, warm language.\\n\\n"
                    "Output JSON with keys: title, summary, full_text, follow_up_question, "
                    "tags (list), year, location, emotion.\\n\\n"
                    f"Memory: {combined}"
                ),
            }],
        )
        import json
        data = json.loads(message.content[0].text)
        return GeneratedStory(**data)

    OR with OpenAI GPT-4o:

        import openai, json
        client = openai.AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])

        response = await client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a warm ghostwriter..."},
                {"role": "user", "content": request.transcript},
            ],
        )
        data = json.loads(response.choices[0].message.content)
        return GeneratedStory(**data)
    """
    await asyncio.sleep(2.0)

    story = random.choice(MOCK_STORIES)
    return GeneratedStory(**story)


@app.post("/api/generate-caption", response_model=CaptionResponse)
async def generate_caption(photo: Optional[UploadFile] = File(None)):
    """
    Generate a title and caption for an uploaded photo.

    REAL AI INTEGRATION — replace the mock below with OpenAI GPT-4o Vision:

        import openai, base64, json
        client = openai.AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])

        image_bytes = await photo.read()
        b64 = base64.b64encode(image_bytes).decode()
        mime = photo.content_type or "image/jpeg"

        response = await client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{mime};base64,{b64}"},
                    },
                    {
                        "type": "text",
                        "text": (
                            "This is an old photo from a senior citizen's personal "
                            "collection. Generate JSON with:\\n"
                            "- title: warm evocative title (6-10 words)\\n"
                            "- caption: 2-3 sentence caption in second person, "
                            "emotionally resonant\\n"
                            "Write as if speaking to the person who lived this moment."
                        ),
                    },
                ],
            }],
        )
        data = json.loads(response.choices[0].message.content)
        return CaptionResponse(title=data["title"], caption=data["caption"], confidence=0.92)

    OR with Google Gemini Vision:

        import google.generativeai as genai
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        model = genai.GenerativeModel("gemini-1.5-pro")
        image_bytes = await photo.read()
        ...
    """
    await asyncio.sleep(1.5)

    result = random.choice(MOCK_CAPTIONS)
    return CaptionResponse(**result, confidence=0.91)


@app.post("/api/text-to-speech")
async def text_to_speech(text: str = Form(...), voice: str = Form("warm")):
    """
    Convert story text to speech audio.

    REAL AI INTEGRATION — replace with ElevenLabs or OpenAI TTS:

    ElevenLabs:
        import httpx
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
                headers={"xi-api-key": os.environ["ELEVENLABS_API_KEY"]},
                json={"text": text, "model_id": "eleven_monolingual_v1"},
            )
        from fastapi.responses import Response
        return Response(content=response.content, media_type="audio/mpeg")

    OpenAI TTS:
        client = openai.AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
        response = await client.audio.speech.create(
            model="tts-1", voice="nova", input=text
        )
        return Response(content=response.content, media_type="audio/mpeg")
    """
    return {"message": "TTS not yet connected — see comments in main.py", "text_length": len(text)}
