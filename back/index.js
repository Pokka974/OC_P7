const express = require("express")
const app = express()
const cors = require("cors")
const path = require('path')

const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const likesRoutes = require('./routes/likes.routes')

app.use(express.json())
app.use(cors())

const db = require("./models")
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/likes', likesRoutes)


db.sequelize.sync().then(() => {
  
  app.listen(8080, () => {
    console.log("Server running on port 8080")
  })
})
