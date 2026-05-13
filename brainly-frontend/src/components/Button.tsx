export interface ButtonProps{
  variant:string,
  textColor:string,
  size:'sm'|'md'|'lg',
  text:string,
  startIcon?:any,
  endIcon?:any,
  onClick:()=>void;
}

export const Button=(props:ButtonProps)=>{
  return (
    <button style={{backgroundColor:props.variant, color:props.textColor}}className={` ${props.size==='lg'?'text-lg':props.size=='sm'?'text-sm':'text-base'} cursor-pointer px-4 py-2 rounded-xl flex items-center gap-2`} onClick={props.onClick}>
    <span>{props.startIcon}</span>

  <span>{props.text}</span>

  <span>{props.endIcon}</span>
    </button>
  )
}
