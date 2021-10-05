import DepartmentService from "@/services/departments/DepartmentService";
import DesignationService from "@/services/designations/DesignationService";
import Swal from "sweetalert2";





const addEmployeeMiddleware = (to, from, next) => {

    // checking if department exist or not
    DepartmentService.getAll(1, 10)
        .then(({ data }) => {
            if ((data.data).length < 1) {
                Swal.fire({
                    title: '<strong>Designation Required</u></strong>',
                    icon: 'info',
                    html:
                        'Please Add Designation First',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Great!',

                });

                next('/designations/index');
            }

        })
        .catch((err) => {
            console.log(err);
        });


    DesignationService.getAll(0, 10)
        .then(({ data }) => {
            if ((data.data).length < 1) {
                Swal.fire({
                    title: '<strong>Designation Required</u></strong>',
                    icon: 'info',
                    html:
                        'Please Add Designation First',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Great!',

                });

                next('/designations/index');
            }

        })
        .catch((err) => {
            console.log(err);
        });


    next();
}


export default addEmployeeMiddleware;
