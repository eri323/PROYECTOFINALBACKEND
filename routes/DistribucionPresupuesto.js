import { Router } from "express";
import { check } from "express-validator";
import httpDistribucionPresupuesto from "../controllers/DistribucionPresupuesto.js";
import validarCampos from "../middelwares/validarcampos.js"
import helpersPresupuesto from "../helpers/validar_presupuesto.js";
import helpersDisPresupuesto from "../helpers/distribucionPresupuesto.js";

const routers = Router();

routers.get('/dispresupuestobusca', [validarCampos], httpDistribucionPresupuesto.getDistribucionPresupuesto);

routers.get('/dispresupuestobuscaid/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo Id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.getDistribucionPresupuestoId);

routers.post('/dispresupuestocrear', [
    check("Presupuesto", "Indique un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Lote_id", "Se necesita el lote").not().isEmpty(),
    check("Lote_id", "Se necesita el lote").isMongoId(),
    check("ItemPresupuesto_id", "Se necesita el ItemPresupuesto_id").not().isEmpty(),
    check("ItemPresupuesto_id", "Se necesita el ItemPresupuesto_id").isMongoId(),
    check("ItemPresupuesto_id", "Se necesita el ItemPresupuesto_id").custom(helpersDisPresupuesto.validarPreDisUnica),
    validarCampos
], httpDistribucionPresupuesto.postDistribucionPresupuesto);

routers.put('/dispresupuestomodificar/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    check("Presupuesto", "Indique un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Lote_id", "Se necesita el lote").not().isEmpty(),
    check("Lote_id", "Se necesita el lote").isMongoId(),
    check("ItemPresupuesto_id", "Se necesita el ItemPresupuesto_id").not().isEmpty(),
    check("ItemPresupuesto_id", "Se necesita el ItemPresupuesto_id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuesto);

routers.put('/ajustarPresupuesto/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuesto", "No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDistribucionPresupuesto.putAjustarPresupuesto)


routers.put('/dispresupuestoinac/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuestoInactivar); // Cambio de rtbuses.putBusInactivar a httpDistribucionPresupuesto.putAreaInactivar

routers.put('/dispresupuestoact/:id', [ // Cambio de /activarBus/:id a /activarArea/:id
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuestoActivar);

export default routers;