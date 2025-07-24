"use client"
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation';


const page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState("");

    const handleVerify = async () => {
        try {
            console.log("Sending verification:", {
                email: email,
                OTP: otp,
            });

            const res = await fetch("https://akil-backend.onrender.com/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, OTP: otp }),
            });
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                alert("Verification successful!");
                router.push("/sign-in");
            } else {
                const data = await res.json();
                alert(data?.error || "Verification failed.");
                console.log(data.error)
            }
        } catch (error) {
            alert("Something went wrong");
        }
    };
    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Verify Your Email</h2>
            <p className='items-center mt-4 text-gray-900 mb-4'>We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.</p>
            <div className='flex space-y-4 flex-col items-center justify-center mt-8'>
                <InputOTP value={otp} onChange={setOtp} maxLength={4} >
                    <InputOTPGroup className='gap-8'>
                        <InputOTPSlot className="border-[#4640DE] text-[#4640DE66]text-lg w-13 h-12" index={0} aria-placeholder='0' />
                        <InputOTPSlot className="border-[#4640DE] text-[#4640DE66] text-lg w-13 h-12" index={1} aria-placeholder='0' />
                        <InputOTPSlot className="border-[#4640DE] text-[#4640DE66] text-lg w-13 h-12" index={2} aria-placeholder='0' />
                        <InputOTPSlot className="border-[#4640DE] text-[#4640DE66] text-lg w-13 h-12" index={3} aria-placeholder='0' />
                    </InputOTPGroup>
                </InputOTP>
                <div className='items-center justify-center flex flex-col'>
                    <p>You can request to <span className='text-[#4640DE]'>Resend code</span> in</p>
                    <p className='text-[#4640DE]'>0:30</p>
                </div>
            </div>


            <button
                onClick={handleVerify}
                className={`mt-6 w-full cursor-pointer text-white py-2 rounded ${otp.length == 4 ? "bg-[#4640DE]" : "bg-[#4640DE4D]"} transition`}
                disabled={otp.length < 4}
            >
                Verify
            </button>
        </div>
    )
}

export default page