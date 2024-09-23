import { useEffect, useState } from "react";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import {jwtDecode} from "jwt-decode";
import UtilFunctions from "/src/util/UtilFunctions.js";

function AuthStore() {

  const [loginUser, setLoginUser] = useState(undefined);

  const [authTrigger] = usePendingFunction(async () => {
    setLoginUser(prev => UtilFunctions.getUserByAccessJwt());
    // setLoginUser(prev => null);
    // const accessJwt = localStorage.getItem("accessJwt");
    // if (accessJwt == null) {
    //   return;
    // }
    // const jwtPayload = jwtDecode(accessJwt);
    // if (jwtPayload.username == null) {
    //     return;
    // }
    // const user = {
    //   username : jwtPayload.username,
    //   simpleDescription : jwtPayload.simpleDescription,
    //   profileImage : jwtPayload.profileImage,
    //   roleList : jwtPayload.roleList
    // }
    // setLoginUser(prev => user);
  });

  useEffect(() => {
    if (loginUser === undefined) {
      authTrigger();
    }
  }, [loginUser]);

  return {
    loginUser,
    setLoginUser
  };
}

export default AuthStore;
