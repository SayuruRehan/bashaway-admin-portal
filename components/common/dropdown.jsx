import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

const wrapperId = uuidv4()
const inputId = uuidv4()

const Dropdown = ({ options, onChange, ...props }) => {
  const [selectedOption, setSelectedOption] = useState(props.default || props.value || null)

  const [showItems, setShowItems] = useState(false)

  const id = props.id || inputId

  const clickListener = (e) => {
    if (e.target.id !== id && e.target.id !== wrapperId) {
      setShowItems(false)
    }
  }

  useEffect(() => {
    document.removeEventListener('click', clickListener)
    document.addEventListener('click', clickListener)
  })

  const onSelect = (option) => {
    onChange(
      {
        target: {
          value: option?.key,
        },
      },
      props.filterkey,
    )
    setSelectedOption(option?.key)
  }

  return (
    <div id={wrapperId} className={`${props.wrapperclasses || ''} w-full relative`}>
      <input
        id={id}
        className={twMerge(`w-full h-14 sm:h-16 bg-transparent border-[1px] border-gray-500 focus:border-primary outline-none rounded-md ${props.theme === 'light' ? 'text-black hover:text-black' : 'text-gray-100 hover:text-white'} px-4 py-2 text-base font-normal transition duration-300 cursor-pointer hide-blink ${props.className}`, props.className)}
        value={options.find((opt) => opt.key === selectedOption)?.label || props.value || props.placeholder || 'Select'}
        onClick={() => {
          setShowItems(!showItems)
        }}
        onChange={() => {}}
      />
      {showItems && (
        <div className="absolute w-full left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
          <div className="py-1" role="none">
            {options.map((option, index) => {
              return (
                <div
                  key={`${option.key}-${index}`}
                  className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                  onClick={() => {
                    onSelect(option)
                  }}
                >
                  {option.label}
                </div>
              )
            })}
          </div>
        </div>
      )}
      {selectedOption !== null && selectedOption !== 'undefined' && (
        <div className={`w-fit h-full absolute right-3 top-0 flex justify-center items-center ${props.className.includes('hidden') || props.className.includes('opacity-0') ? 'hidden opacity-0' : ''}`}>
          <AiOutlineClose className={`w-[1.2rem] h-[1.2rem] cursor-pointer fill-current`} onClick={onSelect} style={{color: props.theme === 'light' ? '#000' : '#F0F2F5'}}/>
        </div>
      )}
    </div>
  )
}

export default Dropdown
