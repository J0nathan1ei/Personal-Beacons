const allowedOrigins = new Set([
  "https://j0nathan1ei.github.io",
  "http://localhost:4273",
  "http://127.0.0.1:4273",
]);

const counterKey = "personal-beacon-visitors";

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
  };

  if (allowedOrigins.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }

  return headers;
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(origin),
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin),
      });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, origin);
    }

    if (!allowedOrigins.has(origin)) {
      return json({ error: "Origin not allowed" }, 403, origin);
    }

    const currentValue = await env.VISITOR_COUNTER.get(counterKey);
    const currentCount = Number.parseInt(currentValue || "0", 10);
    const nextCount = Number.isFinite(currentCount) ? currentCount + 1 : 1;

    await env.VISITOR_COUNTER.put(counterKey, String(nextCount));

    return json({ count: nextCount }, 200, origin);
  },
};
