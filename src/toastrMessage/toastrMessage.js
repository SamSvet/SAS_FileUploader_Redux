import toastr from "toastr";

toastr.options = {
    "positionClass": "toast-top-center",
    "timeOut": "3000",
    "progressBar": true
}

export const toastrMessage = {
    error: (message) => toastr.error(message),
    success: (message) => toastr.success(message),
    info: (message) => toastr.info(message),
    warning: (message) => toastr.warning(message),
}