'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import Image from "next/image";
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="flex-center w-full flex-grow items-center  px-4 sm:justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="lg:w-[32%] md:w-[50%] w-full space-y-6 rounded-2xl  px-4 py-10 sm:px-8"
        >
          <header className="text-center flex flex-col items-center">
            <Image src="/LogoMark&Type.svg"
              alt="search"
              width={75}
              height={75}
            />

            <h1 className="mt-4 text-2xl tracking-tight text-zinc-950 font-bold">Login to your account</h1>
            <h1 className="mt-3 text-sm tracking-tight text-zinc-950 ">Please create an account to test the application</h1>
            <p className='arabic-font text-sm'>(الرجاء خلق حساب لتجربة الخدمة)</p>
            <h1 className="mt-3 text-sm tracking-tight text-zinc-950">
              <b>Note:</b> Our server, powered by a high-cost GPU, operates on-demand for efficiency. Please email{' '}
              <a href="mailto:saltamimi@modernint.sato" className="text-[#00d9dd]  ">
                saltamimi@modernint.sato
              </a>{' '}
              to activate it for your testing needs.
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">Username or Email</Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm  font-medium text-zinc-950">Password</Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignIn.Action
            submit
            className="w-full rounded-md bg-[#00d9dd] px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-[#00d9dd] hover:bg-[#00d9dd] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#00d9dd] active:text-white/70"
          >
            Sign In
          </SignIn.Action>


          <p className="text-center text-sm text-zinc-500">
            Don&apos;t have an account yet?{' '}
            <Link href="/sign-up" className="font-medium text-[#00d9dd] decoration-[#00d9dd] underline-offset-4 outline-none hover:text-[#00d9dd] hover:underline focus-visible:underline">
              Sign up
            </Link>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}