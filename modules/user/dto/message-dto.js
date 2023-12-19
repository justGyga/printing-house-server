import * as yup from "yup";

export const messageDto = yup.object().shape({
    message: yup.string().required()
});
