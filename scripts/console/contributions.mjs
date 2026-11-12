// Reads the open source block that scripts/oss-block keeps up to date
// (scripts/oss-block/contributions.md) and turns each bullet into a row item.
const LINE = /^- \[((?:\\.|[^\]\\])*)\]\((https:\/\/github\.com\/[^\s)]+)\): (.*)$/;
const ENTITIES = { '&lt;': '<', '&gt;': '>', '&amp;': '&' };
const plain = (s) => s.replace(/\\(.)/g, '$1').replace(/&(lt|gt|amp);/g, (m) => ENTITIES[m]);

/** Markdown bullets between the oss markers -> [{label, text, url}]. Other lines are ignored. */
export function parseContributions(md) {
  return md.split('\n').map((l) => l.match(LINE)).filter(Boolean)
    .map(([, label, url, text]) => ({ label: plain(label), text: plain(text), url }));
}
