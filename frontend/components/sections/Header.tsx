interface HeaderProps {
  header: string
  subHeader: string
}

export default function Header(data: HeaderProps) {
  const {header, subHeader} = data || {}

  return (
    <>
      {data && (
        <div className="header">
          <h1>{header}</h1>
          <p>{subHeader}</p>
        </div>
      )}
    </>
  )
}
