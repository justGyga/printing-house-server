import * as yup from "yup";

export const registrationDto = yup.object().shape({
    login: yup.string().min(4).max(24),
    password: yup.string().required().min(4).max(24),
    mail: yup.string().email().typeError("Must be an email string")
});
