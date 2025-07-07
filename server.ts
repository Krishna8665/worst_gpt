import app from "./src/app"
import { envConfig } from "./src/config/config"
import connectToDatabase from "./src/config/db"


const startServer = async () => {
    await connectToDatabase()
    const port = envConfig.portNumber || 3000
    app.listen(port, () => {
        console.log(`server has started at port ${port}`)
    })
}

startServer()