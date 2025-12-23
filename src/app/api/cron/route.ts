import { ProfileRepository } from '@/app/repository/profile.repository'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await ProfileRepository.findFirst()

    return NextResponse.json({
      ok: true,
      message: 'Supabase keep-alive success',
      time: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
  }
}
