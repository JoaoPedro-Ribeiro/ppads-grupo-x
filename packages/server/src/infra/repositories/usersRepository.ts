import { db } from "../db.config"

const table = 'users'

const createOrUpdateUsers = async (data = {}) => {
  const params = {
    TableName: table,
    Item: data
  }

  try {
    await db.put(params).promise()
    return { success: true}
  } catch (error) {
    return { success: false}
  }
}

const readAllUsers = async() => {
  const params = {
    TableName: table
  }

  try {
    const { Items = [] } = await db.scan(params).promise()
    return { success: true, data: Items }
  } catch (error) {
    return { success: false, data: null }
  }
}

const getUserByEmail = async (email: string) => {
  const params = {
    TableName: table,
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  }

  try {
    const result = await db.query(params).promise()
    const items = result.Items || []
    
    if (items.length > 0) {
      return { success: true, data: items[0] }
    }

    return { success: true, data: null }
  } catch (error) {
    return { success: false, data: error }
  }
}

const getUserById = async (value, key = 'id') => {
  const params = {
    TableName: table,
    Key: {
      [key]: String(value)
    }
  }

  try {
    const { Item = {} } = await db.get(params).promise()
    return { success: true, data: Item }
  } catch (error) {
    return { success: false, data: null }
  }
}

const getIdByEmail = async (email: string) => {
  const params = {
    TableName: table,
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  }

  try {
    const result = await db.query(params).promise()
    const items = result.Items || []

    if (items.length > 0) {
      return { success: true, id: items[0].id }
    }

    return { success: false, id: null }
  } catch (error) {
    return { success: false, id: null }
  }
}

const deleteUserByEmail = async (email: string) => {
  const { success, id } = await getIdByEmail(email)

  if (!success || !id) {
    return { success: false, message: 'User not found' }
  }

  const params = {
    TableName: table,
    Key: {
      id: id
    }
  }

  try {
    await db.delete(params).promise()
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

const deleteUserById = async(value, key = 'id' ) => {
  const params = {
    TableName: table,
    Key: {
      [key]: String(value)
    }
  }

  try {
    await db.delete(params).promise()
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export {
  createOrUpdateUsers,
  readAllUsers,
  getUserByEmail,
  getUserById,
  deleteUserByEmail,
  deleteUserById
}