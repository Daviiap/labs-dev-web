import * as dotenv from "dotenv";
import * as express from "express";
import { Request, Response } from "express";
import UserRepository from "./repository/userRepository";
import sequelize from "./config/database";

dotenv.config();

const app = express();
app.use(express.json());

const userRepo = new UserRepository();

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await userRepo.createUser(name, email, password);
    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Erro ao criar usuário", error: error.message });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await userRepo.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao obter usuários", error: error.message });
  }
});

sequelize.sync({force: true}).then(() => {
  console.log("Banco de dados conectado!");

  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
}).catch(error => {
    console.log("Erro ao conectar ao banco de dados:", error);
});

