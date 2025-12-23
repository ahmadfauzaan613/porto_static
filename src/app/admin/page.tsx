'use client'

import { loginAction } from '@/components/AdminCompo/action'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { toast } from 'sonner'

export default function LoginPage() {
  return (
    <form
      action={async (formData: FormData) => {
        try {
          await loginAction(formData)
        } catch {
          toast.error('Username atau password salah')
        }
      }}
      className="flex items-center justify-center h-screen"
    >
      <div className="border w-[90vw] sm:w-[60vw] md:w-[35vw] lg:w-[25vw] p-5 rounded-lg shadow">
        <div className="flex justify-center">
          <Image src="/images/logo_white.png" alt="logo" width={250} height={250} />
        </div>

        <div className="my-5 space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" placeholder="Username" />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" id="password" placeholder="Password" />
          </div>
        </div>

        <Button type="submit" variant="outline" className="w-full">
          Login
        </Button>
      </div>
    </form>
  )
}
