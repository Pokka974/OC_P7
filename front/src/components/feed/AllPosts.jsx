import { useEffect, useState } from "react"
import api from "../../conf/apiConf"
import { Post } from '../../components'

export default function AllPosts() {

    const [posts, setPosts] = useState(null)
    const currentUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        api.get('post/',{
        headers: {
            authorization: `Bearer ${currentUser.token}`
        }
        })
        .then(res => {
            if(res){
                console.log(res.data);
                setPosts(res.data)
            }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            {posts && posts.slice(0).reverse().map((p) => (
                <Post 
                    key={p.id}
                    authorId={p.user_id}
                    message={p.content}
                    timestamp={p.createdAt}
                    image={p.attachment}
                />
            ))}
        </div>
    )
}
