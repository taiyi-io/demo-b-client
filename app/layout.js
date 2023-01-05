import { ContextProvider } from '../components/context';
import Boot from './bootstrap';

let npmPackage = require("../package.json");

const version = npmPackage.version;

export default function RootLayout({ children }) {
  const defaultContext = {
    lang: 'cn',
    user: 'demo',
    version: version,
  }
  
  return (
    <html>
      <body>
        <Boot />
        <ContextProvider value={defaultContext}>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
