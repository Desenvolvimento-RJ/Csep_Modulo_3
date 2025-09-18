import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { nome, cpf, email, senha, perfil } = req.body;

  const funcoesValidas = ["Administrador", "Validador", "Vendedor"];

  //GET -Listar Usuarios

  if (req.method === "GET") {
    try {
      const usuario = await prisma.usuario.findMany();
      return res.status(201).json(usuario);
    } catch (error) {
      console.error("Erro ao listar usuario", error);
      return res.status(500).json({ error: "Erro ao listar usuario" });
    }
  }

  //POST - Criar Usuarios

  if (req.method === "POST") {
    //validacao
    if (!nome || !cpf || !email || !senha || !perfil) {
      return res.status(400).json({ error: "Campos Obrigatorios Ausentes" });
    }
    if (!email.includes("@") && !email.includes(".")) {
      return res.status(400).json({ error: "Formato Email Inválido" });
    }
    if (!senha.lenght >= 6) {
      return res.status(400).json({ error: "Senha Muito Curta" });
    }

    try {
      //Verificar usuario com email já cadastrado
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
      });
      if(!usuarioExistente){
        return res.status(400).json({error:"Usuario com email já cadastrado!"})
      }
      //Criptografar senha antes de salvar
      const senhaCriptografada = await bcrypt.hash(senha, 10); //10 saltos
      //Criar novo usuario
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome: nome,
          cpf: cpf,
          email: email,
          senha: senhaCriptografada,
          perfil: perfil,
        },
      });
      return res.status(201).json({ message: "Usuario Criado Com Sucesso!" });
    } catch (error) {
        console.error("Erro ao criar usuario",error)
        return res.status(500).json({error:"Erro ao criar usuario"})
    }

  }
  

  //DELETE - Deletar usuario

  if(req.method === "DELETE"){
    const{id} = req.query;

    //validacao
    if(!id){
        return res.status(400).json({error:"ID usuario não fornecido"})
    }

    try{
        const usuario = await prisma.usuario.findUnique({where:{id_usuario:Number(id)}})
        
        await prisma.usuario.delete({
            where:{id_usuario: Number(id)}
        })

        return res.status(201).end();
    }catch(error){
        return res.status(500).json({error:"Erro ao Deletar usuario"})
    }
  }

  //PUT - Atualizar usuario
  if(req.method === "PUT"){
    try{
        const {id,nome,email} = req.body;
        const usuarioAtualizado = await prisma.usuario.update({
            where: {id_usuario:Number(id)},
            data:{
                nome:nome,
                email:email,
            },
        });
        return res.status(201).json(usuarioAtualizado);
    }catch(error){}
  }

  //Caso o método não seja GET,POST,PUT ou DELETE
  return res.status(400).json({error:"Esse método não pode ser utilizado!"})

}
