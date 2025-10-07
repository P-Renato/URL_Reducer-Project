import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/', (req, res, next) =>{
    
})


const port = process.env.PORT || 5001;
app.listen(port, () => console.log("Server is running on port ", port))