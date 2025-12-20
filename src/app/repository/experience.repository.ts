import { prisma } from '@/lib/prisma'

export const ExperienceRepository = {
  async findAll() {
    return prisma.experience.findMany({
      orderBy: {
        startDate: 'desc',
      },
    })
  },

  async findByID(id: string) {
    return prisma.experience.findUnique({
      where: { id },
    })
  },

  async create(data: {
    company: string
    role: string
    description: string
    location: string
    startDate: Date
    endDate: Date | null
  }) {
    return prisma.experience.create({ data })
  },

  async updateById(
    id: string,
    data: {
      company: string
      role: string
      description: string
      location: string
      startDate: Date
      endDate: Date | null
    }
  ) {
    return prisma.experience.update({
      where: { id },
      data,
    })
  },

  async deleteById(id: string) {
    return prisma.experience.delete({
      where: { id },
    })
  },
}
