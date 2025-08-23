import { ProductsSection } from "../features/product"

import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import { BeatLoader } from 'react-spinners';

// import { publicApi } from '../../../app/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { privateApi } from "../app/api";

const Product = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setError, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: ""
    }});
    
    const { mutate, isPending } = useMutation({
      mutationFn: async (newUser) => await privateApi.put(`/products${newUser.id}`, newUser),
      onSuccess: () => {
        queryClient.invalidateQueries(["users"]);
        navigate("/login")
        reset()
      },
      onError: (error) => {
        error.data?.errors.forEach((element) => {
          setError(element.param, { type: "manual", message: element.msg })
        });
      }
    })
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);

    const onSubmit = async (data) => {
      mutate({ email: data.email, username: data.username, password: data.password }).unwrap()
    }

    return (
        <form className='join join-vertical gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='join-item w-full flex justify-center items-center'>
            <h1 className=' text-purple-400  text-3xl'>
              CucuCoffee
            </h1>
          </div>
          <div className='join join-vertical'>
            <input type="email" placeholder="Email" { ...register("email") } className={`input input-primary input-bordered bg-white ${errors.email || errors.root ? " border-red-500 text-red-500 focus:outline-red-500" : "input-primary text-[#570DF8]" } w-full text-sm font-medium`} required />

            {errors.email && (<span className='italic text-red-500 text-sm'>*{errors.email.message}</span>)}
          </div>

          <div className='join join-vertical'>
            <input type="text" placeholder="Username" { ...register("username") } className={`input input-primary input-bordered bg-white ${errors.username || errors.root ? " border-red-500 text-red-500 focus:outline-red-500" : "input-primary text-[#570DF8]" } w-full text-sm font-medium`} required/>

            {errors.username && (<span className='italic text-red-500 text-sm'>*{errors.username.message}</span>)}
          </div>
            
          <div className='flex flex-col justify-start'>
            <div className='join'>
              <input 
                type={isPasswordVisible ? "text" : "password"} 
                placeholder="Password" { ...register("password") } 
                className={`join-item input input-primary input-bordered bg-white ${errors.password || errors.root ? " border-red-500 text-red-500 focus:outline-red-600" : "input-primary text-[#570DF8]" } text-sm font-medium`} 
                onChange={() => clearErrors(["password"])}
                required 
              />
              <span 
                onClick={() => setIsPasswordVisible(prev => !prev)} 
                className={`join-item border flex justify-center items-center  ${errors.password || errors.root ? "border-red-500 text-red-500" : "border-[#570DF8] text-[#570DF8]"} bg-white hover:cursor-pointer w-12`}
                        
              >
              {
                isPasswordVisible 
                ? <BsEyeSlash size={20} color='#570DF8' />
                : <BsEye size={20} color='#570DF8' />
              }
              </span>
            </div>

            {errors.password && (<span className='italic text-red-500 text-sm'>*{errors.password.message}</span>)}
          </div>

          <div className='flex flex-col justify-start'>
            <div className='join'>
              <input 
                type={isPasswordConfirmVisible ? "text" : "password"} 
                placeholder="Confirm Password" { ...register("confirm") } 
                className={`join-item input input-primary input-bordered bg-white ${errors.confirm || errors.root ? " border-red-500 text-red-500 focus:outline-red-600" : "input-primary text-[#570DF8]" } text-sm font-medium`} 
                onChange={() => clearErrors(["confirm"])}
                required 
              />
              <span 
                onClick={() => setIsPasswordConfirmVisible(prev => !prev)} 
                className={`join-item border flex justify-center items-center  ${errors.confirm || errors.root ? "border-red-500 text-red-500" : "border-[#570DF8] text-[#570DF8]"} bg-white hover:cursor-pointer w-12`}
                        
              >
              {
                isPasswordConfirmVisible
                ? <BsEyeSlash size={20} />
                : <BsEye size={20} />
              }
              </span>
            </div>

            {errors.confirm && (<span className='italic text-red-500 text-sm'>*{errors.confirm.message}</span>)}
          </div>

            <button type='submit' className="btn btn-outline btn-primary"> { isPending ? <BeatLoader /> : "Submit" }</button>
            <span className=' text-gray-700'>
                Already have&nbsp;
                <Link to="/login" className='text-[#570DF8] font-semibold'>
                account ?
                </Link>
            </span>
        </form>
    )
}

export default Product