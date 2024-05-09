"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/utils/Lib";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const regitserfunc = async (formdata: FormData) => {
    try {
      await register(formdata);

      router.replace("/home");
    } catch (e: any) {
      setError(e);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-4  ">
      <form
        className="flex flex-col items-center justify-center gap-4 md:w-1/2"
        action={regitserfunc}
      >
        <Label className="md:text-lg">
          Join us and share courses with people.
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
            <Label>Name</Label>
            <Input placeholder="Name" type="text" name="name" />
          </div>
          <div className="w-[300px] md:w-1/2 ">
            <Label>Email</Label>
            <Input placeholder="Email" type="email" name="email" />
          </div>
          <div className="w-[300px] md:w-1/2 ">
            <Label>Password</Label>
            <Input placeholder="Password" type="password" name="password" />
            <Input
              className="mt-4"
              placeholder="Confirm password"
              type="password"
              name="cpassword"
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link href={"/login"}>
              <Button variant={"link"}>Already have an account? login</Button>
            </Link>
            <Button>Register</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
