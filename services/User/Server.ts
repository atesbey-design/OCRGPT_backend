import { FastifyPluginAsync } from 'fastify'

import { createUser, getAllUsers, getsingleUser, deleteUser, login, logout} from './Handlers'

export const UserService: FastifyPluginAsync = async (
  app,
  opts
): Promise<void> => {
  app.get('/userService', (req, res) => {
    res.send('userService')
  })
  app.post('/login', login);
  app.post('/logout', logout);

  app.get('/allUsers', getAllUsers)
  app.get('/allUsers/:id', getsingleUser)
  app.post('/deleteUser/:id', deleteUser)
  app.post('/createUser', createUser)

}
export default UserService
