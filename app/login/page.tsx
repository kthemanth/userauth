'use client';

import Head from 'next/head'
import Layout from '../../components/Layout'
import Link from 'next/link'
import styles from '../../styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../../lib/validate';
import { useRouter } from 'next/navigation';


export default function Login(){

    const [show, setShow] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate : login_validate,
        onSubmit
    })

    async function onSubmit(values: any){
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })

        if(status?.ok) router.push(status?.url??"/")
        
    }

    async function handleGoogleSignin(){
        signIn('google', { callbackUrl : "http://localhost:3000"})
    }

    return (
        <Layout>

        <Head>
            <title>Login</title>
        </Head>
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Write something meaningful here</p>
                <div className='image-container flex justify-center items-center'>
                    <Image src={'/small_triangle.png'} width="150" height={150} alt="" className='justify-center'></Image>
                </div>
            </div>

            <form className='flex flex-col gap-5 text-slate-700' onSubmit={formik.handleSubmit}>
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    placeholder='Email'
                    className={styles.input_text}
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                   
                </div>
               
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show ? "text" : "password"}`}
                    placeholder='********'
                    className={styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                   
                </div>

                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Sign in with Email
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                    <Image src={'/google-48-light.png'} width="24" height={24} alt="" ></Image>Sign In with Google 
                    </button>
                </div>
            </form>

            <p className='text-center text-gray-400 '>
                don't have an account yet? <Link href={'/register'} className='text-blue-700'>Sign Up</Link>
            </p>
        </section>

        </Layout>
    )
}