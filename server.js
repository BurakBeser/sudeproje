import express from "express";
import sql from "mssql";
import cors from "cors";

const app = express();

// Add cors middleware before other middleware
app.use(cors());
app.use(express.json());  // This line is important for parsing JSON bodies

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'SudeProjeDB',
    options: {
        trustServerCertificate: true,
        encrypt: true,
    }
};

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

app.post("/kayitBE", async (req, res) => {
    const {name, age} = req.body;
    if(!name || !age){
        return res.status(400).json({message: "Name and age are required"});
    }   

    try{
        await sql.connect(config);

        const result = await sql.query`INSERT INTO [User] (name, age) VALUES (${name}, ${age})`;
        console.log("User inserted successfully");
        return res.status(200).json({message: "User inserted successfully"});
    } catch(err){
        console.error("Error inserting user", err);
        return res.status(500).json({message: "Error inserting user"});
    }  

});

app.get("/getUsers", async (req, res) => {
    try{
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM [User]`;
        return res.status(200).json(result.recordset);
    } catch(err){
        console.error("Error getting users", err);
        return res.status(500).json({message: "Error getting users"});
    }
});
