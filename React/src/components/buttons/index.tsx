interface ButtonProps{
    icon?:any;
    title:string;
    className?:string;
}

function Button({icon,title,className}:ButtonProps) {
  return (
    <div>
      <button className={className}><p>{title}</p>{icon}</button>
    </div>
  )
}

export default Button
