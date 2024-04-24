import { Center, Flex, Button, Space, BackgroundImage } from "@mantine/core";
import SignInForm from "../../components/signInForm/SignInForm";
import Link from "next/link";

const SignIn = () => {
  return (
    <>
      <BackgroundImage
        src="/desk.jpeg"
        h={"100vh"}
        w={"100vw"}
        visibleFrom="sm"
      >
        <Center h={"100vh"} w={"100vw"}>
          <Flex direction={"column"} align={"center"} justify={"center"}>
            <SignInForm />
            <Space h={20} />
            <Link href={"/"}>
              <Button color={"#ffcf56"} c={"black"}>
                HOME
              </Button>
            </Link>
          </Flex>
        </Center>
      </BackgroundImage>
      <BackgroundImage
        src="/mobile.jpeg"
        h={"100vh"}
        w={"100vw"}
        hiddenFrom="sm"
      >
        <Center h={"100vh"} w={"100vw"}>
          <Flex direction={"column"} align={"center"} justify={"center"}>
            <SignInForm />
            <Space h={20} />
            <Link href={"/"}>
              <Button color={"#ffcf56"} c={"black"}>
                HOME
              </Button>
            </Link>
          </Flex>
        </Center>
      </BackgroundImage>
    </>
  );
};

export default SignIn;
