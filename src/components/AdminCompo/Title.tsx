interface TitleProps {
  text: string
}

export default function Title( props: TitleProps) {
  return (
    <div>
      <p className="text-4xl font-bold tracking-[.5rem] uppercase">{props.text}</p>
    </div>
  )
}
