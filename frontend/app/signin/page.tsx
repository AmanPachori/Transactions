"use client";
import { useState } from "react";
import { CustomInput } from "../components/common/customInput";
import axios from "axios";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/signin`;
      const response = await axios.post(url, { email, password });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("Token", token);
      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <a
          href="#"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
        >
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Sign in</div>
            </div>
            <div className="pt-2">
              <CustomInput
                label="Email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <CustomInput
                label="Password"
                type={"password"}
                placeholder="123456"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={handleSignin}
              >
                Sign in
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
