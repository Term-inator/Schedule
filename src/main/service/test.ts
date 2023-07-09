import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getSchedules() {
  console.log(123)
  // ... you will write your Prisma Client queries here
  const schedules = await prisma.schedule.findMany()
  return schedules
}