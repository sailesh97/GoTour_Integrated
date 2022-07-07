import { addTripList, getAllTripList ,deleteListById } from "../controllers/triplist-controller";

export default class Routes{
    
    constructor(app){
        this.app = app;
    }

    appRoutes(){
        this.app.route("/triplist")
        .get(getAllTripList)
        .post(addTripList);

        this.app.route("/triplist/:id")
            .delete(deleteListById);
    }

    routesConfig(){
        this.appRoutes();
    }    
}


