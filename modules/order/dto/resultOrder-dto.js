import * as yup from "yup";
import { ORDER_TYPE } from "../../commons/enums/order-type.js";

const schemaBuilder = (type, schema) => {
    if (type == ORDER_TYPE.DTF || type == ORDER_TYPE.SUBLIMATION || type == ORDER_TYPE.ULTRAVIOLET) {
        return schema.shape({
            objectId: yup.string().uuid().required()
        });
    }
    if (type == ORDER_TYPE.LARGE_FORMAT) {
        return schema.shape({
            description: yup.string().min(30),
            object: yup.object().shape({
                name: yup.string().required(),
                description: yup.string().min(30)
            }),
            grommet: yup.object().shape({
                shape: yup.string().required(),
                size: yup.number().positive().required(),
                distance: yup.number().positive().required(),
                description: yup.string().min(30)
            }),
            lamination: yup.object().shape({
                frontSide: yup.boolean().required(),
                backSide: yup.boolean().required(),
                surface: yup.boolean().required(),
                description: yup.string().min(30)
            })
        });
    }
    if (type == ORDER_TYPE.OFFSET) {
        return schema.shape({
            density: yup.number().positive().required(),
            labelX: yup.number().positive().required(),
            labelY: yup.number().positive().required(),
            countPurchasedSheets: yup.number().positive().integer().required(),
            widthPurchasedSheets: yup.number().positive().required(),
            heightPurchasedSheets: yup.number().positive().required(),
            countColorsFront: yup.number().positive().integer().required(),
            countColorsBack: yup.number().positive().integer().required(),
            cutting: yup.object().shape({
                width: yup.number().positive().required(),
                height: yup.number().positive().required(),
                description: yup.string().min(30)
            }),
            embossing: yup.object().shape({
                description: yup.string().min(30).required()
            }),
            lamination: yup.object().shape({
                frontSide: yup.boolean().required(),
                backSide: yup.boolean().required(),
                surface: yup.boolean().required(),
                description: yup.string().min(30)
            }),
            polish: yup.object().shape({
                frontSide: yup.boolean().required(),
                backSide: yup.boolean().required(),
                description: yup.string().min(30)
            }),
            paper: yup.object().shape({
                name: yup.string().required()
            }),
            varnishing: yup.object().shape({
                frontSide: yup.boolean().required(),
                backSide: yup.boolean().required(),
                surface: yup.boolean().required(),
                description: yup.string().min(30)
            })
        });
    }
};

export const resultOrderDto = yup.object().shape({
    name: yup.string().required(),
    organizationId: yup.string().uuid().required(),
    circulationMain: yup.number().integer().positive().required(),
    circulationAdditional: yup.number().integer().positive().required(),
    type: yup.number().oneOf(Object.values(ORDER_TYPE)),
    subDoc: yup.lazy(() => yup.object().when("type", schemaBuilder)),
    description: yup.string().min(30)
});
