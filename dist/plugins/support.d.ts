/// <reference types="node" />
export interface SupportPluginOptions {
}
declare const _default: import("fastify").FastifyPluginAsync<SupportPluginOptions, import("http").Server, import("fastify").FastifyTypeProviderDefault>;
export default _default;
declare module 'fastify' {
    interface FastifyInstance {
        someSupport(): string;
    }
}
