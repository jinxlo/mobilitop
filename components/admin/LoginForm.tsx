"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/admin/dashboard",
      redirect: false
    });

    if (result?.ok && result.url) {
      window.location.href = result.url;
      return;
    }

    setError("Credenciales inválidas. Verifica el email y la contraseña.");
  }

  return (
    <form action={handleSubmit} className="w-full rounded-3xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-black text-[#1E3A5F]">Ingresar al admin</h1>
      <label className="mt-6 grid gap-2 font-bold">
        Email
        <input className="rounded-2xl border px-4 py-3" name="email" type="email" required />
      </label>
      <label className="mt-4 grid gap-2 font-bold">
        Contraseña
        <input className="rounded-2xl border px-4 py-3" name="password" type="password" required />
      </label>
      {error ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      <button className="mt-6 w-full rounded-full bg-[#1E3A5F] px-5 py-3 font-bold text-white" type="submit">
        Entrar
      </button>
    </form>
  );
}
