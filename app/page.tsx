import PostForm from './components/PostForm';
import { prisma } from '@/src/lib/prisma';
import DeleteButton from './components/DeleteButton';
import Link from 'next/link';
import { auth } from '@/auth';
import type { Post } from "@prisma/client"

export default async function HomePage() {
  const session = await auth()
  const user = session?.user?.email ? await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  }) : null

  const posts: Post[] = user ? await prisma.post.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: "desc"
    }
  }) : []

  return (
    <main className="p-10 space-y-5">
      <div className='space-y-4'>
        <h1 className='text-2xl'>Posts</h1>
        {user ? <PostForm /> : <p>ログインをすると投稿できます。</p>}
      </div>

      <ul className='space-y-5'>
        {posts.map((post) => {
          const editHref = `/posts/${post.id}/edit` as const
          return (
            <li key={post.id}>
              <span>{post.title}</span>
              {post.userId === user?.id && (
                <>
                  <Link href={editHref}>Edit</Link>
                  <DeleteButton id={post.id} />
                </>
              )}
            </li>
          )
        }
        )}
      </ul>
    </main>
  )
}
// import PostForm from './components/PostForm';
// import { prisma } from '@/src/lib/prisma';
// import DeleteButton from './components/DeleteButton';
// import Link from 'next/link';

// export default async function HomePage() {
//   // データベースの post テーブルから複数のデータをすべて取得するという Prisma の命令
//   const posts = await prisma.post.findMany({
//     //orderBy: { createdAt: "desc" }: データを並び替えるオプション。
//     //createdAt（作成日時）をもとに、desc（降順 = 新しい順）でデータを取得。
//     orderBy: {
//       createdAt: "desc"
//     }
//   })
//   return (
//     <main className="p-5">
//       <PostForm />
//       <ul className='space-y-5'>
//         {posts.map((post) => {
//           return (
//             <li key={post.id}>
//               <span>{post.title}</span>
//               <DeleteButton id={post.id} />
//               <Link href={`/posts/${post.id}/edit` as any}>Edit</Link>
//             </li>
//           )
//         }
//         )}
//       </ul>
//     </main>
//   )
// }
// export default async function HomePage() {
//   return (
//     <main className="p-5">
//       <h1 className="text-2xl mb-10">Todo List</h1>
//       <TodoQuery />
//       <Counter />
//     </main>
//   )
// }
// export default async function HomePage() {
//   return (
//     <main className="p-5">
//       <form
//         action={createPost}
//         className="flex flex-col gap-4 max-w-sm"
//       >
//         <input
//           type="text"
//           name="title"
//           placeholder="title"
//           className="border p-2"
//         />

//         <button
//           className="border p-2"
//         >
//           Submit
//         </button>
//       </form>
//     </main>
//   )
// }