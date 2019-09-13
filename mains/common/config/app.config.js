module.exports = {
    envirnonment: 'dev',
    port: 3000,


    // cors allowed origins
    allowedOrigins: [],

    // Environment
    "environment": process.env.NODE_ENV || "development",

    // Database Config
    "AppDBConnectionString": "mongodb://localhost/niko-niko",
}