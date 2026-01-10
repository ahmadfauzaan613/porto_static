import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const username = process.env.ADMIN_USERNAME
  const rawPassword = process.env.ADMIN_PASSWORD

  if (!username || !rawPassword) {
    throw new Error('❌ ADMIN_USERNAME or ADMIN_PASSWORD is not set')
  }
  const existingUser = await prisma.users_auth.findUnique({
    where: { username },
  })

  if (existingUser) {
    console.log('ℹ️ Superadmin already exists, skipping seed')
    return
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10)

  await prisma.users_auth.create({
    data: {
      username,
      password: hashedPassword,
    },
  })

  console.log('✅ Superadmin user created')
}

main()
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
