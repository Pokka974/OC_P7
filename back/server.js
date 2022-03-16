const express = require('express')
const cors = require('cors')
const path = require('path')
// import all routes
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const likeRoutes = require('./routes/like.routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')));




app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/like', likeRoutes)

app.listen(8080, () => {
    console.log('Server is listening to port 8080');
})