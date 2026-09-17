const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function getSupportReply({ history, userContext }) {
  const systemPrompt = `You are a support assistant for a ride-hailing app.
You can see the user's context: ${JSON.stringify(userContext)}.
Answer questions about ride status, fares, and cancellations.
If you cannot resolve the issue, tell the user you're escalating to a human agent.`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    system: systemPrompt,
    messages: history.map(m => ({ role: m.role, content: m.content }))
  });

  return response.content[0].text;
}

module.exports = { getSupportReply };