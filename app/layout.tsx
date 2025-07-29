import dic from '../lib/words';
import './layout.sass';

export default ({ children }: { children: React.ReactNode }) => (
  <html lang="ja">
    <head>
      <title>個人言語 {dic.get('_self').token}</title>
    </head>
    <body>{children}</body>
  </html>
);
