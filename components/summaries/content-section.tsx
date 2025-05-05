function parsePoints(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^./.test(point);

  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{1F1E6}-\u{1F1FF}\u{FE0F}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();
  

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {

const cleanContent = content.replace(/^[·]\s*/, "").trim();

  // Match emoji(s) at the start, followed by optional text
  const matches = cleanContent.match(/^(\p{Emoji}+)?(.*)$/u);

  if (!matches) return { emoji: "", text: cleanContent };

  const [, emoji = "", text = ""] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim() || cleanContent, // Fallback to full content if no text
  };
}

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoints(point);
        const { emoji, text } = parseEmojiPoint(point) || { emoji: "", text: point };

        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return (
            <div
              key={index}
              className="group relative bg-linear-to-br from-gray-200/[0.08] to gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
            >
              <div className="absolute inset-0 bg-linear-tp-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative flex item-start gap-3 ">
                <span className="text-lg lg:text-xl shrink-0 pt-1 ">
                  {emoji}
                </span>
                <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                  {text}
                </p>
              </div>
            </div>
          );
        }
        return (
          <div
            key={index}
            className="group relative bg-linear-to-br from-gray-200/[0.08] to gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
          >
            <div className="absolute inset-0 bg-linear-tp-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

            <div className="relative flex item-start gap-3 ">
              <span className="text-lg lg:text-xl shrink-0 pt-1 ">{emoji}</span>
              <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                {text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
