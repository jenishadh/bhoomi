import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      fullName: "John Doe",
      email: "john.doe@example.com",
      password: "password123", // In a real-world scenario, hash the password
      role: Role.USER,
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456", // In a real-world scenario, hash the password
      role: Role.ADMIN,
    },
    {
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "password789", // In a real-world scenario, hash the password
      role: Role.USER,
    },
    {
      fullName: "Bob Brown",
      email: "bob.brown@example.com",
      password: "password000", // In a real-world scenario, hash the password
      role: Role.USER,
    },
    {
      fullName: "Charlie Davis",
      email: "charlie.davis@example.com",
      password: "password111", // In a real-world scenario, hash the password
      role: Role.ADMIN,
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("5 users created");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
