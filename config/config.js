const config = {
    server: {
        port: process.env.PORT || 3003,
        hostname: "127.0.0.1",
    },
    database: {
        url: 'mongodb://localhost:27017/relifems',
        // url: mongodb: //${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME},
    },
    textLocal: {
        url: process.env.TEXT_LOCAL_BASE_URL,
        apikey: process.env.TEXT_LOCAL_API_KEY,
        senderKey: process.env.TEXT_LOCAL_SENDER_KEY
    },
    jwt: {
        jwtSecret: process.env.JWT_SECRET,
        jwtSession: {
            session: false,
        },
        timeout: 1 * 365 * 24 * 60, // in minutes (expires after 1 year)
        temporary_timeout: 5, // in minutes
    },
    s3: {
        user: process.env.S3_USER,
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        bucketName: process.env.S3_BUCKET_NAME,
        region: process.env.S3_REGION,
        s3_signature_version: process.env.S3_SIGNATURE_VERSION
    },
    nodeEmailConfigurations: {
        host: process.env.SES_DOMAIN,
        port: process.env.SES_PORT,
        username: process.env.SES_USER_NAME,
        password: process.env.SES_USER_PASSWORD,
        defaultFrom: process.env.SES_DEFAULT_FROM,
    },
    transport: {
        url: process.env.TRANSPORT_URL,
        connection_key: process.env.TRANSPORT_CONNECTION_KEY,
        area: process.env.TRANSPORT_AREA
    },
    phpToken: process.env.PHP_TOKEN_SECRET,
    notificationServerUrl: process.env.NOTIFICATION_URL,
    notificationServerPort: process.env.NOTIFICATION_PORT,
    localhostStaticIp: process.env.LOCAL_FIREWALL_URL,
    digitalPinSecret: process.env.DIGITAL_PIN_SECRET_KEY,
    frontendUrl: process.env.FRONTEND_URL,
    pbx: {
        serverURL: process.env.PBX_SERVER_URL,
        apiKey: process.env.PBX_API_KEY
    },
    rootPath: require('path').resolve(__dirname + '/../'),
    defaultIntervalForAppointment: process.env.DEFAULT_INTERVAL_FOR_APPOINTMENT || 20,
    allowedIPs: [
        '127.0.0.1',
        '3.6.104.96',
        '13.232.196.126',
        '110.172.17.230'
    ],
    allowedReferralDomains: [
        'docsmart.s3.ap-south-1.amazonaws.com'
    ]
};
module.exports = config;