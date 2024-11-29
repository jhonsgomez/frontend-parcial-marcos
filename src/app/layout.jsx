import '@/styles/globals.css';

export const metadata = {
  title: "Chat - APP",
  icons: {
    icon: "img/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
