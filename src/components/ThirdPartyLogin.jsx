import { thirdPartyConfig } from "../lib/const";

export function ThirdPartyLogin() {
  const providers = thirdPartyConfig;
  return (
    <>
      {providers.map((provider) => (
        <button
          key={provider.name}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-cyan-500 bg-[#131314] p-2 text-sm font-medium text-white hover:bg-[#171718]"
          onClick={() => {
            window.location.href =
              import.meta.env.VITE_BACKEND_URL + `/auth/login/${provider.name}`;
          }}
        >
          <img
            className="h-[18px] w-[18px]"
            src={provider.icon}
            alt={provider.name}
          />
          Continue with{" "}
          {provider.name[0].toUpperCase() + provider.name.slice(1)}
        </button>
      ))}
    </>
  );
}
