type signupType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
};

type loginType = {
  email: string;
  password: string;
};

type loginReturnType = {
  
};

export { signupType, loginType };
