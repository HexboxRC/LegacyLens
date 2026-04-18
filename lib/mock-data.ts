export interface Story {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  year: string;
  location: string;
  people: string[];
  emotion: string;
  photoUrl?: string;
  photoCaption?: string;
  createdAt: string;
  tags: string[];
  audioUrl?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatarInitials: string;
  color: string;
}

export const MOCK_STORIES: Story[] = [
  {
    id: "story-1",
    title: "The Summer We Learned to Dance",
    summary:
      "A warm July evening in 1962 when your father taught you the foxtrot on the back porch, and the whole neighborhood came out to watch.",
    fullText: `It was the summer of 1962, and the heat in Cincinnati sat heavy on everything like a wool blanket that nobody asked for. My father — a quiet man who rarely showed much of anything — came home one Friday evening with a record under his arm and a rare grin on his face.

"Rosie," he said, using the name only he ever called me, "tonight we're going to dance."

I was seventeen and certain I knew everything. But the way he said it stopped me cold. He set up the old RCA on the back porch, and when that first note of Glenn Miller drifted out into the warm evening air, something shifted.

He held out his hand like a gentleman at a ball and taught me the foxtrot, step by patient step. I kept stepping on his feet. He never once winced.

By nine o'clock, Mrs. Patterson from next door had pulled up a lawn chair, and her husband came out with a pitcher of lemonade. The Kowalski kids watched from the fence. Father didn't notice any of them — or pretended not to.

That night lives in me still. Not because of the dancing, though I've loved it ever since. But because it was the first time I understood that quiet people have whole worlds inside them, and sometimes, if you're lucky, they let you in.

I think of him every time I hear Glenn Miller. I think of lemonade and warm evenings and the way his hand steadied mine when I couldn't find the rhythm.`,
    year: "1962",
    location: "Cincinnati, Ohio",
    people: ["Father", "Mrs. Patterson", "The Kowalski children"],
    emotion: "Warm and grateful",
    photoUrl: "/photos/dance-memory.jpg",
    photoCaption: "The back porch where it all happened — summer, 1962",
    createdAt: "2024-11-15",
    tags: ["family", "father", "dancing", "summer", "childhood"],
  },
  {
    id: "story-2",
    title: "The Day the War Ended",
    summary:
      "August 1945. You were eight years old, and the whole street erupted in joy when the news came through the radio.",
    fullText: `I was eight years old and sitting on the front stoop, shelling peas into a bowl for Mama, when the radio inside started crackling something different.

I didn't understand all the words. But I understood the way my mother dropped the dish towel she was holding. I understood the sound she made — not a word exactly, more like a door opening somewhere deep inside her.

Within minutes, our street was alive in a way I had never seen. Mr. Abramowitz from the dry goods store was running — running! — down the sidewalk with his arms in the air. Mrs. Deluca was crying and kissing her rosary. Old Henry from the corner lot, who never said much to anybody, was banging a pot with a wooden spoon and singing something in Italian.

My brother Tommy, who was fifteen and always trying to seem older than he was, grabbed my hand and pulled me into the street. We danced in a circle with children we barely knew, dizzy and laughing.

I didn't understand grief yet, not the way adults did. But I felt the release of it that day — the collective exhale of an entire nation letting go of something terrible.

My father came home from the plant early. He sat in his chair, put his face in his hands, and wept. That was the only time I ever saw him cry.

Some moments are too big for memory to hold all at once. I've been carrying pieces of that day my whole life.`,
    year: "1945",
    location: "Brooklyn, New York",
    people: ["Mama", "Brother Tommy", "Mr. Abramowitz", "Mrs. Deluca"],
    emotion: "Overwhelming joy mixed with something profound",
    photoUrl: "/photos/vj-day.jpg",
    photoCaption: "Our block on V-J Day — everyone came outside",
    createdAt: "2024-11-20",
    tags: ["history", "WWII", "family", "community", "childhood"],
  },
  {
    id: "story-3",
    title: "First Day at the Steel Mill",
    summary:
      "September 1955 — nervous and eighteen years old, you walked into the Pittsburgh mill and found not just a job, but a brotherhood.",
    fullText: `I walked through those mill gates on a September morning in 1955 and felt the heat hit me like I'd opened an oven door. I was eighteen years old, and I had never been so scared in my life.

My father had worked that mill for twenty-two years. His father before him. There was an understanding in our family that didn't need words.

The foreman, a broad man named Sal with a jaw like a cinder block, looked me up and down and said, "You Frank Marino's boy?" When I said yes, something in his face settled. "Good man, your father," was all he said. That was my welcome.

The work was brutal and magnificent. The furnaces roared all night long. You learned to read the steel by the color of its glow — orange was too hot, yellow was just right, white meant something was wrong. The men who taught me this had hands like leather and voices that cut through the noise without effort.

By lunchtime on my first day, I knew every man's name on our crew. By the end of the week, they knew mine.

There is a brotherhood in hard work that I've never found anywhere else. A respect that doesn't need to be asked for. You showed up, you didn't complain, you looked out for the man next to you. That was the whole code.

I worked that mill for thirty-one years. I raised four children on those wages. When they tore it down in 1986, I stood outside the gates one last time and couldn't speak.

Some things you can't explain to people who weren't there. You just carry it.`,
    year: "1955",
    location: "Pittsburgh, Pennsylvania",
    people: ["Sal (foreman)", "Father", "Mill crew"],
    emotion: "Pride, fear, belonging",
    photoUrl: "/photos/steel-mill.jpg",
    photoCaption: "The Pittsburgh mill — we called it 'the furnace'",
    createdAt: "2024-12-01",
    tags: ["work", "mill", "Pittsburgh", "father", "pride", "history"],
  },
  {
    id: "story-4",
    title: "The Christmas We Had Nothing",
    summary:
      "1949. No gifts under the tree, but your mother made a feast from almost nothing, and it became the Christmas everyone talks about.",
    fullText: `The Christmas of 1949 was the year my father lost his job at the foundry. He tried to keep it from us children, the way parents do — speaking in low voices after we were in bed, money suddenly becoming something that hung in the air unspoken.

There would be no gifts. We knew, without being told.

But my mother — God, my mother — she treated that Christmas like a personal challenge. She spent three days in that kitchen. The smells alone were a kind of magic: star anise and orange peel, rosemary and browning butter. She made bread from scratch. She called up the neighbors and swapped things no family needed for things every family wanted.

On Christmas morning, there was no pile of boxes under the tree. There was instead a table so full it strained.

We ate for four hours. We told stories. My uncle played the harmonica. My grandmother, who had survived things we will never be asked to survive, sat at the head of the table looking around at all of us with an expression I now understand was not happiness exactly, but something deeper — the recognition that enough was actually, truly enough.

I've thought about that Christmas many times since, especially in years when I had plenty and still felt something missing.

I think my mother knew something that takes most people a lifetime to learn: that abundance and gratitude are not the same thing, but gratitude can make almost anything feel like abundance.

We had nothing. We had everything.`,
    year: "1949",
    location: "South Philadelphia, Pennsylvania",
    people: ["Mother", "Father", "Uncle", "Grandmother"],
    emotion: "Gratitude, warmth, insight",
    photoUrl: "/photos/christmas-1949.jpg",
    photoCaption: "The table Mama set that Christmas — nothing was missing",
    createdAt: "2024-12-10",
    tags: ["Christmas", "family", "mother", "gratitude", "holiday", "1940s"],
  },
];

