import { FastifyInstance } from "fastify";
import { LibraryController } from "../controllers";

export default async function shelfRoutes(fastify: FastifyInstance) {
  fastify.post("/", LibraryController.handleCreateLibrary);
  fastify.get("/", LibraryController.handleListAllLibrary);
  fastify.get("/:id", LibraryController.handleListByIdLibrary);
  fastify.put("/:id", LibraryController.handleUpdateLibrary);
  fastify.delete("/:id", LibraryController.handleDeleteLibrary);
}
