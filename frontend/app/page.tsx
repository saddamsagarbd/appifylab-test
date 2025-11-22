"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = () => {
    setIsChecked(!isChecked);
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(formData);
      toast.success(`Login successful`);
      router.push('/feed');
    } catch (error) {
      setLoading(false);
      toast.error("Failed to login. Please try again later.");
    }

  }

  return (
    <div className="_social_login_wrapper _layout_main_wrapper">

      {/* Shape One */}
      <div className="_shape_one">
        <div className="image-wrapper">
          <Image src="/assets/images/shape1.svg" fill alt="shape1" className="_shape_img" />
        </div>
        <div className="image-wrapper">
          <Image src="/assets/images/dark_shape.svg" fill alt="dark" className="_dark_shape" />
        </div>
      </div>

      {/* Shape Two */}
      <div className="_shape_two">
        <div className="image-wrapper">
          <Image src="/assets/images/shape2.svg" fill alt="" className="_shape_img" />
        </div>
        <div className="image-wrapper">
          <Image src="/assets/images/dark_shape1.svg" fill alt="" className="_dark_shape _dark_shape_opacity" />
        </div>
      </div>

      {/* Shape Three */}
      <div className="_shape_three">
        <div className="image-wrapper">
          <Image src="/assets/images/shape3.svg" fill alt="" className="_shape_img" />
        </div>
        <div className="image-wrapper">
          <Image src="/assets/images/dark_shape2.svg" fill alt="" className="_dark_shape _dark_shape_opacity" />
        </div>
      </div>

      {/* Main Login Section */}
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">

            {/* Left Image */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <div className="image-wrapper" style={{maxWidth: '633px'}}>
                    <Image src="/assets/images/login.png" fill alt="login" className="_left_img" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">

                <div className="_social_login_left_logo _mar_b28">
                  <div className="image-wrapper">
                    <Image src="/assets/images/logo.svg" fill alt="Logo" className="_left_logo" />
                  </div>
                </div>

                <p className="_social_login_content_para _mar_b8">Welcome back</p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>

                {/* Google Button */}
                <button type="button" className="_social_login_content_btn _mar_b40">
                  <div className="flex gap-2">
                    <div className="google-icon-wrapper">
                      <Image src="/assets/images/google.svg" width={20} height={20} alt="Google" />
                    </div>
                    <span className="!font-semibold">Or sign-in with Google</span>
                  </div>
                </button>

                <div className="_social_login_content_bottom_txt _mar_b40">
                  <span>Or</span>
                </div>

                {/* Form start */}
                <form
                  onSubmit={handleLogin}
                  className="_social_login_form"
                >

                  <div className="_social_login_form_input _mar_b14">
                    <label className="_social_login_label _mar_b8">Email</label>
                    <input
                    onChange={(e) => setFormData({
                        ...formData,
                        email: e.target.value,
                    })} 
                    type="email" 
                    placeholder="Enter email" 
                    className="form-control _social_login_input" />
                  </div>

                  <div className="_social_login_form_input _mar_b14">
                    <label className="_social_login_label _mar_b8">Password</label>
                    <input 
                    onChange={(e) => setFormData({
                        ...formData,
                        password: e.target.value,
                    })} 
                    type="password" 
                    placeholder="Enter password" 
                    className="form-control _social_login_input" />
                  </div>

                  {/* Remember me */}
                  <div className="form-check _social_login_form_check">
                    <input
                      onChange={handleChange}
                      checked={isChecked}
                      className="form-check-input w-5 h-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      type="checkbox"
                      name="remember"
                      id="rememberMe"
                    />
                    <label className="form-check-label _social_login_form_check_label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  {/* Login Button */}
                  <div className="_social_login_form_btn _mar_t40 _mar_b60">
                    <button type="submit" className="_social_login_form_btn_link _btn1" disabled={loading}>{loading ?"Processing": "Login now"}</button>
                  </div>
                </form>

                <div className="_social_login_bottom_txt">
                  <p className="_social_login_bottom_txt_para">
                    Don't have an account? <Link href="/sign-up">Create New Account</Link>
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
