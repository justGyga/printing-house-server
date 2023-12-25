// ! User
import { organizationInitter } from "./organization/models/organization.js";
import { userInitter } from "./user/models/user.js";
// ! DTF
import { dtfPrintingOrderInitter } from "./dtf-printing/models/order.js";
import { dtfPrintingObjectInitter } from "./dtf-printing/models/printing-object.js";
// ! Large format
import { grommetOffsetInitter } from "./large-format-printing/models/grommet.js";
import { laminationLargeFormatInitter } from "./large-format-printing/models/lamination.js";
import { largeFormatOrderInitter } from "./large-format-printing/models/order.js";
import { largeFormatPrintingObjectInitter } from "./large-format-printing/models/printing-object.js";
// ! Offset
import { cuttingOffsetInitter } from "./offset-printing/models/cutting.js";
import { embossingOffsetInitter } from "./offset-printing/models/embossing.js";
import { laminationOffsetInitter } from "./offset-printing/models/lamination.js";
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

const userAndOrgModels = [organizationInitter, userInitter];
const dtfModels = [dtfPrintingOrderInitter, dtfPrintingObjectInitter];
const largeFormatModels = [largeFormatOrderInitter, laminationLargeFormatInitter, grommetOffsetInitter, largeFormatPrintingObjectInitter];
const offsetModels = [cuttingOffsetInitter, embossingOffsetInitter, laminationOffsetInitter, offsetOrderInitter, paperOffsetInitter, varnishingOffsetInitter];
const sublimationModels = [sublimationOrderInitter, sublimationPrintingInitter];
const ultravioletModels = [ultravioletPrintingInitter, ultravioletPrintingOrderInitter];

export default [userAndOrgModels, dtfModels, largeFormatModels, offsetModels, sublimationModels, technicalOrderInitter, ultravioletModels].flat();
