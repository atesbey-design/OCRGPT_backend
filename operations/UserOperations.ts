import { connectPostgres } from "../connectors/Postgres";

import { v4 as uuidv4 } from "uuid";
export const db: any = connectPostgres()

export const createUser = async ({
email,
password,

}: {
email: string,
password: string

}) => {
    const user = await db.query(
      `INSERT INTO users (email, password, phonenumber) VALUES ($[email], $[password]) RETURNING *`,
      {
        email,
        password,
   
      }
    )

    return user
}


export const getAllUsers = async () => {
  
    const users = await db.any(`SELECT * FROM users`)
    return users
}


export const getsingleUser = async (id: number) => {
    const user = await db.any(`SELECT * FROM users WHERE id = $[id]`, {id})
    return user
}

export const deleteUser = async (id: number) => {
    const user = await db.any(`DELETE FROM users WHERE id = $[id]`, {id})
    return user
}


export const checkUser = async ({ email, password }: { email: string, password: string }) => {
    const user = await db.oneOrNone(`SELECT * FROM users WHERE email = $[email] AND password = $[password]`, { email, password })
    return user
}

export const createCredential = async (userId: number) => {
  const credential = {
    userId,
    token: uuidv4(), // Rastgele UUID oluşturma
  };

  await db.query(
    `INSERT INTO credentials (user_id, token) VALUES ($[userId], $[token])`,
    credential
  );

  return credential;
};

export const deleteCredential = async (token: string) => {
  await db.query(`DELETE FROM credentials WHERE token = $[token]`, { token });
}



export const UserOperations = {
    createUser,
    getAllUsers,
    getsingleUser,
    deleteUser,
    checkUser


  }

export default UserOperations