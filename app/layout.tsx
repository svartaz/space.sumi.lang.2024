import dic from '../lib/lexicology';
import './layout.sass';

export default ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <title>man-made tongue {dic.get('_self').token}</title>
    </head>
    <body>{children}</body>
  </html>
);
