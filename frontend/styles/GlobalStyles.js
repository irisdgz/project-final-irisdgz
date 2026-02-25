import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root{
    /* Grebban-ish: neutral, high contrast, lots of whitespace */
    --bg: #ffffff;
    --text: #111111;
    --muted: #666666;
    --border: #e7e7e7;
    --surface: #f7f7f7;

    --radius: 16px;

    /* spacing scale */
    --s1: 6px;
    --s2: 10px;
    --s3: 16px;
    --s4: 24px;
    --s5: 40px;
    --s6: 64px;

    /* layout */
    --max: 1120px;
  }

  * { box-sizing: border-box; }
  html, body { height: 100%; }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
    line-height: 1.35;
    letter-spacing: -0.01em;
  }

  a { color: inherit; text-decoration: none; }
  a:hover { text-decoration: underline; }

  img { max-width: 100%; display: block; }

  /* accessible focus */
  :focus-visible {
    outline: 3px solid rgba(17,17,17,0.25);
    outline-offset: 2px;
    border-radius: 8px;
  }

  /* Typography scale: editorial */
  h1, h2, h3, h4 { margin: 0; letter-spacing: -0.03em; }
  h1 { font-size: clamp(32px, 4vw, 56px); line-height: 1.05; }
  h2 { font-size: clamp(22px, 2.4vw, 32px); line-height: 1.1; }
  h3 { font-size: 18px; line-height: 1.2; }
  p { margin: 0; color: var(--text); }
  .muted { color: var(--muted); }
`;