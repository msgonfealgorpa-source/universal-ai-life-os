export async function analyzeRequest(query, userId = "guest") {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, userId }),
  });
  return res.json();
}
