import fastify from 'fastify'


import UserService from './services/User/Server'
import cors from '@fastify/cors'
import Connectors from './connectors/index'
const fastifyJwt = require('fastify-jwt')
const server = fastify({ maxParamLength:700, logger: true })

server.register(fastifyJwt, {
  secret: 'selcukChainWebsite'
})

server.register(cors, {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: true
})


Connectors


server.register(UserService)


server.get('/', async (request, reply) => {
  return { hello: 'world' }
})


server.listen({ port: 11000 , host:"0.0.0.0"}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})


