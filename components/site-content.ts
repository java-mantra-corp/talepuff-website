/**
 * Every fact the site states, in one place, so a change of price or plan is one edit.
 * Plain data only: no JSX, so pages and the API route can both import it.
 */
export const SITE_NAME = "Talepuff";
export const COMPANY = "Java Mantra Corp";
export const SUPPORT_EMAIL = "hello@talepuff.com";
export const APP_SCHEME = "talepuff://";

export const plan = {
  monthly: 9.99,
  yearly: 79.99,
  trialDays: 14,
  children: 4,
  cubes: 2,
  newStoriesPerChildPerNight: 3,
} as const;

export const storytellers = [
  {
    name: "Grandpa Oak",
    voice: "Slow, warm and a little gravelly",
    likes: "Woodland animals, patient heroes, stories that end by a fire",
  },
  {
    name: "Nana Willow",
    voice: "Gentle and musical",
    likes: "Kind witches, gardens, lullaby endings",
  },
  {
    name: "Captain Barnaby",
    voice: "Booming, then a whisper for the good bit",
    likes: "Ships, maps, treasure that turns out to be friends",
  },
  {
    name: "Pip the Fairy",
    voice: "Quick and bright",
    likes: "Tiny adventures, talking teacups, giggles",
  },
  {
    name: "Sunny Sage",
    voice: "Calm and clear",
    likes: "Space, dinosaurs, how things work, then sleep",
  },
] as const;

export const steps = [
  {
    title: "Press the top",
    body: "The whole top of the cube is the button. A small chime says the cube is listening.",
  },
  {
    title: "Say what you'd like",
    body: "\"A story about a dragon who is scared of the dark.\" Eight seconds, in your child's own words.",
  },
  {
    title: "A storyteller begins",
    body: "A story made just for that request, for your child's age, in a voice they chose. About two minutes long, and it ends with sleep.",
  },
  {
    title: "Press again to stop",
    body: "One touch pauses everything, and the storyteller says goodnight. No menus, no screen, no volume wars.",
  },
] as const;

export const promises = [
  {
    title: "No screen, ever",
    body: "There is nothing to look at. The cube is a button, a light and a voice, which is exactly what bedtime needs.",
  },
  {
    title: "Made for your child",
    body: "Every story is written for that request and that age. A four-year-old and a nine-year-old asking for a dragon get different dragons.",
  },
  {
    title: "Checked before it is spoken",
    body: "Five layers of checks stand between a request and a story: on what was asked, on what was written, and on the rules each storyteller keeps.",
  },
  {
    title: "The microphone is a button, not a bug",
    body: "It listens for eight seconds after a press and at no other time. Nothing is recorded in between, and the audio of a request is never kept.",
  },
  {
    title: "A library that belongs to your family",
    body: "Every story is saved. \"The one from last night\" is a press away, and you can read every title in the app.",
  },
  {
    title: "You are in charge",
    body: "The app shows what your child asked for, lets you change the storyteller, and deletes everything the moment you say so.",
  },
] as const;

export const faqs = [
  {
    q: "Does it need Wi-Fi?",
    a: "Yes. Stories are made on Talepuff's servers, never on the cube, so the cube needs your home Wi-Fi. Setup takes about two minutes in the app. If the internet is down, the cube still tells a small set of stories it keeps on board.",
  },
  {
    q: "Is it listening all the time?",
    a: "No. The microphone is switched on for eight seconds after the button is pressed and is off the rest of the time. There is no wake word.",
  },
  {
    q: "What ages is it for?",
    a: "Children from about two to twelve. You set each child's age in the app and every story is written for it.",
  },
  {
    q: "What if my child asks for something they shouldn't hear?",
    a: "The storyteller politely declines and offers something else. Every request and every story passes checks before a word is spoken, and you can see what was asked in the app.",
  },
  {
    q: "Can two children share one cube?",
    a: "Yes. Each child has a profile with their own age, storyteller and library. The cube asks who it is talking to.",
  },
  {
    q: "What does the plan include?",
    a: `New stories every night, up to ${plan.newStoriesPerChildPerNight} per child, for up to ${plan.children} children and ${plan.cubes} cubes on one family plan. Replays are always free. The first ${plan.trialDays} days are on us, starting from the first story.`,
  },
  {
    q: "What happens if I stop paying?",
    a: "The cube keeps working. Every story already told stays and can be replayed; only new stories pause until the plan is back on.",
  },
  {
    q: "Can I delete everything?",
    a: "Yes. Remove a child in the app and every story, title and request for that child is erased. Close the account and the rest goes with it.",
  },
] as const;

export const nav = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/privacy", label: "For parents" },
  { href: "/support", label: "Support" },
] as const;

export const legalLinks = [
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy-policy", label: "Privacy policy" },
  { href: "/legal/returns", label: "Returns" },
] as const;
