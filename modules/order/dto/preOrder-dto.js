import * as yup from "yup";

export const preOrderDto = yup.object().shape({
    catalogReference: yup.string().uuid(),
    circulation: yup.number().integer().positive().required(),
    name: yup.string().min(10).required(),
    description: yup.string().min(10)
});
