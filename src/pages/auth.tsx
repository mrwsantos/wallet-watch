import React, { useEffect, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import {
  IconAttention,
  IconRegister,
  IconLogin,
  IconGoogle,
} from "../components/Icons/Index";
import useAuth from "../../data/hook/useAuth";
import Button from "../components/Button";

import ImageWallet from "./../assets/image-wallet.png";

const Autenticacao = () => {
  const { cadastrar, loginGoogle, login, erro, setErro } = useAuth();

  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (erro !== "") {
      exibirErro(erro);
    }
  }, [erro]);

  function exibirErro(msg: string, tempoEmSegundos: number = 5) {
    setTimeout(() => setErro(""), tempoEmSegundos * 1000);
  }

  async function submeter() {
    try {
      if (modo === "login") {
        await login(email, senha);
      } else {
        await cadastrar(email, senha);
      }
    } catch (error: any) {
      throw new Error(`ERROR #${error.code}: ${error.message}`);
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div
        className={`relative flex items-center justify-center w-full
      md:w-3/5 min-h-full max-h-60 md:max-h-screen md:h-screen bg-zinc-900 overflow-hidden`}
      >
        <img
          className="h-screen w-full object-cover mix-blend-overlay "
          src="https://source.unsplash.com/random?blockchain"
          // src="https://source.unsplash.com/random"
          alt="Imagem da tela de autenticacao"
        />
        <span className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2">
          <img src={ImageWallet.src} alt="Logo" className="w-36 m-auto md:w-48" />
          <p className="text-white text-5xl font-bold">WalletWatch</p>
        </span>
      </div>
      <div className="p-4 md:p-0 md:m-10 w-full md:w-2/5">
        <h1 className="text-2xl md:text-3xl font-bold mb-5">
          {modo === "login"
            ? "Login in with your account"
            : "Register your account"}
        </h1>
        {erro && (
          <div className="flex gap-2 items-center bg-red-400 text-white font-bold py-3 px-5 my-2 border border-red-700 rounded-lg">
            <IconAttention />
            <span>{erro}</span>
          </div>
        )}

        <AuthInput
          tipo="email"
          label="Email"
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />
        <AuthInput
          tipo="password"
          label="Password"
          valor={senha}
          valorMudou={setSenha}
          obrigatorio
        />
        <Button onClick={submeter} className="mt-6 h-14 w-full">
          {modo === "login" ? (
            <>
              Login <IconLogin />
            </>
          ) : (
            <>
              Register <IconRegister />
            </>
          )}
        </Button>
        <hr className="my-6 border-zinc-300 w-full" />
        <Button
          onClick={loginGoogle}
          className="h-14 w-full"
          bgColor="bg-red-600"
          color="text-white"
        >
          {modo === "login" ? (
            <>
              Login with Google account
              <IconGoogle />
            </>
          ) : (
            <>
             Register with Google account
              <IconGoogle />
            </>
          )}
        </Button>

        {modo === "login" ? (
          <p className="mt-8">
            New here?
            <a
              onClick={() => setModo("cadastro")}
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
            >
              {" "}
             Create a new account
            </a>
          </p>
        ) : (
          <p className="mt-8">
            You're already a member?
            <a
              onClick={() => setModo("login")}
              className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"
            >
              {" "}
              Login in with your credentials
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Autenticacao;
