"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
// import { error } from "console"
import { signIn } from "next-auth/react"
import google from "../public/google.png"
import { toast } from "sonner"
type FormType = "sign-in" | "sign-up";


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3, { message: "Name must be at least 3 characters long" }) : z.string().optional(),
        password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
        email: z.string().email(),
        confirmPassword: type === "sign-up"
            ? z.string().min(4)
            : z.string().optional(),
    }).refine(
        (data) => type === "sign-in" || data.password === data.confirmPassword,
        { message: "Passwords do not match", path: ["confirmPassword"] }
    );

}
const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter()
    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log("Form submitted with values:", values);
            if (type === "sign-in") {
                const res = await fetch("https://akil-backend.onrender.com/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password
                    }),
                });

                const data = await res.json()
                console.log(data)
                if (!res.ok) {
                    alert(data.error)
                    throw new Error(data?.error || "Login failed")
                }


                toast.success("Signed in successfully");
                console.log("Success")
                router.push("/");

            } else {
                const res = await fetch('https://akil-backend.onrender.com/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...values,
                        role: "user"
                    })
                });
                const data = await res.json()
                console.log(data)
                if (!res.ok) {
                    alert(data?.error || "Sign up failed");
                    return;
                }

                toast.success("Signup successful! You can now sign in.");
                router.push(`/verify?email=${values.email}`);
            }
        } catch (error: any) {
            console.log(error)
            alert(error)
        }
    }
    const isSignIn = type === "sign-in"
    return (
        <div className="w-full max-w-3xl  mx-auto flex flex-col justify-center items-center">
            <div className="w-full max-w-[408px] flex flex-col gap-6 card py-14 px-10">

                {!isSignIn && (
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-3xl font-extrabold text-center text-gray-900">Signup Today !</h1>
                        <Button className="flex mt-8 w-full cursor-pointer bg-transparent hover:bg-transparent items-center gap-2 justify-center border-2 rounded-md  font-semibold text-[#4640DE]" onClick={() => signIn("google")}>
                            <Image src={google} alt="Google" width={20} height={20} />
                            Sign in with Google
                        </Button>
                        <div className="flex items-center gap-x-2 my-4 ">
                            <hr className="flex-grow w-16" />
                            <span className="text-gray-500 text-sm">Or Sign Up with Email</span>
                            <hr className="flex-grow bg-black w-16" />
                        </div>
                    </div>
                )
                }
                {isSignIn && (
                    <>
                        <h3 className="text-3xl font-extrabold text-center text-gray-900 mt-10">Welcome Back,</h3>
                        <div className="flex items-center gap-2">
                            <hr className="flex-grow w-14" />
                            <span className="text-gray-500 text-sm">{"      "}</span>
                            <hr className="flex-grow bg-black w-14" />
                        </div>
                    </>

                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full  form">
                        {!isSignIn && <FormField control={form.control} name="name" type="text" label="Name" placeholder="Enter your full name" />}
                        <FormField control={form.control} name="email" type="email" label="Email" placeholder="Enter your email address" />
                        <FormField control={form.control} name="password" label="Password" type="password" placeholder="Enter password" />
                        {!isSignIn && <FormField control={form.control} name="confirmPassword" label="Confirm Password" type="password" placeholder="Enter Password" />}

                        <Button type="submit" className="bg-[#4640DE] cursor-pointer rounded-full w-full">{isSignIn ? "Sign in" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="">
                    {isSignIn ? "Dont't have an account?" : "Already have an account?"} <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1 text-[#4640DE]" >
                        {!isSignIn ? "Log in" : "Sign up"}</Link>
                </p>
                {!isSignIn && <p className="text-xs">By clicking Continue you ackowledge that you have read and accepted our <span className="text-[#4640DE] cursor-pointer">Terms of Service</span> and <span className="text-[#4640DE] cursor-pointer">Privacy Policy</span></p>}
            </div>
        </div>

    )
}

export default AuthForm