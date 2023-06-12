import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

type Collections = 'challenges' | 'users'


function read(collection: Collections) {
  const filePath = path.resolve(`src/utils/db/_${collection}.json`)
  const string = readFileSync(filePath).toString()
  const parsed = JSON.parse(string) || {}
  return parsed
}

function get(collection: Collections, key?: string) {
  const value = read(collection)
  if(!key) {
    return value
  }
  return value[key]
}

function set(collection: Collections, key: string, value: unknown) {
  try {
    const obj = read(collection)
    obj[key] = value
    
    const filePath = path.resolve(`src/utils/db/_${collection}.json`)

    writeFileSync(filePath, JSON.stringify(obj, undefined, 2))
  } catch(err) {
    console.log('err: ', err)
    return
  }
}

export default {
  set,
  get,
  read
}

