import React, {useState} from 'react'
import {set, unset} from 'sanity'
import {Button} from './ui/button'
import {Input} from './ui/input'

export default function SecretInput(props: any) {
  const {value, onChange, readOnly, placeholder} = props
  const [show, setShow] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return
    const v = e.currentTarget.value
    if (v) onChange(set(v))
    else onChange(unset())
  }

  const handleCopy = async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      // eslint-disable-next-line no-alert
      alert('הועתק ללוח')
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        dir="ltr"
        type={show ? 'text' : 'password'}
        value={value || ''}
        onChange={handleChange}
        readOnly={readOnly}
        placeholder={placeholder || 'הדבק/הכנס ערך'}
      />
      <Button type="button" variant="outline" onClick={() => setShow((v) => !v)}>
        {show ? 'הסתר' : 'הצג'}
      </Button>
      <Button type="button" variant="secondary" onClick={handleCopy} disabled={!value}>
        העתק
      </Button>
    </div>
  )
}
