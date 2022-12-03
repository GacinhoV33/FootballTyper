import jwt_decode from "jwt-decode";
import { UserStatus } from "../../App";


export interface AuthVerifyProps{
    setUserStatus: React.Dispatch<React.SetStateAction<UserStatus>>
}

const AuthVerify: React.FC<AuthVerifyProps> = ({setUserStatus}) => {

    const addMinutes = (minutes: number) => {
        const dateNow = new Date()
        dateNow.setMinutes(dateNow.getMinutes() + minutes);
        return dateNow;
    }

    const token = localStorage.getItem("userToken")
    if (token) {
        const jwt_Token_decoded: any = jwt_decode(token);
        const expDate = localStorage.getItem("tokenExpirationDate")
        if (expDate) {
            if (Date.parse(expDate) < Date.now()) {
                localStorage.clear();

                // reseting local hook responsible for user status
                const userStatus: UserStatus = {
                    userLocalData: {
                      username: '',
                      email: '',
                      fullname: '',
                      id: 0,
                    },
                    isUserSigned: false,
                  }
                  setUserStatus(userStatus)
            } else {
                localStorage.setItem("tokenExpirationDate", addMinutes(24*60).toString())
            }
        }
        else {
            localStorage.setItem("tokenExpirationDate", new Date(jwt_Token_decoded.exp * 1000).toString())
        }
    }

    return <div></div>;
};

export default AuthVerify;