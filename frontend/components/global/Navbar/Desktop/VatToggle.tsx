import {Switch} from '@headlessui/react'
import {useState} from 'react'

export default function VatToggle() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="vatToggle justify-end w-1/3 flex">
      <p className="text-white pr-8">SHOW PRICES:</p>

      <p className="text-white pr-4">Inc. VAT</p>
      <Switch
        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out border-2 border-white focus:ring-offset-2 data-[checked]:bg-green-400"
        checked={enabled}
        onChange={setEnabled}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
        />
      </Switch>
      <p className="text-white pl-4">Exc. VAT</p>
    </div>
  )
}
