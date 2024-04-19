import { FastifyReply, FastifyRequest } from "fastify";

import { ZodError } from "zod";
import { ValidationError } from "../errors/validation.error";
import { AppError } from "../errors/app.error";

import LibraryService from "../services/library.service";
import { LibraryArraySchema, LibraryInputFilterType, LibraryInputSchema, LibraryInputType, LibrarySchema } from "../schemas/library.schema";

const libraryService = new LibraryService();

export const handleCreateLibrary = async (
  request: FastifyRequest<{ Body: LibraryInputType }>,
  reply: FastifyReply
) => {
  try {
    const data = LibraryInputSchema.parse(request.body);

    const result = await libraryService.create(data);

    return reply.status(200).send(LibrarySchema.parse(result));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError("Error validating request data", error);
    }

    throw new AppError("Internal server error");
  }
};

export const handleListAllLibrary = async (
  request: FastifyRequest<{ Querystring: LibraryInputFilterType }>,
  reply: FastifyReply
) => {
  const filters = request.query;

  const result = await libraryService.findAll(filters);

  return reply.status(200).send(LibraryArraySchema.parse(result));
};

export const handleListByIdLibrary = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const result = await libraryService.findById(id);

    if (!result) {
      return reply.status(400).send({ message: "Shelf not found" });
    }

    return reply.status(200).send(LibrarySchema.parse(result));
  }

  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export const handleUpdateLibrary = async (
  request: FastifyRequest<{ Params: { id: string }; Body: LibraryInputType }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const oldLibrary = await libraryService.findById(id);

    if (!oldLibrary) {
      return reply.status(400).send({ message: "Shelf not found" });
    }

    const data = LibraryInputSchema.parse(request.body);
    const result = await libraryService.update(id, data);

    return reply.status(200).send(LibrarySchema.parse(result));
  }

  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export const handleDeleteLibrary = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const oldLibrary = await libraryService.findById(id);

    if (!oldLibrary) {
      return reply.status(400).send({ message: "Shelf not found" });
    }

    const result = await libraryService.delete(id);

    return result
      ? reply.status(200).send({ message: "Library has been deleted" })
      : reply.status(400).send({ message: "Unable to delete Shelf" });
  }
  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export default {
  handleCreateLibrary,
  handleListAllLibrary,
  handleListByIdLibrary,
  handleUpdateLibrary,
  handleDeleteLibrary,
};
