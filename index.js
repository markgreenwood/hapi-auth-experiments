const Hapi = require('hapi');
const Boom = require('boom');
const Cookie = require('hapi-auth-cookie');
const Blipp = require('blipp');
const routes = require('./routes');

const server = new Hapi.Server();

server.connection({ port: 1337 });

server.register([
  Cookie,
  { register: Blipp, options: { showAuth: true } }
], (err) => {
  server.auth.strategy(
    'session',
    'cookie',
    {
      cookie: 'example',
      password: 'secret',
      isSecure: false,
      redirectTo: '/login',
      redirectOnTry: false
    }
  );
  server.auth.default('session');
  server.route(routes);
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at ${server.info.uri}`);
  });
});