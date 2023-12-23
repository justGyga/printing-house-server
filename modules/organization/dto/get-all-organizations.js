import * as yup from "yup";
import { ORGANIZATION_TYPE } from "../../commons/enums/organization-type.js";

export const organizationType = yup.object().shape({
    type: yup.number().oneOf(Object.values(ORGANIZATION_TYPE)).required()
});
