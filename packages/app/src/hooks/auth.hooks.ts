import { useEffect } from "react";
import { useFormik } from "formik";
import {
  useLogoutMutation,
  useDispatch,
  setAuth,
  authInitialState,
  useLoginWithUserPassMutation,
} from "store/src";

export function useLogin() {
  const dispatch = useDispatch();
  const [loginWithUserPass, { isLoading, data }] =
    useLoginWithUserPassMutation();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
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

  return { formik };
}

export function useLogout() {
  const dispatch = useDispatch();
  const [logout, { data, isLoading }] = useLogoutMutation();

  useEffect(() => {
    logout(null).unwrap();
  }, []);

  useEffect(() => {
    if (!!data && !data.authId) {
      console.log("dispatch firing", { data });
      dispatch(setAuth(authInitialState));
    }
  }, [data?.authId]);

  return { isLoading };
}
