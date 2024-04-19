import prisma from "../database";
import {
  BookInputFilterType,
  BookInputType,
  BookType,
} from "../schemas/book.schema";

export class BookRepository {
  async create({
    name,
    description,
    publishingCompany,
    shelf,
  }: BookInputType): Promise<BookType> {
    return await prisma.book.create({
      data: {
        name,
        description,
        publishingCompany,
        shelf_id: shelf.id,
      },
      include: { shelf: true },
    });
  }

  async findById(id: string): Promise<BookType | null> {
    return await prisma.book.findUnique({
      where: { id },
      include: { shelf: true },
    });
  }

  async findAll(filters: BookInputFilterType): Promise<BookType[]> {
    return await prisma.book.findMany({
      where: {
        AND: [
          { name: { contains: filters.name } },
          { publishingCompany: { contains: filters.publishingCompany } },
        ],
      },
      include: { shelf: true },
    });
  }

  async update(
    id: string,
    { name, description, publishingCompany, shelf }: BookInputType
  ): Promise<BookType> {
    return await prisma.book.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        publishingCompany,
        shelf_id: shelf.id,
      },
      include: { shelf: true },
    });
  }

  async delete(id: string): Promise<BookType> {
    return await prisma.book.delete({
      where: {
        id,
      },
      include: { shelf: true },
    });
  }
}
