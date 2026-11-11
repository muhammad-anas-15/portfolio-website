# Ask-my-AI worker

A tiny Cloudflare Worker that powers the "Ask my AI" chat on the portfolio.
It keeps the API key secret, only accepts requests from the portfolio's domain,
rate-limits each visitor, and answers **only** from `src/data/portfolio.js`.

Until it's deployed, the website uses a built-in offline assistant, so the chat
always works.

## One-time setup (≈10 minutes, free)

1. **Get a Gemini API key**: https://aistudio.google.com/apikey (free tier).
   Check the current free model name there. If it isn't `gemini-2.5-flash`,
   update `GEMINI_MODEL` in `wrangler.toml`.
2. **Create a free Cloudflare account**: https://dash.cloudflare.com/sign-up
3. In this folder:
   ```bash
   npm install
   npx wrangler login                    # opens the browser
   npx wrangler secret put GEMINI_API_KEY   # paste the key when asked (it is encrypted)
   npx wrangler deploy
   ```
   The deploy prints a URL like `https://anas-portfolio-ai.<you>.workers.dev`.
4. In the portfolio root, create `.env.production` containing:
   ```
   VITE_ASK_AI_URL=https://anas-portfolio-ai.<you>.workers.dev
   ```
   Then rebuild and deploy the site (`npm run deploy`).

## Switching to Claude

Set `PROVIDER = "claude"` in `wrangler.toml`, run
`npx wrangler secret put ANTHROPIC_API_KEY`, and `npx wrangler deploy`.
The default model is `claude-opus-5-5`; for the lowest cost per chat, set
`CLAUDE_MODEL = "claude-haiku-5-5"`.

## Updating what the bot knows

Edit `src/data/portfolio.js` in the portfolio, then run `npx wrangler deploy` here
again. The bot reads the same file the website does.

## Hard rate limit (recommended)

The built-in limit (15 requests per minute per IP) applies per Worker instance, so
it's best effort. For a strict, global limit, add Cloudflare's Workers **Rate Limiting**
binding (Cloudflare docs → Workers → Runtime APIs → Rate Limiting) and call it at the
top of the handler. Also set a monthly spending cap on your AI provider account.
