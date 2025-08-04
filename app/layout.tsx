import './layout.sass';

export default ({ children }: { children: React.ReactNode }) => (
  <html lang="ja">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={'anonymous'}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Zen+Kaku+Gothic+New&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>{children}</body>
  </html>
);
