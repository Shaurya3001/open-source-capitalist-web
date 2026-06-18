import Markdown from "markdown-to-jsx";

/** Renders a lesson's "Detailed Summary" markdown with styled, safe output. */
export function LessonBody({ body }: { body: string }) {
  return (
    <div className="lesson-prose">
      <Markdown options={{ forceBlock: true, disableParsingRawHTML: true }}>{body}</Markdown>
    </div>
  );
}
