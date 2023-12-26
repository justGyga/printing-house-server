import * as yup from "yup";
import { ORDER_TYPE } from "../../commons/enums/order-type.js";

export const resultOrderDto = yup.object().shape({
    name: yup.string().required(),
    circulationMain: yup.number().integer().positive().required(),
    circulationAdditional: yup.number().integer().positive().required(),
    printingId: yup.string().uuid(),
    type: yup.number().oneOf(Object.values(ORDER_TYPE))
});
