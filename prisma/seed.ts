import { faker } from "@faker-js/faker"
import {
  LandType,
  OwnershipType,
  PrismaClient,
  Role,
  StatusType,
} from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const seed = async () => {
  // Fixed password for testing purposes
  const fixedPassword = await bcrypt.hash("testpassword123", 10) // Encrypting the fixed password

  // List of possible application statuses
  const statusTypes = [
    StatusType.PENDING,
    StatusType.PROCESSING,
    StatusType.APPROVED,
    StatusType.REJECTED,
  ]
  const landTypes = [
    LandType.Residential,
    LandType.Agricultural,
    LandType.Commercial,
    LandType.Other,
  ]
  const ownershipTypes = [
    OwnershipType.Inherited,
    OwnershipType.Purchased,
    OwnershipType.Gifted,
    OwnershipType.Other,
  ]

  // Creating 10 users with fully random Faker.js data
  const users = []
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(), // Updated to faker.person.fullName()
        email: faker.internet.email(), // Random email
        password: fixedPassword, // Using fixed password for all users
        image: faker.image.avatar(), // Random user image
        role: Role.USER, // Default role
      },
    })
    users.push(user)
  }

  // Creating 4 to 8 mutation applications for each user
  for (const user of users) {
    const numberOfMutations = Math.floor(Math.random() * 5) + 4 // 4 to 8 mutations

    for (let i = 0; i < numberOfMutations; i++) {
      const randomStatus =
        statusTypes[Math.floor(Math.random() * statusTypes.length)] // Random status selection
      const randomLandType =
        landTypes[Math.floor(Math.random() * landTypes.length)] // Random land type selection
      const randomOwnershipType =
        ownershipTypes[Math.floor(Math.random() * ownershipTypes.length)] // Random ownership type selection

      // Generate a random Nepalese phone number
      const applicantPhoneNo = `9801${faker.number.int({ min: 1000000, max: 9999999 })}` // Format like 9801XXXXXXX

      await prisma.mutationApplication.create({
        data: {
          applicantName: faker.person.fullName(), // Updated to faker.person.fullName()
          applicantEmail: faker.internet.email(), // Random applicant email
          applicantPhoneNo: applicantPhoneNo, // Nepalese phone number
          applicantCitizenshipNo: `CITIZEN${faker.number.int({ min: 1000, max: 9999 })}`, // Random citizenship number
          landDistrict: faker.address.city(), // Random district name (may not match exact districts, but it's good for testing)
          landCity: faker.address.city(), // Random city name
          landWardNumber: `${Math.floor(Math.random() * 35) + 1}`, // Ward numbers are generally 1-35 in districts
          landParcelNumber: `Parcel ${faker.number.int({ min: 1, max: 1000 })}`, // Random parcel number
          landType: randomLandType, // Random land type (can be adjusted if needed)
          ownershipType: randomOwnershipType, // Random ownership type
          previousOwnerName: faker.person.fullName(), // Updated to faker.person.fullName()
          reasonForMutation: faker.lorem.sentence(), // Random reason for mutation
          dateOfTransfer: faker.date.past(), // Random past date for transfer
          applicationStatus: randomStatus, // Random status
          appliedById: user.id, // Relating mutation to user
        },
      })
    }
  }

  console.log("Seeding complete with fully random Faker.js data!")
}

seed()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
