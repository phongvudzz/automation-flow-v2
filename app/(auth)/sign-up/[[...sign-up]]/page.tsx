import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: "text-sm !shadow-none text-primary-foreground",
        },
      }}
    />
  );
}
