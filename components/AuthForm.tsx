'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: ''
      },
    })
   
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      setIsLoading(true);

      try {
        // Sign up with Appwrite & create plaid token
        
        if(type === 'sign-up') {
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            ssn: data.ssn!,
            email: data.email,
            password: data.password
          }

          const newUser = await signUp(userData);

          setUser(newUser);
        }

        if(type === 'sign-in') {
          const response = await signIn({
            email: data.email,
            password: data.password,
          })

          if(response) router.push('/')
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Image
                src="/icons/logo.svg"
                width={16}
                height={16}
                alt="Finway"
                className="brightness-0 invert"
              />
            </span>
            <h1 className="text-[17px] font-semibold tracking-tight text-foreground">Finway</h1>
          </Link>

          <div className="flex flex-col gap-1">
            <h1 className="display text-[24px] text-foreground">
              {user
                ? 'Link your account'
                : type === 'sign-in'
                  ? 'Sign in'
                  : 'Create your account'
              }
            </h1>
            <p className="text-[14px] text-muted-foreground">
              {user
                ? 'Connect a bank to get started'
                : type === 'sign-in'
                  ? 'Welcome back. Enter your details.'
                  : 'It only takes a minute.'
              }
            </p>
          </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ): (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                    <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                  </div>
                  <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                  <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' />
                    <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />

              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

              <Button type="submit" disabled={isLoading} className="form-btn mt-2">
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Loading…
                  </>
                ) : type === 'sign-in'
                  ? 'Sign in' : 'Create account'}
              </Button>
            </form>
          </Form>

          <footer className="flex justify-center gap-1.5 text-[13px]">
            <p className="text-muted-foreground">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm