// ! User
import { catalogInitter } from "./organization/models/catalog.js";
import { organizationInitter } from "./organization/models/organization.js";
import { userInitter } from "./user/models/user.js";
// ! DTF
import { dtfPrintingOrderInitter } from "./dtf-printing/models/order.js";
import { dtfPrintingObjectInitter } from "./dtf-printing/models/printing-object.js";
// ! Large format
import { grommetInitter } from "./large-format-printing/models/grommet.js";
import { laminationLargeFormatInitter } from "./large-format-printing/models/lamination.js";
import { largeFormatOrderInitter } from "./large-format-printing/models/order.js";
import { largeFormatPrintingObjectInitter } from "./large-format-printing/models/printing-object.js";
// ! Offset
import { cuttingOffsetInitter } from "./offset-printing/models/cutting.js";
import { embossingOffsetInitter } from "./offset-printing/models/embossing.js";
import { laminationOffsetInitter } from "./offset-printing/models/lamination.js";
import { offsetPolishOffsetInitter } from "./offset-printing/models/offset-polish.js";
import { offsetOrderInitter } from "./offset-printing/models/order.js";
import { paperOffsetInitter } from "./offset-printing/models/paper.js";
import { varnishingOffsetInitter } from "./offset-printing/models/varnishing.js";
// ! Sublimation
import { sublimationOrderInitter } from "./sublimation-printing/models/order.js";
import { sublimationPrintingInitter } from "./sublimation-printing/models/printing-object.js";
// ! Technical order
import { technicalOrderInitter } from "./technical-order/models/technical-order.js";
// ! Ultraviolet
import { ultravioletPrintingOrderInitter } from "./ultraviolet-printing/models/order.js";
import { ultravioletPrintingInitter } from "./ultraviolet-printing/models/printing-object.js";
// ! Order
import { orderInitter } from "./order/models/order.js";
import { tempOrderInitter } from "./order/models/temp-order.js";

const userAndOrgModels = [organizationInitter, userInitter, catalogInitter];
const dtfModels = [dtfPrintingOrderInitter, dtfPrintingObjectInitter];
const largeFormatModels = [largeFormatOrderInitter, laminationLargeFormatInitter, grommetInitter, largeFormatPrintingObjectInitter];
const offsetModels = [
    offsetOrderInitter,
    offsetPolishOffsetInitter,
    cuttingOffsetInitter,
    embossingOffsetInitter,
    laminationOffsetInitter,
    paperOffsetInitter,
    varnishingOffsetInitter
];
const sublimationModels = [sublimationOrderInitter, sublimationPrintingInitter];
const ultravioletModels = [ultravioletPrintingInitter, ultravioletPrintingOrderInitter];
const ordersModels = [orderInitter, tempOrderInitter];

export default [ordersModels, userAndOrgModels, dtfModels, largeFormatModels, offsetModels, sublimationModels, technicalOrderInitter, ultravioletModels].flat();
