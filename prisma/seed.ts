import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let item of items) {
    await prisma.user.create({ data: item });
  }
}

main()
  .catch((err) => {
    console.log('prisma client error', err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
