import {config} from 'dotenv';
config()

export const envConfig = {
    portNumber : process.env.PORT,
    mongodbString : process.env.MONGODB_URL,
     backendUrl : process.env.BACKEND_URL
}