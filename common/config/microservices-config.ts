export const microservicesConfig = {
  authService: {
    transport: 'TCP',
    options: {
      host: 'auth',
      port: 3000,
    },
  },
};