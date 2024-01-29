import { Prisma, PrismaClient } from '@prisma/client'
import { DateTime } from 'luxon'
import path from 'path'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const dbPath = process.env.NODE_ENV != 'production' || process.env.npm_command == 'start' ? 'dev.db' : path.join(process.resourcesPath, "database/prod.db")

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log('dbPath', dbPath)

// 保证 dev 环境只有一个实例
export const prisma =
  globalForPrisma.prisma || new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    }
  }).$extends({
    query: {
      $allModels: {
        // @ts-ignore
        $allOperations({ model, operation, args, query }) {
          const _create = ['create', 'createMany']
          const _update = ['create', 'createMany', 'update', 'updateMany']
          // 调用 delete 时不需要更新 created 和 updated

          if (operation === 'upsert') {
            if (!('created' in args.create) || !('updated' in args.create) || !('updated' in args.update)) {
              console.warn('You must update "created" and "updated" manually when using upsert.')
            }
          }
          if ('data' in args) {
            if (_create.includes(operation)) {
              if (!('created' in args.data)) {
                args.data['created'] = DateTime.now().setZone('UTC').toISO()! // 一定合法，所以不会是 null
              }
            } 
            if (_update.includes(operation)) {
              if (!('updated' in args.data)) {
                args.data['updated'] = DateTime.now().setZone('UTC').toISO()! // 一定合法，所以不会是 null
              }
            }
          }

          return query(args)
        }
      }
    }
  }).$extends({
    model: {
      $allModels: {
        async sync<T>(this: T, id: string, data: Prisma.Args<T, 'upsert'>['update']) {
          // Get the current model at runtime
          const context = Prisma.getExtensionContext(this)

          const res = await (context as any).upsert({
            where: { id },
            create: {
              id,
              ...data
            },
            update: data,
          })

          return res
        }
      }
    }
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma