import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export const authCheckLoader = () => {
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
}

export const authFormLoader = () => {
    try {
        const encryptedBytes = Cookies.get('auth')
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedBytes, process.env.REACT_APP_SECRET_KEY);
        const auth = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
        if(!auth.id || !auth.email) {
            Cookies.remove('auth')
            throw new Error('Unauthenticated!')
        }
        return redirect('/')
    } catch (error) {
        return true
    }
}


export const logoutLoader = async () => {
    const response = fetch(process.env.REACT_APP_API_URL + '/logout', {
        method: 'POST',
        credentials: 'include'
    })

    Cookies.remove('auth')
    return redirect('/login')
}
