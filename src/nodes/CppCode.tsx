import {Code, LezerHighlighter, withDefaults} from '@motion-canvas/2d';
import {parser} from '@lezer/cpp';

const CppHighlighter = new LezerHighlighter(parser);

export const CppCode = withDefaults(Code, {
  highlighter: CppHighlighter,
});