export const MOCK_FAMILY_MEMBERS: FamilyMember[] = [
  { id: "fm-1", name: "Sarah Chen", relation: "Granddaughter", avatarInitials: "SC", color: "bg-rose-200 text-rose-800" },
  { id: "fm-2", name: "Michael Romano", relation: "Son", avatarInitials: "MR", color: "bg-blue-200 text-blue-800" },
  { id: "fm-3", name: "Linda Romano", relation: "Daughter-in-law", avatarInitials: "LR", color: "bg-purple-200 text-purple-800" },
  { id: "fm-4", name: "James Romano", relation: "Grandson", avatarInitials: "JR", color: "bg-green-200 text-green-800" },
];

export const FOLLOW_UP_QUESTIONS = [
  "What year was that, and how old were you?",
  "Who else was there with you?",
  "What did the place look, smell, or sound like?",
  "How did that moment make you feel?",
  "Did anything happen that surprised you?",
  "Is there something you wish you had said or done differently?",
  "What did that experience teach you about life?",
  "Do you have any photos or mementos from that time?",
  "How did this moment change you?",
  "What would you want your grandchildren to know about this?",
];

export const MOCK_AI_RESPONSES: Record<string, string> = {
  default: `What a beautiful memory you've shared. The way you describe it brings that moment so vividly to life.

I can feel the warmth and meaning in what you've told me. This is exactly the kind of story that deserves to be preserved — not just as a record of what happened, but as a window into who you are and the world you lived in.

Your family will treasure this. The details you've noticed — the sounds, the people, the feelings — those are what make a memory real for someone who wasn't there.

Thank you for trusting us with this piece of your life.`,
};
