import { Post } from '../../components'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function AllPosts({token, user, posts}) {

    

    return (
        <InfiniteScroll
            className=""
            dataLength={posts && posts.length}
            loader={<h4>Loading ...</h4>}
        >
            {posts && posts.slice(0).reverse().map((p) => (
                <Post 
                    user={user}
                    key={p.id}
                    post={p}
                    token={token}
                />
            ))}
        </InfiniteScroll>
    )
}
