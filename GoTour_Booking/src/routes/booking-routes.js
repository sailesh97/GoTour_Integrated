import { home, getAllBooking, addBooking, getBookingById, updateBooking, deleteBooking } from '../controllers/booking-controller';

export default class Routes{
    constructor(app){
        this.app = app;
    }

    appRoutes(){
        this.app.route("/")
        .get(home);

        this.app.route('/booking')
            .get(getAllBooking)
            .post(addBooking);

        this.app.route('/booking/:bookingId')
            .get(getBookingById)
            .put(updateBooking)
            .delete(deleteBooking);
    }

    routesConfig(){
        this.appRoutes();
    }  
}