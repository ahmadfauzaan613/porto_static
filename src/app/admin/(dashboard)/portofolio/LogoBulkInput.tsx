'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function LogoBulkInput() {
  const [inputs, setInputs] = useState([0])

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Tech / Logo</p>

      {inputs.map(i => (
        <Input key={i} name="logos" type="file" multiple accept="image/*" />
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
