import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useLogoutMutation,
  useDispatch,
  setAuth,
  authInitialState,
  useLoginWithUserPassMutation,
} from "store";

export type LoginStatus = "error" | "warning" | "success" | "idle";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
});

export function useLogin() {
  const dispatch = useDispatch();
  const [loginWithUserPass, { isLoading, data, isSuccess, isError }] =
    useLoginWithUserPassMutation();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async ({ username, password }, { setSubmitting }) => {
      setSubmitting(true);
      await loginWithUserPass({
        body: {
          username,
          password,
        },
      }).unwrap();
      if (!isLoading) {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (data && data.status === "success") {
        dispatch(setAuth(data.payload));
      } else {
        dispatch(setAuth({ username: "", authId: "" }));
      }
    }
  }, [isLoading, data]);

  const isLoginFailed =
    data?.payload?.authId === "" && data?.payload?.username === "";

  let status: LoginStatus = "idle";
  if (isSuccess && !isLoginFailed) {
    status = "success";
  }
  if (isSuccess && isLoginFailed) {
    status = "warning";
  }
  // @ts-ignore
  if (isError || data?.status === "failure") {
    status = "error";
  }

  return { formik, isSuccess, isError, isLoginFailed, status };
}

export function useLogout() {
  const dispatch = useDispatch();
  const [logout, { data, isLoading }] = useLogoutMutation();

  useEffect(() => {
    logout().unwrap();
  }, []);

  useEffect(() => {
    if (!!data && !data.payload.authId) {
      dispatch(setAuth(authInitialState["auth"]));
    }
  }, [data?.payload.authId]);

  return { isLoading };
}
