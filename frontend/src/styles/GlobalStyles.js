import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Core colors */
    --bg: #fafafa;
    --text: #111111;
    --muted: #666666;
    --border: #e7e7e7;
    --surface: #ffffff;

    /* Radius */
    --radius: 16px;

    /* Spacing scale */
    --s1: 6px;
    --s2: 10px;
    --s3: 16px;
    --s4: 24px;
    --s5: 40px;
    --s6: 64px;

    /* Layout */
    --max: 1120px;
  }

  /* Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
      Segoe UI, Roboto, Helvetica, Arial;
    line-height: 1.6;
    letter-spacing: -0.01em;
    -webkit-font-smoothing: antialiased;
  }

  /* Links */
  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Images */
  img {
    max-width: 100%;
    display: block;
  }

  /* Forms inherit typography */
  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  /* Focus (accessible + clean) */
  :focus-visible {
    outline: 3px solid rgba(17, 17, 17, 0.2);
    outline-offset: 2px;
    border-radius: 8px;
  }

  /* Typography */
  h1, h2, h3, h4 {
    margin: 0;
    letter-spacing: -0.03em;
  }

  h1 {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 600;
    line-height: 1.1;
  }

  h2 {
    font-size: clamp(22px, 2.5vw, 32px);
    font-weight: 600;
    line-height: 1.2;
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.2;
  }

  p {
    margin: 0;
    color: var(--text);
  }

  .muted {
    color: var(--muted);
  }

  /* Consistent section spacing */
  section {
    margin-bottom: var(--s4);
  }
`;