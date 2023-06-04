import {
  YStack,
  Input,
  Form,
  Button,
  Label,
  Switch,
  Spinner,
  XStack,
  Spacer,
} from "ui";
import { useLogin } from "../hooks/auth.hooks";

const LoginScreen = () => {
  const { formik } = useLogin();

  return (
    <YStack>
      <Form padding="$4" onSubmit={formik.handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          disabled={formik.isSubmitting}
          autoCorrect={false}
          onChangeText={formik.handleChange("username")}
          value={formik.values.username}
          inputMode="text"
          textContentType="username"
        />
        <Label htmlFor="username">Password</Label>
        <Input
          id="password"
          autoCorrect={false}
          disabled={formik.isSubmitting}
          onChangeText={formik.handleChange("password")}
          value={formik.values.password}
          secureTextEntry={true}
          inputMode="text"
          textContentType="password"
        />
        <Spacer />
        <XStack>
          <Label htmlFor="remember-me">Remember me</Label>
          <Switch
            id="remember-me"
            disabled={formik.isSubmitting}
            onCheckedChange={(rememberMe) =>
              formik.setFieldValue("rememberMe", rememberMe)
            }
            checked={formik.values.rememberMe}
          >
            <Switch.Thumb animation="quick" />
          </Switch>
        </XStack>
        <Spacer />
        <Form.Trigger asChild>
          <Button
            // @ts-expect-error
            // This prop doesn't exist for tamagui or rn-web
            // but it's required by formik
            type="submit"
            icon={formik.isSubmitting ? () => <Spinner /> : undefined}
          >
            Login
          </Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
};

export default LoginScreen;
