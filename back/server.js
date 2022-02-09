const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// import all routes
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const likeRoutes = require('./routes/like.routes')

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/like', likeRoutes)

app.listen(8080, () => {
    console.log('Server is listening to port 8080');
})