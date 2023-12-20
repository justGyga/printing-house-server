import * as yup from "yup";

export const signUpDto = yup.object().shape({
    login: yup.string().required().min(4).max(24),
    password: yup.string().required().min(4).max(24),
    name: yup.string().required(),
    surname: yup.string().required(),
    mail: yup.string().required().email().typeError("Must be an email string")
});
