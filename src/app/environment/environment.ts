import vine from "@vinejs/vine";

const schema = vine.object({
  mongo: vine.object({
    host: vine.string(),
    username: vine.string(),
    password: vine.string()
  })
})

const data = {
  mongo: {
    host: process.env.MONGO_ROOT_PATH,
    username: process.env.MONGO_ROOT_USERNAME,
    password: process.env.MONGO_ROOT_PASSWORD
  }
}

export const environnement = await vine.validate({schema, data})
