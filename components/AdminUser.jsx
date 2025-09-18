import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUser() {
  //Info User
  const [email, setEmail] = useState("");
  const [confEmail, setconfEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setconfSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [funcaoselecionada, setfuncaoSelecionada] = useState("Administrador");

  //Erro e Enviar
  const [usuarios, setUsuarios] = useState([]);
  const [erros, setErros] = useState({});
  const [podeEnviar, setpodeEnviar] = useState(false);

  //useEffect principal

  useEffect(
    () => {
      const emailValido = email.includes("@") && email.includes(".");
      const emailsIguais = email === confEmail;
      const senhaValida = senha.length >= 6;
      const senhasIguais = senha === confSenha;
      const cpfValido = cpf.length === 11;

      setErros({
        email: emailValido && emailsIguais ? "" : "Email Inválido",
        senha: senhaValida && senhasIguais ? "" : "Senha Inválida",
      });

      setpodeEnviar(
        emailValido && emailsIguais && senhaValida && senhasIguais && cpfValido
      );
    },
    email,
    confEmail,
    senha,
    confSenha
  );

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/usuarios", {
        data: {
          nome: nome,
          cpf: cpf,
          email: email,
          senha: senha,
          perfil: funcaoselecionada,
        },
      });
      if (response === 201) {
        alert("Usuario Cadastrado com sucesso!");
      }
    } catch (error) {
        console.error("Erro ao cadastrar usuario",error)
    }
  };

  async function carregarUsuarios() {
    const res = await fetch("/api/usuarios");
    const json = await json();
    setUsuarios(json || []);
    console.log(usuarios);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function deletarUsuarios(id) {
    await fetch(`/api/usuarios?id${id}`, { method: "DELETE" });
  }

  return (
    <div
      id="crud-user"
      className="min-h-screen bg-gray-200 flex items-center justify-center  px-4 mt-5"
    >
    
      <div className="w-full max-w-2xl rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center">
          Gerenciar Usuarios
        </h1>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 mb-6">
          <div className="mb-4">
            {""}
            <label className="font-medium ">
                Nome Completo :
            </label>{""}
            <input
              type="text"
              className="block mb-1 border "
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required></input>
            
          </div>
           <div className="mb-4">
            {""}
            <label className="font-medium ">
                Email :
            </label>{""}
            <input
              type="email"
              className="block mb-1 border "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required></input>
            
          </div>
           <div className="mb-4">
            {""}
            <label className="font-medium">
                Confirmar Email :
            </label>{""}
            <input
              type="email"
              className="block mb-1 border  "
              value={nome}
              onChange={(e) => setconfEmail(e.target.value)}
              required></input>
            
          </div>
           <div className="mb-4">
            {""}
            <label className="font-medium ">
                Senha :
            </label>{""}
            <input
              type="password"
              className="block mb-1 border  "
              value={nome}
              onChange={(e) => setSenha(e.target.value)}
              required></input>
            
          </div>
           <div className="mb-4">
            {""}
            <label className="font-medium ">
                Confirmar Senha:
            </label>{""}
            <input
              type="password"
              className="block mb-1 border  "
              value={nome}
              onChange={(e) => setconfSSenha(e.target.value)}
              required></input>
            
          </div>
           <div className="mb-4">
            {""}
            <label className="font-medium ">
                Escolha seu perfil :
            </label>{""}
            <select >   

            </select>
          </div>

        
          <button type= "submit" disabled={!podeEnviar}className="bg-blue-600 flex items-center justify-center border-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Cadastrar Usuario
          </button>

        </form>
      </div>
    </div>
  );
}
