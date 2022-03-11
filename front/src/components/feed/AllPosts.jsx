import { useContext, useEffect, useState } from "react"
import api from "../../conf/apiConf"
import { Post } from '../../components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { UserContext } from "./Feed"

export default function AllPosts() {

    const userContext = useContext(UserContext)
    const [posts, setPosts] = useState(null)
    const currentUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        let originalPosts = new Array()
        api.get('post/',{
        headers: {
            authorization: `Bearer ${currentUser.token}`
        }
        })
        .then(res => {
            if(res){
                console.log('All the posts : ', res.data);
                res.data.map((p) => !p.post_id && originalPosts.push(p) )
                setPosts(originalPosts)
            }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <InfiniteScroll
            className=""
            dataLength={posts && posts.length}
            loader={<h4>Loading ...</h4>}
        >
            {posts && posts.slice(0).reverse().map((p) => (
                <Post 
                    user={userContext}
                    key={p.id}
                    post={p}
                />
            ))}
        </InfiniteScroll>
    )
}
