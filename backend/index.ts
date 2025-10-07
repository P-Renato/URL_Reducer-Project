import express from "express"
import cors from 'cors';
import  sequelize  from "./utils/db";
import Url from "./models/url";
import { nanoid } from "nanoid";


const app = express();
app.use(express.json());
/* middlewares */
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));


/* database */
try {
    await sequelize.authenticate();
    console.log("Database is connected")
} catch (err) {
    console.error("db err:", err);
}

//await sequelize.sync({ force: true }); 
await sequelize.sync({ alter: true });

/* routers */
// get all URLs
app.get("/url", async (req, res) => {
    try {
    const urls = await Url.findAll();
    if (!urls) return res.status(404).json({ success: false, msg: "URL not found" });
    res.status(200).json({ success: true, msg: "URLs fetched successfully", urls });
  } catch (error) {
    console.error("fetch URL error:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});

// post a new URL
app.post("/url", async (req, res) => {
  try {
    const { origin_url } = req.body;
    console.log(origin_url)
    const existingUrl = await Url.findOne({ where: { origin_url } });
    if (existingUrl) {
      return res.status(400).json({ msg: "This URL already exists" });
    }

    console.log("So far, so good")
    const code = nanoid(6);
    const short_url = `http://localhost:5173/${code}`;
    console.log("So far, so good again")
    const newUrl = await Url.create({ origin_url, short_url });
    console.log(newUrl)
    


    res.status(201).json({
      success: true,
      message: "Created a new URL successfully",
      data: newUrl,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
});

/* -------------- error handlers -------------- */
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
  next();
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server is running on port", port))



















