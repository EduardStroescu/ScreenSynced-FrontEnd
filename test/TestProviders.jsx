import { OverlayProvider } from "@lib/providers/OverlayProvider";
import { AuthProvider } from "@lib/providers/AuthProvider";
import { LenisProvider } from "@lib/providers/LenisProvider";

// eslint-disable-next-line react/prop-types
export function TestProviders({ children }) {
  return (
    <LenisProvider>
      <OverlayProvider>
        <AuthProvider>{children}</AuthProvider>
      </OverlayProvider>
    </LenisProvider>
  );
}
