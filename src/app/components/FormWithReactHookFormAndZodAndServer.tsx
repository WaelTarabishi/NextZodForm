"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "../lib/types";
function FormWithReactHookFormAndZodAndServer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset();
    const response = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
      headers: {
        ContentType: "applicatoin/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      alert("Submitting form failed!");
      return;
    }
    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("Some thing wen wrong!");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-white">
        <label className="text-teal-300">Email:</label>
        <input
          type="email"
          {...register("email")}
          className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-teal-500"
        />
        {errors.email && (
          <p className="text-sm text-red-300">{errors.email.message}</p>
        )}
        <label className="text-teal-300">Password:</label>
        <input
          type="password"
          {...register("password")}
          className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-teal-500"
        />
        {errors.password && (
          <p className="text-sm text-red-300">{errors.password.message}</p>
        )}
        <label className="text-teal-300">Confirm Password:</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-teal-500"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-300">
            {errors.confirmPassword.message}
          </p>
        )}
        <button
          disabled={isSubmitting}
          className={`bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            isSubmitting && "cursor-not-allowed opacity-50"
          }`}
          type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default FormWithReactHookFormAndZodAndServer;
