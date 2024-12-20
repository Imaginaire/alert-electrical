interface HamburgerMenuProps {
  handleClick: () => void
  isOpen: boolean
}

export default function HamburgerMenu({handleClick, isOpen}: HamburgerMenuProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleClick}
        className="hamburger-menu-toggle h-4"
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
      >
        {Array.from({length: 3}, (_, i) => (
          <div
            key={i}
            className={`hamburger-menu-bar w-7 h-[2px] mb-1 last:mb-0 bg-black `}
            aria-hidden="true"
          ></div>
        ))}
      </button>
      <span className="pt-1 uppercase text-sm">Menu</span>
    </div>
  )
}
