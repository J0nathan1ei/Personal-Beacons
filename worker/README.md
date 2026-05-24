# Visitor Counter Worker

This Cloudflare Worker stores the page view count in Workers KV and returns the
next visitor number to the GitHub Pages frontend.

## Deploy

1. Log in to Cloudflare:

   ```bash
   npx wrangler login
   ```

2. Create a KV namespace:

   ```bash
   npx wrangler kv namespace create VISITOR_COUNTER
   ```

3. Copy the returned `id` into `wrangler.jsonc`, replacing
   `REPLACE_WITH_KV_NAMESPACE_ID`.

4. Deploy the Worker:

   ```bash
   npx wrangler deploy
   ```

5. Copy the deployed Worker URL, then set `visitorCounterEndpoint` in
   `script.js` to that URL.

6. Test locally, then commit and push the updated frontend.

Current deployed endpoint:

```text
https://personal-beacon-counter.jonathanlei-ps.workers.dev
```

## Response

The Worker returns:

```json
{
  "count": 129
}
```
