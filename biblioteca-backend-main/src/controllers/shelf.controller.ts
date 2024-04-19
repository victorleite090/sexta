import { FastifyReply, FastifyRequest } from "fastify";
import {
  ShelfArraySchema,
  ShelfInputFilterType,
  ShelfInputSchema,
  ShelfInputType,
  ShelfSchema,
} from "../schemas/shelf.schema";
import { ZodError } from "zod";
import { ValidationError } from "../errors/validation.error";
import { AppError } from "../errors/app.error";
import ShelfService from "../services/shelf.service";

const shelfService = new ShelfService();

export const handleCreateShelf = async (
  request: FastifyRequest<{ Body: ShelfInputType }>,
  reply: FastifyReply
) => {
  try {
    const data = ShelfInputSchema.parse(request.body);

    const result = await shelfService.create(data);

    return reply.status(200).send(ShelfSchema.parse(result));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError("Error validating request data", error);
    }

    throw new AppError("Internal server error");
  }
};

export const handleListAllShelf = async (
  request: FastifyRequest<{ Querystring: ShelfInputFilterType }>,
  reply: FastifyReply
) => {
  const filters = request.query;

  const result = await shelfService.findAll(filters);

  return reply.status(200).send(ShelfArraySchema.parse(result));
};

export const handleListByIdShelf = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const result = await shelfService.findById(id);

    if (!result) {
      return reply.status(400).send({ message: "Shelf not found" });
    }

    return reply.status(200).send(ShelfSchema.parse(result));
  }

  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export const handleUpdateShelf = async (
  request: FastifyRequest<{ Params: { id: string }; Body: ShelfInputType }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const oldShelf = await shelfService.findById(id);

    if (!oldShelf) {
      return reply.status(400).send({ message: "Shelf not found" });
    }

    const data = ShelfInputSchema.parse(request.body);
    const result = await shelfService.update(id, data);

    return reply.status(200).send(ShelfSchema.parse(result));
  }

  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export const handleDeleteShelf = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const oldShelf = await shelfService.findById(id);

    if (!oldShelf) {
      return reply.status(400).send({ message: "Shelf not found" });
    }

    const result = await shelfService.delete(id);

    return result
      ? reply.status(200).send({ message: "Shelf has been deleted" })
      : reply.status(400).send({ message: "Unable to delete Shelf" });
  }
  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export default {
  handleCreateShelf,
  handleListAllShelf,
  handleListByIdShelf,
  handleUpdateShelf,
  handleDeleteShelf,
};
