export default function handler(req, res) {
  const body = JSON.parse(req.body);
  const { scorememorytiles, scorenumbermemo, scorecardflip } = body;
  const ptsBelow = {
    memorytiles: 0,
    numbermemo: 0,
    cardflip: 0,
  };
  if (scorememorytiles <= 5) {
    ptsBelow["memorytiles"] += 5 - scorememorytiles;
  }
  if (scorenumbermemo <= 5) {
    ptsBelow["numbermemo"] += 5 - scorenumbermemo;
  }
  if (scorecardflip >= 25) {
    ptsBelow["cardflip"] += scorecardflip - 24;
  }
  const mmseMemoryTiles = ptsBelow["memorytiles"] * 5;
  const mmseNumberMemo = ptsBelow["numbermemo"] * 5;
  const mmseCardFlip = ptsBelow["cardflip"];
  res.json({ mmse: Math.round(30 - ((mmseMemoryTiles + mmseNumberMemo + mmseCardFlip) / 3)) });
}
