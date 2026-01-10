import { prisma } from '@/lib/prisma'

export const CertificateRepository = {
  // =========================
  // READ
  // =========================

  async findAll() {
    return prisma.certificate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  },

  async findById(id: number) {
    return prisma.certificate.findUnique({
      where: { id },
    })
  },

  // =========================
  // CREATE
  // =========================

  async create(data: { name: string; description: string; image: string }) {
    return prisma.certificate.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    })
  },

  // =========================
  // UPDATE
  // =========================

  async updateById(
    id: number,
    data: {
      name: string
      description: string
      image?: string
    }
  ) {
    return prisma.certificate.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        ...(data.image && { image: data.image }),
      },
    })
  },

  // =========================
  // DELETE
  // =========================

  async deleteById(id: number) {
    return prisma.certificate.delete({
      where: { id },
    })
  },
}
