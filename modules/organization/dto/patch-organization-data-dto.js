import * as yup from "yup";

export const addressAndNumberDto = yup.object().shape({
    number: yup.string().matches(/^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/),
    address: yup.string()
});
