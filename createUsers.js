import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import lmsCollection from './Model/model.js'

dotenv.config()

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB)
    
    // Delete existing users
    await lmsCollection.deleteMany({})
    
    // Create admin user
    const adminSalt = await bcrypt.genSalt(10)
    const adminHashedPassword = await bcrypt.hash('password', adminSalt)
    
    const admin = new lmsCollection({
      name: 'Admin User',
      email: 'admin@test.com',
      password: adminHashedPassword,
      role: 'admin'
    })
    await admin.save()
    
    // Create regular user
    const userSalt = await bcrypt.genSalt(10)
    const userHashedPassword = await bcrypt.hash('1234', userSalt)
    
    const user = new lmsCollection({
      name: 'Test User',
      email: 'user@test.com',
      password: userHashedPassword,
      role: 'user'
    })
    await user.save()
    
    console.log('Users created successfully!')
    console.log('Admin: admin@test.com / password')
    console.log('User: user@test.com / 1234')
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

createUsers()