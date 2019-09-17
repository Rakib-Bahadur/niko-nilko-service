module.exports = {
    envirnonment: 'dev',
    port: 3000,


    // cors allowed origins
    allowedOrigins: [],

    // Environment
    environment: process.env.NODE_ENV || "development",

    // Database Config
    AppDBConnectionString: "mongodb://localhost/niko-niko",

    // Permission Levels
    permissionLevel: {
        ADMIN: 5,
        USER: 4
    }
}