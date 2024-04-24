import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mantine/core";

const SignInButton = () => {
  const { data: session } = useSession();
  return (
    <Button
      color="purple"
      onClick={() => {
        session ? signOut() : signIn();
      }}
    >
      {session ? "SIGN OUT" : "SIGN IN"}
    </Button>
  );
};

export default SignInButton;
