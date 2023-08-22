import Swal from "sweetalert2";  
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export const getAuth = () => {
    if(document.cookie && Cookies.get('auth')){
        try {
            const encryptedBytes = Cookies.get('auth')
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedBytes, process.env.REACT_APP_SECRET_KEY);
            const auth = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
            if(!auth.id || !auth.email) {
                Cookies.remove('auth')
                throw new Error('Unauthenticated!')
            }
            return auth
        } catch (error) {
            return redirect('/login')
        }
    }else{
        return redirect('/login')
    }
}

export const dateTime = (dateFromServevr) => {
    let date =  new Date(dateFromServevr)
    let format = date.getHours() + 'hr ' + date.getMinutes() + 'min ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    return format
}

export const warning = (message) => {
    Swal.fire({  
        title: message,  
        // text: message,  
        icon: 'warning',  
    });  
}

export const success = (message) => {
    Swal.fire({  
        title: message,  
        type: 'success',  
        icon: 'success',  
    });  
}