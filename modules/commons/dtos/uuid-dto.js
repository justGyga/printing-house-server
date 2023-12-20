import * as yup from "yup";

export const uuidDto = yup.object().shape({ id: yup.string().uuid().required() });

export const uuidArrayDto = yup.object().shape({ ids: yup.array().of(yup.string().uuid()).min(1).unique("array is not unique").required() });
