import { useEffect, useState } from "react";
import usePendingFunction from "/src/use/usePendingFunction.jsx";
import UtilFunctions from "/src/util/UtilFunctions.js";

function AuthStore() {

  const [loginUser, setLoginUser] = useState(undefined);

  const [authTrigger] = usePendingFunction(async () => {
    setLoginUser(() => UtilFunctions.getUserByAccessJwt());
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
