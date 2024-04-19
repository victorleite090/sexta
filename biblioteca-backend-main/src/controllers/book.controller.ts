import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { ValidationError } from "../errors/validation.error";
import { AppError } from "../errors/app.error";
import BookService from "../services/book.service";
import {
  BookArraySchema,
  BookInputFilterType,
  BookInputSchema,
  BookInputType,
  BookSchema,
} from "../schemas/book.schema";

const bookService = new BookService();

export const handleCreateBook = async (
  request: FastifyRequest<{ Body: BookInputType }>,
  reply: FastifyReply
) => {
  try {
    const data = BookInputSchema.parse(request.body);

    let result = await bookService.create(data);

    return reply.status(200).send(BookSchema.parse(result));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError("Error validating request data", error);
    }

    throw new AppError("Internal server error");
  }
};

export const handleListAllBook = async (
  request: FastifyRequest<{ Querystring: BookInputFilterType }>,
  reply: FastifyReply
) => {
  const filters = request.query;

  let result = await bookService.findAll(filters);

  return reply.status(200).send(BookArraySchema.parse(result));
};

export const handleListByIdBook = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const result = await bookService.findById(id);

    if (!result) {
      return reply.status(400).send({ message: "Book not found" });
    }

    return reply.status(200).send(BookSchema.parse(result));
  }

  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export const handleUpdateBook = async (
  request: FastifyRequest<{ Params: { id: string }; Body: BookInputType }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const oldBook = await bookService.findById(id);

    if (!oldBook) {
      return reply.status(400).send({ message: "Book not found" });
    }

    const data = BookInputSchema.parse(request.body);
    const result = await bookService.update(id, data);

    return reply.status(200).send(BookSchema.parse(result));
  }

  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export const handleDeleteBook = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  if (id !== null && id !== "") {
    const oldBook = await bookService.findById(id);

    if (!oldBook) {
      return reply.status(400).send({ message: "Book not found" });
    }

    const result = await bookService.delete(id);

    return result
      ? reply.status(200).send({ message: "Book has been deleted" })
      : reply.status(400).send({ message: "Unable to delete Book" });
  }
  return reply.status(400).send({ message: "[id] parameter is mandatory" });
};

export default {
  handleCreateBook,
  handleListAllBook,
  handleListByIdBook,
  handleUpdateBook,
  handleDeleteBook,
};
