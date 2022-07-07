import httpProxy from 'express-http-proxy';

import { home, addCustomer, signIn, ensureToken, verifyToken} from '../controllers/auth-controller';

const tripMicroserviceUrl = process.env.TRIP_MICROSERVICE_URL;
const tripListServiceProxy = httpProxy(tripMicroserviceUrl);

const paymentMicroserviceUrl = process.env.PAYMENT_MICROSERVICE_URL;
const paymentServiceProxy = httpProxy(paymentMicroserviceUrl);

export default class Routes{
    constructor(app){
        this.app = app;
    }

    appRoutes(){
        this.app.route("/")
        .get(home);

        this.app.route("/signUp")
            .post(addCustomer);

        this.app.route("/signIn")
            .post(signIn);

        this.app.route("/triplist")
            .get(tripListServiceProxy);

        this.app.route("/triplist")
            .post(ensureToken,verifyToken,tripListServiceProxy);
    
        this.app.route("/triplist/:destName")
            .delete(ensureToken,verifyToken,tripListServiceProxy);

        this.app.route("/booking")
            .get(ensureToken,verifyToken,paymentServiceProxy)
            .post(ensureToken,verifyToken,paymentServiceProxy);

        this.app.route("/booking/:bookingId")
            .get(ensureToken,verifyToken,paymentServiceProxy)
            .put(ensureToken,verifyToken,paymentServiceProxy)
            .delete(ensureToken,verifyToken,paymentServiceProxy);
    }

    routesConfig(){
        this.appRoutes();
    }    
}
