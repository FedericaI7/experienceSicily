"use client";

import { useSearchParams } from "next/navigation";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Notification,
  Space,
} from "@mantine/core";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const SignInForm = () => {
  const [signInFailed, setSignInFailed] = useState(false);
  const [type, toggle] = useToggle(["signIn", "signUp"]);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [signUpCompleted, setSignUpCompleted] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      name: "",
      lastname: "",
      password: "",
      terms: true,
    },

    validate: {
      username: (val) =>
        val.length < 2 ? "Name must have at least 2 letters" : null,
      password: (val) => (val.length >= 4 ? null : "Invalid password"),
    },
  });

  const handleSignIn = async () => {
    const username = form.values.username;
    const password = form.values.password;

    await signIn("credentials", {
      username,
      password,
      callbackUrl: callbackUrl || "/",
      redirect: true,
    });
  };

  const handleSignUp = async () => {
    const userData = {
      username: form.values.username,
      email: form.values.email,
      name: form.values.name,
      lastname: form.values.lastname,
      password: form.values.password,
      favorites: [],
    };
    fetch("/api/user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          toggle();
          setSignUpCompleted(true);
          signIn("credentials", {
            username: form.values.username,
            password: form.values.password,
            callbackUrl: callbackUrl || "/",
            redirect: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const signInError = searchParams.get("error");

    if (signInError) {
      setSignInFailed(true);
    }
  }, [searchParams]);

  return (
    <Paper radius={"md"} p={"xl"} withBorder>
      {signInFailed && (
        <>
          <Notification
            onClick={() => setSignInFailed(false)}
            title="Sign In Failed"
            color="red"
          >
            Invalid username and/or password
          </Notification>
          <Space h="md" />
        </>
      )}
      {signUpCompleted && (
        <>
          <Notification
            onClick={() => setSignUpCompleted(false)}
            title="Sign Up Completed!"
            color="green"
          >
            You'll be redirected to the application soon...
          </Notification>
          <Space h="md" />
        </>
      )}

      <form>
        <Stack>
          {/* {type === "signUp" && (
            <TextInput
              label={"Name"}
              placeholder={"Your name"}
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius={"md"}
            />
          )} */}

          <TextInput
            required
            label={"Username"}
            placeholder={"username"}
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            radius={"md"}
          />

          <Divider />

          {type === "signUp" && (
            <>
              <TextInput
                required
                label={"Email"}
                placeholder={"Your email"}
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                radius={"md"}
              />

              <Divider />

              <TextInput
                required
                label={"Name"}
                placeholder={"Your Name"}
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius={"md"}
              />

              <Divider />

              <TextInput
                required
                label={"Lastname"}
                placeholder={"Your Lastname"}
                value={form.values.lastname}
                onChange={(event) =>
                  form.setFieldValue("lastname", event.currentTarget.value)
                }
                radius={"md"}
              />
            </>
          )}

          <div>
            <PasswordInput
              required
              label={"Password"}
              placeholder={"Your password"}
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={form.errors.password}
              radius={"md"}
            />
          </div>

          {type === "signUp" && (
            <Checkbox
              label={"I accept terms and conditions"}
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify={"space-between"} mt={"xl"}>
          <Anchor
            component={"button"}
            type={"button"}
            c={"dimmed"}
            onClick={() => toggle()}
            size={"xs"}
          >
            {type === "signUp"
              ? "Click here for Sign In"
              : "Click here for Sign Up"}
          </Anchor>
          {type === "signIn" ? (
            <Button
              // type={'submit'}
              c={"black"}
              color="#ffcf56"
              onClick={() => {
                handleSignIn();
              }}
            >
              {upperFirst(type)}
            </Button>
          ) : (
            <Button
              // type={'submit'}
              c={"black"}
              color="#ffcf56"
              onClick={() => {
                handleSignUp();
              }}
            >
              {upperFirst(type)}
            </Button>
          )}
        </Group>
      </form>
    </Paper>
  );
};

export default SignInForm;
