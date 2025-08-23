import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BeatLoader } from 'react-spinners';

import { publicApi } from '../../../app/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../hooks';

const LoginForm = ({ setAlertMessage }) => {
    const { login } = useAuth()
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { mutate, isPending } = useMutation({
      mutationFn: async (user) => await publicApi.post("/login", user),
      onSuccess: ({ data }) => {
        login({
            token: data.token,
            user : {
                ...data.user,
                role: data.user.role[0]
            }
        })
        queryClient.invalidateQueries(["users"]);
        navigate("/")
        reset()
      },
      onError: (error) => {
         if(error.status === 422){ 
            setError("email", { type: "manual", message: "email or password wrong" }, { shouldFocus: true })
            setError("password", { type: "manual", message: "email or password wrong" }, {})
            return
        } else if(error.status === 429){
            setError("root", { type: "manual", message: error.data.message })
            setAlertMessage(error.data.message)
        }
      }
    })

    // const [ login, { isLoading } ] = useLoginMutation();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onSubmit = async (data) => {
        mutate({ email: data.email, password: data.password });
    }

    return (
        <>
            <form className='join join-vertical gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div className='join-item w-full flex justify-center items-center'>
                    <h1 className=' text-purple-400  text-3xl'>
                        CucuCoffee
                    </h1>
                </div>
                <div className='join-item join join-vertical'>
                    <input 
                        type="text" 
                        placeholder="Email" { ...register("email") } 
                        className={`input input-primary input-bordered bg-white ${errors.email || errors.root ? " border-red-500 text-red-500 focus:outline-red-500" : "input-primary text-[#570DF8]" } w-full text-sm font-medium`} 
                        onChange={() => clearErrors(["email"])}
                        required 
                    />
                </div>
                
                <div className='join-item join'>
                    <input 
                        type={isPasswordVisible ? "text" : "password"} 
                        placeholder="Password" { ...register("password") } 
                        className={`join-item input input-bordered bg-white ${errors.password || errors.root ? " border-red-500 text-red-500 focus:outline-red-600" : "input-primary text-[#570DF8]" } text-sm font-medium`} 
                        onChange={() => clearErrors(["password"])}
                        required 
                    />
                    <span 
                        onClick={() => setIsPasswordVisible(prev => !prev)} 
                        className={`join-item border flex justify-center items-center  ${errors.password || errors.root ? "border-red-500" : "border-[#570DF8]"} bg-white hover:cursor-pointer w-12`}
                        
                        >
                    {
                        isPasswordVisible 
                        ? <BsEyeSlash size={20} color='#570DF8' />
                        : <BsEye size={20} color='#570DF8' />
                    }
                    </span>
                </div>
                {errors.email && (<span className='italic text-red-500 text-sm'>*{errors.email.message}</span>)}

                <button type='submit' className="btn join-item btn-outline btn-primary"> { isPending ? <BeatLoader /> : "Submit" }</button>
                
                <span className=' text-gray-700 join-item'>
                    Doesnt have an&nbsp;
                    <Link to="/register" className='text-[#570DF8] font-semibold'>
                    account ?
                    </Link>
                </span>
            </form>
        </>
    )
}

export default LoginForm