import { prisma } from '@/lib/prisma'

export const AboutRepository = {
  async findFirst() {
    return prisma.abouts.findFirst()
  },

  async findByID(id: string) {
    return prisma.abouts.findUnique({
      where: { id },
    })
  },

  async create(text: string) {
    return prisma.abouts.create({
      data: { text },
    })
  },

  async updateById(id: string, text: string) {
    return prisma.abouts.update({
      where: { id },
      data: { text },
    })
  },
}
