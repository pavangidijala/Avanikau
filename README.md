# Roast Bot

A funny/savage AI chatbot website powered by Groq's free API.

## Files
- `index.html` — the chat website (frontend)
- `api/chat.js` — backend function that talks to Groq (keeps your API key hidden)

## Setup steps

1. Get a free Groq API key at https://console.groq.com
2. Create a GitHub repo and upload all these files (keep the folder structure — `api/chat.js` must stay inside an `api` folder)
3. Go to https://vercel.com, sign in with GitHub, click "Add New Project", and import this repo
4. Before deploying, add an environment variable:
   - Name: `GROQ_API_KEY`
   - Value: (paste your Groq key)
5. Click Deploy. You'll get a live link like `your-project.vercel.app`
6. Open the link, test the chat, then share the link with your friend

## Notes
- Never put the Groq API key directly in `index.html` — it would be visible to anyone who views the page source.
- The model used is `llama-3.3-70b-versatile` (fast + free on Groq). You can swap it for another Groq model name in `api/chat.js` if you want.
