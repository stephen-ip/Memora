export default function handler(req, res) {
  if (req.method != "POST") return res.json({ error: "request must be POST" });
  return res
    .setHeader(
      "Set-Cookie",
      "token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    )
    .json({ message: "logged out" });
}
