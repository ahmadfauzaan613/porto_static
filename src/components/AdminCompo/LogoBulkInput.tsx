'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface LogoBulkInputProps {
  logos?: { file: string }[]
}

export function LogoBulkInput({ logos = [] }: LogoBulkInputProps) {
  const [inputs, setInputs] = useState<number[]>([0])

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Tech / Logo</p>

      {/* EXISTING LOGOS (PREVIEW ONLY) */}
      {logos.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {logos.map((item, i) => (
            <div key={i} className="text-xs text-muted-foreground">
              {item.file.split('/').pop()}
            </div>
          ))}
        </div>
      )}

      {/* NEW UPLOAD INPUTS */}
      {inputs.map(i => (
        <Input key={i} type="file" name="logos" accept="image/*" />
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setInputs(prev => [...prev, prev.length])}
      >
        + Add Logo
      </Button>
    </div>
  )
}
