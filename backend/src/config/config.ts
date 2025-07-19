import {config} from 'dotenv';
config()

 const envConfig = {
    portNumber : process.env.PORT,
    mongodbString : process.env.MONGODB_URL,
     backendUrl : process.env.BACKEND_URL,
     JWT_SECRET : process.env.JWT_SECRET,
     environment : process.env.ENVIRONMENT,
     GOOGLE_CLIENT_ID :process.env.GOOGLE_CLIENT_ID,
     GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET
}

export default envConfig;