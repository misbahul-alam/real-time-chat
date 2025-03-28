"use client";
import Button from "@/components/widgets/Button";
import InputField from "@/components/widgets/InputField";
import Link from "next/link";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import Form from "next/form";
import { login } from "@/lib/auth";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function page() {
  const router = useRouter();
  const [state, action, isLoading] = useActionState(login, {
    message: "",
    status: "",
  });
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
      router.push("/");
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <>
      <section className="bg-gray-100 ">
        <div className="flex flex-col items-center justify-center sm:px-6 sm:py-8 mx-auto md:min-h-screen lg:py-0 ">
          <div className="w-full bg-white sm:rounded-lg sm:shadow-sm  md:mt-0 sm:max-w-lg xl:p-0  ">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Login
              </h1>

              <Form className="space-y-1" action={action}>
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  icon={<MdEmail />}
                />

                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  icon={<PiPasswordFill />}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-start py-1">
                    <div className="flex items-center h-5 rounded-md overflow-hidden">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer "
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 "
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    href={"/forget"}
                    className="text-sm font-light text-gray-500"
                  >
                    Forget password
                  </Link>
                </div>
                <Button
                  title="LOGIN"
                  className={"w-full"}
                  loading={isLoading}
                />

                <p className="text-sm font-light text-gray-500 ">
                  I have no account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Create an account
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
