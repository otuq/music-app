import { auth, signIn, signOut } from "@/auth";


export default async function LoginButton() {
    const session = await auth()
    if (session?.user) {
        return (
            <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
            }}>
                <button type="submit" className="border px-2 py-4">Logout</button>
            </form>
        )
    }
    return (
        <form action={async () => {
            "use server"
            await signIn("github", { redirectTo: "/" })
        }}>
            <button type="submit" className="border px-2 py-4">Login</button>
        </form>
    )
}