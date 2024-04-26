import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log('Error connecting to MOngoDB', error.message);
  }
}

connectDB();

export default prisma;
