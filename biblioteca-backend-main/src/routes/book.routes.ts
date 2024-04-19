import { FastifyInstance } from "fastify";
import { BookController } from "../controllers";

export default async function bookRoutes(fastify: FastifyInstance) {
  fastify.post("/", BookController.handleCreateBook);
  fastify.get("/", BookController.handleListAllBook);
  fastify.get("/:id", BookController.handleListByIdBook);
  fastify.put("/:id", BookController.handleUpdateBook);
  fastify.delete("/:id", BookController.handleDeleteBook);
}
