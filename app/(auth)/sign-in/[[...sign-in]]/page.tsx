import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: "text-sm !shadow-none text-primary-foreground",
        },
      }}
    />
  );
}
