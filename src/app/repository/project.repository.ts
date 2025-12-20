import { prisma } from '@/lib/prisma'

export const ProjectRepository = {
  async findAll() {
    return prisma.project.findMany({
      include: {
        logos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  },

  async findAllLogo() {
    return prisma.projectLogo.findMany()
  },

  async findById(id: number) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        logos: true,
      },
    })
  },

  async create(data: {
    name: string
    description: string
    image: string
    link: string
    logos: { file: string }[]
  }) {
    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        link: data.link,
        logos: {
          create: data.logos,
        },
      },
    })
  },

  async updateById(
    id: number,
    data: {
      name: string
      description: string
      image?: string
      link: string
      logos?: { file: string }[]
    }
  ) {
    return prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
        link: data.link,

        ...(data.logos && {
          logos: {
            deleteMany: {},
            create: data.logos,
          },
        }),
      },
    })
  },

  // =========================
  // DELETE
  // =========================

  async deleteById(id: number) {
    return prisma.project.delete({
      where: { id },
    })
  },
}
