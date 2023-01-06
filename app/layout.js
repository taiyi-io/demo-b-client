import { ContextProvider } from '../components/context';
import Boot from './bootstrap';

let npmPackage = require("../package.json");



export default function RootLayout({ children }) {
  const version = npmPackage.version;
  const defaultLang = 'cn';
  const defaultUser = 'demo';

  const defaultContext = {
    lang: defaultLang,
    user: defaultUser,
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
