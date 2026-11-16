import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader, Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      issSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      issSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
const navigate = useNavigate();
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type == "signup" ? registerUser : loginUser;
    // await action(inputData);
    try {
      const res = await action(inputData).unwrap(); // .unwrap() lets us catch server responses & errors directly
      toast.success(res?.message || `${type === "signup" ? "Signup" : "Login"} successful.`);
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong.");
    }
  };

  //toast msg 
  // useEffect(() => {
  //   if(registerIsSuccess && registerData){
  //     toast.success(registerData.message || "Signup successful.")
  //   }
  //   if(registerError){
  //     toast.error(registerData.data.message || "Signup failed.")
  //   }
  //   if(loginIsSuccess && loginData){
  //     toast.success(loginData.message || "Login successful.")
  //   }
  //   if(loginError){
  //     toast.error(loginData.data.message || "Login failed.")
  //   }
  // }, [
  //   loginIsLoading,
  //   registerIsLoading,
  //   loginData,
  //   registerData,
  //   loginError,
  //   registerError,
  // ]);

  return (
    <div className="flex  w-full items-center justify-center mt-20 ">
      <div className="w-full max-w-md">
        <Tabs defaultValue="signup" className="flex w-full flex-col gap-3">
          {/* TabsList with light gray background and dark gray text for inactive items */}
          <TabsList className="grid h-11 w-full grid-cols-2 bg-slate-100 p-1 text-slate-600">
            <TabsTrigger
              value="signup"
              className="rounded-md font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
            >
              Signup
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className="rounded-md font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
            >
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="mt-0 w-full">
            <Card className="w-full">
              <CardHeader className="pb-4">
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you're done.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Patel"
                    className="w-full"
                    required="true"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="abc@gmail.com"
                    className="w-full"
                    required="true"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Password"
                    className="w-full"
                    required="true"
                  />
                </div>

                <div className="pt-1">
                  <Button
                    className="bg-black text-white hover:bg-zinc-800 hover:cursor-pointer"
                    disabled={registerIsLoading}
                    onClick={() => handleRegistration("signup")}
                  >
                    {registerIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : 
                      "Signup"
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="login" className="mt-0 w-full">
            <Card className="w-full">
              <CardHeader className="pb-4">
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Welcome back! Enter your details to log in.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="abc@gmail.com"
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="Password"
                    className="w-full"
                  />
                </div>

                <div className="pt-1">
                  <Button
                    className="bg-black text-white hover:bg-zinc-800 hover:cursor-pointer"
                    disabled={loginIsLoading}
                    onClick={() => handleRegistration("login")}
                  >
                    {loginIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : 
                      "Login"
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
