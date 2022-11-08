import jwt_decode from "jwt-decode";

const AuthVerify = () => {

    const addMinutes = (minutes: number) => {
        const dateNow = new Date()
        dateNow.setSeconds(dateNow.getSeconds() + minutes);
        // dateNow.setMinutes(dateNow.getMinutes() + minutes);
        return dateNow;
    }

    const token = localStorage.getItem("userToken")
    if (token) {
        const jwt_Token_decoded: any = jwt_decode(token);
        const expDate = localStorage.getItem("tokenExpirationDate")
        if (expDate) {
            if (Date.parse(expDate) < Date.now()) {
                localStorage.clear();
            } else {
                localStorage.setItem("tokenExpirationDate", addMinutes(20).toString())
            }
        }
        else {
            localStorage.setItem("tokenExpirationDate", new Date(jwt_Token_decoded.exp * 1000).toString())
        }
    }

    return <div></div>;
};

export default AuthVerify;