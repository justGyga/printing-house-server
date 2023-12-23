import * as yup from "yup";
import { ORGANIZATION_TYPE } from "../../commons/enums/organization-type.js";

export const newOrganization = yup.object().shape({
    name: yup.string().required().min(5),
    type: yup.number().integer().required().oneOf(Object.values(ORGANIZATION_TYPE)),
    inn: yup
        .string()
        .required()
        .matches(/^\d{12}$/),
    number: yup
        .string()
        .required()
        .matches(/^8\(\d{3}\)\d{3}-\d{2}-\d{2}$/),
    address: yup.string().required()
});
