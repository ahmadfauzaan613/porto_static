import { prisma } from '@/lib/prisma'
import { LinkType } from '@prisma/client'

export const ProfileRepository = {
  async findFirst() {
    return prisma.profile.findFirst({
      include: {
        links: true,
      },
    })
  },
  async findProfileLink() {
    return prisma.profileLink.findMany()
  },
  async upsertProfile(
    name: string,
    role: string,
    links: {
      type: LinkType
      url: string
    }[]
  ) {
    const existingProfile = await prisma.profile.findFirst()

    if (!existingProfile) {
      return prisma.profile.create({
        data: {
          name,
          role,
          links: {
            create: links,
          },
        },
      })
    }

    return prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        name,
        role,
        links: {
          deleteMany: {},
          create: links,
        },
      },
    })
  },
}
