import { type FC } from "react";
import {
  YStack,
  Input,
  Form,
  Button,
  Label,
  Switch,
  Spinner,
  XStack,
  FormMessage,
} from "ui";
import { useLogin, type LoginStatus } from "../hooks/auth.hooks";
import { useRouter } from "solito/router";
import { ErrorBoundary } from "react-error-boundary";
import { ScreenFallback } from "../fallbacks/Screen.fallback";

type InputFieldProps = {
  // TODO remove `any type
  formik: any;
  fieldName: string;
  label: string;
  autoCorrect: boolean;
} & Parameters<typeof Input>[0];

const InputField: FC<InputFieldProps> = ({
  formik,
  fieldName,
  label,
  ...inputProps
}) => {
  const touched = formik.touched[fieldName];
  const errors = formik.errors[fieldName];
  const status = !!touched && !!errors ? "error" : "idle";
  const colors = setFormFieldColors(status);

  return (
    <YStack
      backgroundColor={colors.bg}
      borderRadius="$4"
      paddingLeft="$4"
      paddingRight="$4"
      paddingBottom="$4"
      paddingTop="$1"
    >
      <XStack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Label htmlFor="username">{label}</Label>
        {status !== "idle" ? (
          <FormMessage color={colors.toast} alignment="right">
            {errors}
          </FormMessage>
        ) : null}
      </XStack>
      <Input
        id={fieldName}
        disabled={formik.isSubmitting}
        // @ts-ignore
        readOnly={formik.isSubmitting}
        onBlur={formik.handleBlur(fieldName)}
        value={formik.values[fieldName]}
        onChangeText={formik.handleChange(fieldName)}
        {...inputProps}
      />
    </YStack>
  );
};

interface FormSubmitProps {
  // TODO remove `any type
  formik: any;
  status: LoginStatus;
}

function setFormFieldColors(status: FormSubmitProps["status"]) {
  switch (status) {
    case "error":
      return {
        bg: "#300",
        toast: "#f00",
      };
    case "warning":
      return {
        bg: "#330",
        toast: "#ff0",
      };
    case "success":
      return {
        bg: "#030",
        toast: "#0F0",
      };
    default:
      return {
        bg: undefined,
        toast: undefined,
      };
  }
}

function setStatusMessage(status: LoginStatus): string {
  switch (status) {
    case "success":
      return "Success! Logging you in…";
    case "error":
      return "Something went wrong…";
    case "warning":
      return "Wrong username or password";
    default:
      return "";
  }
}

/**
 * @dev
 * #1 This prop doesn't exist for tamagui or rn-web but it's required
 * by formik
 */
const FormSubmit: FC<FormSubmitProps> = ({ formik, status }) => {
  const colors = setFormFieldColors(status);
  const statusMessage = setStatusMessage(status);

  return (
    <YStack
      backgroundColor={colors.bg}
      borderRadius="$4"
      paddingLeft="$4"
      paddingRight="$4"
      paddingBottom="$4"
      paddingTop="$4"
    >
      <Form.Trigger asChild disabled={formik.isSubmitting}>
        <Button
          disabled={formik.isSubmitting}
          // @ts-expect-error: #1
          type="submit"
          icon={formik.isSubmitting ? () => <Spinner /> : undefined}
        >
          Login
        </Button>
      </Form.Trigger>
      {!!statusMessage ? (
        <FormMessage color={colors.toast} alignment="center" paddingTop="$4">
          {statusMessage}
        </FormMessage>
      ) : null}
    </YStack>
  );
};

const LoginScreen = () => {
  const { formik, status } = useLogin();
  const { back } = useRouter();

  return (
    <ErrorBoundary FallbackComponent={ScreenFallback}>
      <YStack fullscreen>
        <Form
          flexGrow={1}
          paddingTop="$4"
          paddingBottom="$4"
          onSubmit={formik.handleSubmit}
          space="$2"
          justifyContent="center"
        >
          <InputField
            formik={formik}
            fieldName="username"
            label="Username"
            autoCorrect={false}
            inputMode="text"
            secureTextEntry={false}
            textContentType="username"
          />
          <InputField
            formik={formik}
            fieldName="password"
            label="Password"
            autoCorrect={false}
            inputMode="text"
            secureTextEntry={true}
            textContentType="password"
          />
          <XStack
            justifyContent="space-between"
            paddingLeft="$4"
            paddingRight="$4"
            paddingBottom="$2"
            paddingTop="$2"
          >
            <Label htmlFor="remember-me">Remember me</Label>
            <Switch
              id="remember-me"
              disabled={formik.isSubmitting}
              onCheckedChange={(rememberMe) =>
                formik.setFieldValue("rememberMe", rememberMe)
              }
              checked={formik.values.rememberMe}
            >
              <Switch.Thumb animation="fast" />
            </Switch>
          </XStack>

          <FormSubmit formik={formik} status={status} />
        </Form>
        <YStack padding="$4">
          <Button onPress={() => back()}>Try another method</Button>
        </YStack>
      </YStack>
    </ErrorBoundary>
  );
};

export default LoginScreen;
