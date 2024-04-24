import { useRouter } from "next/router";
import {
  Center,
  Notification,
  BackgroundImage,
  Button,
  Flex,
  Divider,
} from "@mantine/core";

const Error = () => {
  const router = useRouter();
  return (
    <>
      <BackgroundImage
        src="/desk.jpeg"
        h={"100vh"}
        w={"100vw"}
        visibleFrom="sm"
      >
        <Center h={"100vh"} w={"100vw"}>
          <Notification
            color="red"
            title="Ops, something went wrong with the sign In"
            withCloseButton={false}
            p={20}
          >
            <Divider mb={20} mt={10} />
            <Flex gap={"xl"} align={"center"}>
              <Button
                onClick={() => router.push("/signIn")}
                color={"#ffcf56"}
                c={"black"}
              >
                GO BACK TO SIGN IN
              </Button>
              or
              <Button
                onClick={() => router.push("/home")}
                color={"#ffcf56"}
                c={"black"}
              >
                BROWSE AS A GUEST
              </Button>
            </Flex>
          </Notification>
        </Center>
      </BackgroundImage>
      <BackgroundImage
        src="/mobile.jpeg"
        h={"100vh"}
        w={"100vw"}
        hiddenFrom="sm"
      >
        <Center h={"100vh"} w={"100vw"}>
          <Notification
            onClick={() => router.push("signIn")}
            title="Sign In Failed"
            color="red"
          >
            Something went wrong with the signIn, click to go back
          </Notification>
        </Center>
      </BackgroundImage>
    </>
  );
};

export default Error;
