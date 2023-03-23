import Head from "next/script";
import router from "next/router";
import useAuth from "../data/hook/useAuth";
import { IconLoading } from "../src/components/Icons/Index";

const forcarAutenticacao = (jsx:any) => {
  const { usuario, carregando } = useAuth();

  function renderizarConteudo() {
    return <>{jsx}</>;
  }

  function renderizarCarregando() {
    return (
      <>
        <Head> // MAIS UMA CAMADA DE SEGURANÇA
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    if(!document.cookie?.includes("wallet-drop-coder-auth')){
                        window.location.href = "/autenticacao"
                    }
                `,
            }}
          />
        </Head>

        <div className="flex justify-center items-center h-screen bg-zinc-800">
          <IconLoading/>
        </div>
      </>
    );
  }

  if (!carregando && usuario?.email) {
    return renderizarConteudo();
  } else if (carregando) {
    return renderizarCarregando();
  } else {
    router.push("/autenticacao");
    return null;
  }
};

export default forcarAutenticacao;
