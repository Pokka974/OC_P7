import { Inputbox, AllPosts } from '..'

export default function Posts() {

  return (
    <div className='bg-gray-100 grow pt-20 h-full'>
      <div className='mx-auto max-w-md md:max-w-lg'>
        <Inputbox />
        <AllPosts />
      </div>
    </div>
    
  )
}
