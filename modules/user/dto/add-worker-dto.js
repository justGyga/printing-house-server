import * as yup from "yup";
import { ROLE } from "../../commons/enums/user-role.js";

export const addWorkerDto = yup.object().shape({
    userId: yup.string().uuid().required(),
    role: yup.number().integer().oneOf(Object.values(ROLE)).required()
});
