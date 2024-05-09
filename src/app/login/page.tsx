"use client";
import React, { useEffect, useState } from "react";
import { getSession, login } from "@/utils/Lib";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const loginfunc = async (formdata: FormData) => {
    try {
      await login(formdata);
      router.replace("/home");
      // redirect("/home");
    } catch (e: any) {
      setError(e);
    }
  };

  const getSessionFunc = async () => {
    const res = await getSession();
    console.log(res);
    setSession(res);
  };

  useEffect(() => {
    getSessionFunc();
  }, []);

  if (session) {
    router.replace("/home");
  } else
    return (
      <div className="w-full h-full flex flex-col items-center justify-between py-4  ">
        <form
          className="flex flex-col items-center justify-center gap-4 md:w-1/2"
          action={loginfunc}
        >
          <Label className="md:text-lg">
            Login and share courses with people
          </Label>
          <div className=" rounded-md p-4 border-t-[2px] border-slate-200 md:w-full flex flex-col items-center gap-4">
            {error ? (
              <div className="w-[300px] md:w-1/2 bg-red-600 text-white rounded-md text-center py-2">
                {error.message}
              </div>
            ) : (
              ""
            )}
            <div className="w-[300px] md:w-1/2 ">
              <Label>Email</Label>
              <Input placeholder="Email" type="email" name="email" />
            </div>
            <div className="w-[300px]  md:w-1/2 ">
              <Label>Password</Label>
              <Input placeholder="Password" type="password" name="password" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link href={"/register"}>
                <Button variant={"link"}>
                  Dont you have an account? Register
                </Button>
              </Link>
              <Button>Login</Button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default LoginPage;
