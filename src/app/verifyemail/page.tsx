"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("api/user/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h1 className="bg-orange-500 p-2 text-black">
          {token ? `${token}` : "no token"}
        </h1>
        {verified && (
          <div>
            <h2 className="text-2xl">
              Email Verified
              <Link href={"/login"}>login</Link>
            </h2>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl bg-red-500 text-black">error</h2>
          </div>
        )}
      </div>
    </>
  );
}
