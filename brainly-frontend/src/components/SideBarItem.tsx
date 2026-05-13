interface SideBarItemProps{
  text:string,
  onClick:()=>void,
  icon?:any
}
const SideBarItem = (props:SideBarItemProps) => {
  return (
    <div className="flex items-center gap-3 my-10 cursor-pointer  text-2xl font-semibold" onClick={props.onClick}>
      <span>{props.icon}</span>
      <span>{props.text}</span>
    </div>
  )
}

export default SideBarItem