module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET') || "6D3HRUZuEPOHzpue9jwwlIwt1E5IPm8sTMYHlAYM4aEFBdh8JLrNnchj1u/RJf8buqptiCkhJGFmbgIn9dczxw==",
    },
  },
});
