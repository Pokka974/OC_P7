import { Inputbox, AllPosts } from '../../components'

export default function Posts() {

  return (
    <div className='bg-gray-100 grow h-screen pt-6'>
      <div className='mx-auto max-w-md md:max-w-lg'>
        <Inputbox />
        <AllPosts />
      </div>
    </div>
    
  )
}
