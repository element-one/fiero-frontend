import { type HTMLAttributes, Fragment, useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Listbox, Transition } from '@headlessui/react'

export interface ListItem {
  value: string
  caption?: string
}

interface ListBoxProps extends HTMLAttributes<HTMLDivElement> {
  items: ListItem[]
  handleChange: (value: string) => void
  defaultValue?: string
}

export const ListBox: React.FC<ListBoxProps> = ({
  defaultValue,
  items,
  handleChange,
  className,
  ...props
}) => {
  const [selected, setSelected] = useState(defaultValue || items[0].value)
  const handleListChange = (value: string) => {
    setSelected(value)
    handleChange && handleChange(value)
  }
  return (
    <div className={clsx('', className)} {...props}>
      <Listbox value={selected} onChange={(value) => handleListChange(value)}>
        <div className='relative'>
          <div className='relative w-full cursor-default overflow-hidden rounded-[6px] border-[1px] border-gray-100 bg-neutral-800 text-left text-[14px] shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300'>
            <img
              src='/img/ic_nav.svg'
              className='absolute left-[8px] top-[9px] w-[18px]'
              alt='nav'
            />
            <Listbox.Button className='w-full border-none bg-neutral-800 py-2 pl-[34px] pr-10 text-left text-[14px] font-semibold leading-5 text-white focus:ring-0'>
              <span className='block truncate'>{selected}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-[6px] bg-neutral-800 py-1 text-[14px] font-medium shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {items.map((item, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-text-disabled'
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium text-white' : 'font-normal'
                        }`}
                      >
                        {item.caption || item.value}
                      </span>
                      {selected ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-white'>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default ListBox
