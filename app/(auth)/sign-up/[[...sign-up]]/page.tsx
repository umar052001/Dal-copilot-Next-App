'use client';
import Link from 'next/link';

import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="flex-center w-full flex-grow items-center  px-4 sm:justify-center">
      <SignUp.Root>
        <SignUp.Step
          name="start"
          // shadow-md ring-1 ring-black /5 
          className="lg:w-[32%] md:w-[50%] w-full space-y-6 rounded-2xl  px-4 py-10 sm:px-8"
        >
          <header className="text-center flex flex-col items-center ">
            <Image src="https://www.dal-demo.live/static/media/LogoMark.b58bee8dcba820ab1e4cfb4edb402eb3.svg"
              alt="search"
              width={75}
              height={75}
            />

            <h1 className="mt-4 text-xl tracking-tight text-zinc-950 font-bold">Signup to create an account</h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="emailAddress" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">Email</Clerk.Label>
              <Clerk.Input
                type="email"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">Password</Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignUp.Action
            submit
            className="w-full rounded-md bg-[#00d9dd] px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-[#00d9dd] hover:bg-[#00d9dd] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#00d9dd] active:text-white/70"
          >
            Sign Up
          </SignUp.Action>

          <p className="text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-[#00d9dd] decoration-[#00d9dd] underline-offset-4 outline-none hover:text-[#00d9dd] hover:underline focus-visible:underline">
                Sign in
            </Link>
          </p>
        </SignUp.Step>
        <SignUp.Step
          name="verifications"
          className="lg:w-[32%] md:w-[50%] w-full space-y-6 rounded-2xl  px-4 py-10 sm:px-8"
        >
          <header className="text-center flex flex-col items-center ">
            <Image src="https://www.dal-demo.live/static/media/LogoMark.b58bee8dcba820ab1e4cfb4edb402eb3.svg"
              alt="search"
              width={75}
              height={75}
            />
            <h1 className="mt-4 text-xl  tracking-tight text-zinc-950 font-bold">Verify email code</h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <SignUp.Strategy name="email_code">
            <Clerk.Field name="code" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">Email code</Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <SignUp.Action
              submit
              className="w-full rounded-md bg-[#00d9dd] px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-[#00d9dd] hover:bg-[#28c0c3] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#28c0c3] active:text-white/70"
            >
              Verify
            </SignUp.Action>
          </SignUp.Strategy>
          
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-[#00d9dd] decoration-[#00d9dd] underline-offset-4 outline-none hover:text-[#00d9dd] hover:underline focus-visible:underline">
              Sign in
            </Link>
          </p>
        </SignUp.Step>
        <SignUp.Step
          name="continue"
          className="lg:w-[32%] md:w-[50%] w-full space-y-6 rounded-2xl  px-4 py-10 sm:px-8"
        >
          <header className="text-center flex flex-col items-center">
            <Image src="https://www.dal-demo.live/static/media/LogoMark.b58bee8dcba820ab1e4cfb4edb402eb3.svg"
              alt="search"
              width={75}
              height={75}
            />
            <h1 className="mt-4 text-xl  tracking-tight text-zinc-950 font-bold">Continue registration</h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <Clerk.Field name="username" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-zinc-950">Username</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <SignUp.Action
            submit
            className="w-full rounded-md bg-[#00d9dd] px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-[#00d9dd] hover:bg-[#00d9dd] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#00d9dd] active:text-white/70"
          >
            Continue
          </SignUp.Action>
          <p className="text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-[#00d9dd] decoration-[#00d9dd] underline-offset-4 outline-none hover:text-[#00d9dd] hover:underline focus-visible:underline">
              Sign in
            </Link>
          </p>
        </SignUp.Step>
      </SignUp.Root>
    </div>
  );
}