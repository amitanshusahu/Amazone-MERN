import StyledComponentsRegistryAntd from './lib/AntdRegistry';
import StyledComponentsRegistry from './lib/registry'
import './public/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistryAntd>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </StyledComponentsRegistryAntd>
      </body>
    </html>
  );
}
