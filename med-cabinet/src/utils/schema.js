import * as yup from "yup";

export default yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email must be valid email")
    .required("Email is required"),
  terms: yup.boolean().oneOf([true], "Must accept terms"),
});