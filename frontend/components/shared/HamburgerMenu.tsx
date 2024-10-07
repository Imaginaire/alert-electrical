interface HamburgerMenuProps {
  handleClick: () => void
  isOpen: boolean
}

export default function HamburgerMenu({handleClick, isOpen}: HamburgerMenuProps) {
  return (
    <>
      <button
        onClick={handleClick}
        className="hamburger-menu-toggle"
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
      >
        {Array.from({length: 3}, (_, i) => (
          <div
            key={i}
            className={`hamburger-menu-bar w-7 h-[2px] mb-1 last:mb-0 bg-primary `}
            aria-hidden="true"
          ></div>
        ))}
      </button>
    </>
  )
}
