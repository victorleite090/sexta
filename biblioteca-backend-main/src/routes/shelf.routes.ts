import { FastifyInstance } from "fastify";
import { ShelfController } from "../controllers";

export default async function shelfRoutes(fastify: FastifyInstance) {
  fastify.post("/", ShelfController.handleCreateShelf);
  fastify.get("/", ShelfController.handleListAllShelf);
  fastify.get("/:id", ShelfController.handleListByIdShelf);
  fastify.put("/:id", ShelfController.handleUpdateShelf);
  fastify.delete("/:id", ShelfController.handleDeleteShelf);
}
