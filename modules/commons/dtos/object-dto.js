import * as yup from "yup";

export const objectDto = yup.object().shape({
    name: yup.string().required(),
    url: yup.string().required()
});
