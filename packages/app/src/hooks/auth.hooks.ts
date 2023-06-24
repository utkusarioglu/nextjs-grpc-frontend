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
      await loginWithUserPass({ username, password }).unwrap();
      if (!isLoading) {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!isLoading) {
      if (data && data.authId) {
        dispatch(setAuth(data));
      }
    }
  }, [isLoading, data?.authId]);

  const isLoginFailed = data?.authId === "" && data?.username === "";

  let status: LoginStatus = "idle";
  if (isSuccess && !isLoginFailed) {
    status = "success";
  }
  if (isSuccess && isLoginFailed) {
    status = "warning";
  }
  if (isError) {
    status = "error";
  }

  return { formik, isSuccess, isError, isLoginFailed, status };
}

export function useLogout() {
  const dispatch = useDispatch();
  const [logout, { data, isLoading }] = useLogoutMutation();

  useEffect(() => {
    logout(null).unwrap();
  }, []);

  useEffect(() => {
    if (!!data && !data.authId) {
      dispatch(setAuth(authInitialState));
    }
  }, [data?.authId]);

  return { isLoading };
}
