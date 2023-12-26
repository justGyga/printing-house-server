import * as yup from "yup";

export const catalogItemDto = yup.object().shape({
    name: yup.string().required().min(8).max(100),
    description: yup.string().min(30)
});
