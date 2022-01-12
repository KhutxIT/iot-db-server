const { Light } = require('../models');
const { ObjectId } = require('bson')
const { AppException } = require('../exceptions')

const upsertLight = async (data) => {
  data._id = data._id || new ObjectId()

  data = await Light.findOneAndUpdate(
    { _id: data._id },
    {
      $set: data
    },
    {
      upsert: true,
      new: true,
    }
  )

  return data && data.toObject()
}

const removeLight = async (data) => {
  if (!data._id)
    throw new AppException('Id is required!')
  const result = await Light.remove({ _id: data._id })
  return result
}

const fetchLight = async ({ query, offset, limit }) => {
  let filter = {}
  offset = offset || 0
  limit = limit || 100

  if (query) {
    filter = {...filter, $text: { $search: query }}
  }

  const result = await Light
    .find(filter)
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: -1 })

  return result;
}

module.exports = {
  upsertLight,
  removeLight,
  fetchLight
}