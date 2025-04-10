import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Nepal-specific data
const nepalCities = [
  "Kathmandu",
  "Pokhara",
  "Lalitpur",
  "Bhaktapur",
  "Butwal",
  "Biratnagar",
  "Janakpur",
  "Hetauda",
  "Dhangadhi",
]

const nepalDistricts = [
  "Kathmandu",
  "Bhaktapur",
  "Lalitpur",
  "Chitwan",
  "Pokhara",
  "Kaski",
  "Tanahu",
  "Morang",
  "Biratnagar",
  "Sunsari",
]

const wards = Array.from({ length: 30 }, (_, i) => (i + 1).toString()) // Ward numbers from 1 to 30

// Function to generate land parcel numbers
const generateLandParcelNumber = () => {
  return `KP${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 100, max: 999 })}`
}

// Create fake user data
async function createFakeUser() {
  return prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(["USER", "ADMIN"]),
    },
  })
}

// Create fake mutation application for a given user
async function createFakeMutation(userId: string) {
  return prisma.mutationApplication.create({
    data: {
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "national" }), // Fixed here
      applicantAddress: `${faker.helpers.arrayElement(nepalCities)}, Ward-${faker.helpers.arrayElement(wards)}`,
      applicantCitizenshipNo: faker.string.alphanumeric(10).toUpperCase(),
      district: faker.helpers.arrayElement(nepalDistricts),
      localBody: faker.helpers.arrayElement(nepalCities),
      wardNumber: faker.helpers.arrayElement(wards),
      landParcelNumber: generateLandParcelNumber(),
      landType: faker.helpers.arrayElement([
        "Residential",
        "Agricultural",
        "Commercial",
        "Other",
      ]),
      ownershipType: faker.helpers.arrayElement([
        "Inherited",
        "Purchased",
        "Gifted",
        "Other",
      ]),
      previousOwnerName: faker.person.fullName(),
      reasonForMutation: faker.lorem.sentence(),
      dateOfTransfer: faker.date.past(),
      documents: [
        faker.internet.url({ appendSlash: false }) + "/doc1.pdf",
        faker.internet.url({ appendSlash: false }) + "/doc2.pdf",
      ],
      appliedById: userId,
    },
  })
}

async function seed() {
  try {
    // Create 12 users
    for (let i = 0; i < 12; i++) {
      const user = await createFakeUser()

      // Create 6 mutation applications for each user
      for (let j = 0; j < 6; j++) {
        await createFakeMutation(user.id)
      }
    }

    console.log("Seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding data: ", error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
