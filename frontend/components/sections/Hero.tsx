export default function Hero(data: any) {
  return (
    <>
      {data && (
        <div className="hero">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      )}
    </>
  )
}
