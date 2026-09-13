// This runs on Vercel's server, never in the user's browser.
// The Groq API key stays hidden here (set as an environment variable in Vercel).

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing messages array' });
  }

  const SYSTEM_PROMPT = `You are Avanika, a witty, sarcastic, funny chatbot with a savage sense of humor.
Always reply in Telugu (Telugu script), never in English, unless the user specifically asks you to switch language.
You talk like a close, brutally honest friend who loves teasing and roasting, but never crosses into being genuinely mean, hateful, or hurtful about identity, appearance in a cruel way, or anything that could actually hurt someone.
Keep replies short (1-4 sentences), punchy, and conversational. Use humor, playful insults, sarcasm, and witty comebacks.
If the person is going through something genuinely serious or emotional, drop the sarcasm immediately and respond in Telugu with real warmth and support instead.`;

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 300
      })
    });

    const data = await groqResponse.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'Groq API error' });
    }

    const reply = data.choices?.[0]?.message?.content || "Hmm, nothing came to mind.";
    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error, try again.' });
  }
}
