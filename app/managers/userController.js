import DecodeToken from "../utils/JWT"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCurrentUserData = async() => {
    let tk = await AsyncStorage.getItem('usuario')

    if (tk) {
      let user = DecodeToken(tk)
      return [user, true];
    } else {
        return [ {}, true];
    }
}