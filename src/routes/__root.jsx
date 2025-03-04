import { ChangeAccountDetailsForm } from "@components/ChangeAccountDetailsForm";
import { ChangeAvatarForm } from "@components/ChangeAvatarForm";
import { ChangePasswordForm } from "@components/ChangePasswordForm";
import { Layout } from "@components/Layout";
import { LenisWrapper } from "@components/LenisWrapper";
import { Overlay } from "@components/Overlay";
import { SearchBarMobile } from "@components/SearchBar";
import { SignInForm } from "@components/SignInForm";
import { SignUpForm } from "@components/SignUpForm";
import { AuthProvider } from "@lib/providers/AuthProvider";
import { OverlayProvider } from "@lib/providers/OverlayProvider";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { useMemo } from "react";
import { Flip, ToastContainer } from "react-toastify";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  const modalTypes = useMemo(
    () => ({
      "sign-in": <SignInForm />,
      "sign-up": <SignUpForm />,
      "change-avatar": <ChangeAvatarForm />,
      "change-password": <ChangePasswordForm />,
      "change-details": <ChangeAccountDetailsForm />,
      search: <SearchBarMobile />,
    }),
    [],
  );

  return (
    <LenisWrapper>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        theme="dark"
        toastClassName={"bg-[#070B11] border-double border-4 border-cyan-500"}
      />
      <OverlayProvider>
        <AuthProvider>
          <Overlay modalTypes={modalTypes} />
          <Layout>
            <Outlet />
            {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
          </Layout>
        </AuthProvider>
      </OverlayProvider>
      <ScrollRestoration />
    </LenisWrapper>
  );
}
