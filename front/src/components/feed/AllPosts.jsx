import { Post } from '../../components'

export default function AllPosts({token, user, posts}) {
    return (
        <div className='h-full'>
            {posts ? posts.slice(0).reverse().map((p) => (
                <Post 
                    user={user}
                    key={p.id}
                    post={p}
                    token={token}
                />
            )) : <div className='h-screen text-center mt-20 text-5xl'>Il n'y rien ici :(</div>}
        </div>
    )
}
