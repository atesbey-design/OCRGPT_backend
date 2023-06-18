

import { FastifyReply, FastifyRequest } from 'fastify'
import { UserOperations, deleteCredential } from '../../operations/UserOperations'
var bcrypt   = require('bcryptjs');




export const login = async (
  request: FastifyRequest<{
    Body: {
      email: string;
      password: string;
    };
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { email, password } = request.body;

  try {
    const user = await UserOperations.checkUser({ email, password });
    if (!user) {
      reply.status(401).send({ error: 'Invalid email or password' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      reply.status(401).send({ error: 'Invalid email or password' });
      return;
    }

    const credential = await createCredential(user.id);
    reply.send({ token: credential });
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: 'An error occurred' });
  }
};


export const logout = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  // İstekteki oturum belirtecini al
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    reply.status(401).send({ error: 'Geçersiz veya eksik oturum belirteci' });
    return;
  }

  // Oturum belirtecini veritabanından sil
  await deleteCredential(token).catch((err) => {
    console.log(err);
    reply.status(500).send({ error: 'Bir hata oluştu' });
  });

  reply.send({ message: 'Çıkış yapıldı' });
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};


// const verifyPassword = async (password: string, hashedPassword: string) => {
//   const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
//   return isPasswordCorrect;
// };

export const getAllUsers = async (req: FastifyRequest, rep: FastifyReply) => {
  const users = await UserOperations.getAllUsers().catch((err)=>console.log(err))
  return users
}

export const getsingleUser = async (
  req: FastifyRequest<{
    Params: {
      id: number
    }
  }>,
  rep: FastifyReply
) => {
  const { id } = req.params

  
  const user = await UserOperations.getsingleUser(id).catch(
    (err)=>console.log(err)
  )
  return user
}

export const createUser = async (
  req: FastifyRequest<{
    Body: {
   
      email: string
      password: string
    
  
    }
  }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body
  const hashedPassword = await hashPassword(password)
  const user = await UserOperations.createUser({
    email,
    password: hashedPassword

  }).catch((err)=>console.log(err))
  reply.code(200).send({
    message: 'create user success',
    data: user
  })
  return user

  }




export const deleteUser = async (
  req: FastifyRequest<{
    Params: {
      id: number
    }
  }>,
  rep: FastifyReply
) => {


  const { id } = req.params
  const user = await UserOperations.deleteUser(id).catch((err)=>console.log(err))
  return user
}



export const authUser = async (
  req: FastifyRequest<{
    Body: {
      email: string
      password: string
    }
  }>,
  rep: FastifyReply
) => {

  const { email, password } = req.body
  const user = await UserOperations.checkUser({ email, password }).catch((err)=>console.log(err))
  return user
}



function createCredential(id: any) {
  throw new Error('Function not implemented.');
}

