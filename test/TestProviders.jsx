import { OverlayProvider } from "@lib/providers/OverlayProvider";
import { AuthProvider } from "@lib/providers/AuthProvider";

// eslint-disable-next-line react/prop-types
export function TestProviders({ children }) {
  return (
    <OverlayProvider>
      <AuthProvider>{children}</AuthProvider>
    </OverlayProvider>
  );
}
