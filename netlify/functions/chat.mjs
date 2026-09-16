const MAX_MESSAGE = 2000;
const MAX_HISTORY = 8;

const portfolioContext = `
You are Yadu's AI Portfolio Assistant. Answer questions using only the portfolio facts below.

PERSON
Name: Yadu Krishnan
Role: Full Stack Developer
Location: Kerala, India
Education: BSc Computer Science, LBS Model Degree College, Parappanangadi, University of Calicut.
Experience: MERN Stack Development Intern at Bridgeon Solutions.

TECHNOLOGIES
Frontend: HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS, Bootstrap, Redux Toolkit, React Router, Vite.
Backend: Node.js, Express.js, REST APIs, JWT, bcrypt, Nodemailer, Multer.
Database: MongoDB, Mongoose, PostgreSQL, Prisma.
Other: Git, GitHub, Razorpay, Cron Jobs.

PROJECT: EXPIROFF
Type: food-prevention / e-commerce platform.
Live: https://food-expireoff-d26823.netlify.app/
Stack: React, Node.js, Express.js, MongoDB, Mongoose, Cron Jobs.
Summary: Designed around reducing waste from products approaching expiry, with expiry-related backend processing.

PROJECT: SHOPLY
Type: full-stack e-commerce application.
Live: https://e-commerce-app-shoply-git-master-yaduykp123s-projects.vercel.app/
Stack: React, Vite, Tailwind CSS, Redux Toolkit, Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, Razorpay.
Features: product browsing, brand filtering, infinite scroll, shimmer loading UI, cart, wishlist, orders, authentication, admin product management, pagination, image upload and Razorpay payment integration.

CONTACT
Email: yadukrishnanP917@gmail.com
GitHub profile: https://github.com/yaduykp123

RULES
- Never invent experience, statistics, salaries, clients, awards, user counts, certifications or technologies.
- Never claim Yadu has used a tool unless it appears above.
- If information is unavailable, say that it is not documented in the portfolio.
- Do not pretend to be Yadu. You are the portfolio assistant.
- Be concise and professional.
- When helpful, provide the relevant live project link from the context above.
`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });
}

export default async (request) => {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!process.env.OPENAI_API_KEY) return json({ error: 'AI service is not configured' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }

  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE) : '';
  if (!message) return json({ error: 'Message is required' }, 400);

  const history = Array.isArray(body?.history)
    ? body.history.filter(x => x && (x.role === 'user' || x.role === 'assistant') && typeof x.content === 'string').slice(-MAX_HISTORY)
    : [];

  const input = [
    { role: 'developer', content: portfolioContext },
    ...history.map(item => ({ role: item.role, content: item.content.slice(0, MAX_MESSAGE) }))
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        input,
        max_output_tokens: 500,
        store: false
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI response error', data);
      return json({ error: 'AI request failed' }, 502);
    }

    const reply = typeof data.output_text === 'string' ? data.output_text.trim() : '';
    if (!reply) return json({ error: 'AI returned no text' }, 502);
    return json({ reply });
  } catch (error) {
    console.error('AI network error', error);
    return json({ error: 'AI service unavailable' }, 502);
  }
};
