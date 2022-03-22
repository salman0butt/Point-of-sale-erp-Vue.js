import ProductService from "@/services/products/ProductService";
import Swal from "sweetalert2";





const addProductMiddleware = (to, from, next) => {

    // checking if department exist or not
    ProductService.getAll(1, 5)
        .then(({ data }) => {
            if ((data.data).length < 1) {
                Swal.fire({
                    title: '<strong>Product Required</u></strong>',
                    icon: 'info',
                    html:
                        'Please Add Product First',
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Great!',

                });

                next('/products/create');
            }

        })
        .catch((err) => {
            console.log(err);
        });



    next();
}


export default addProductMiddleware;
