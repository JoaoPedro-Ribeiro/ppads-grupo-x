import { db } from "./db.config"

const table = 'users'

const createOrUpdateUsers = async (data = {}) => {
  const params = {
    TableName: table,
    Item: data
  }

  console.log('Params: ', params)

  try {
    await db.put(params).promise()
    return { success: true}
  } catch (error) {
    console.error('Dynamo Error: ', error)
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

const getUserByEmail = async (value, key = 'email') => {
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

const deleteUserByEmail = async(value, key = 'email' ) => {
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