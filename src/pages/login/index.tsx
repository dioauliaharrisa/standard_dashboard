import {
  Button,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Container,
} from "@mantine/core";
import styles from "./index.module.css";
import { useAuth } from "../components/auth";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    const isSuccessLogin = await login(values);
    if (isSuccessLogin) {
      navigate("/");
    }
    console.log("🦆 ~ handleSubmit ~ isSuccessLogin:", isSuccessLogin);
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={styles.title}>
          Silahkan Login
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              key={form.key("email")}
              {...form.getInputProps("email")}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              key={form.key("password")}
              required
              {...form.getInputProps("password")}
              mt="md"
            />
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};
