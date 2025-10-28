import { Variant } from "../../types/variants";

export default function Chip({
  children,
  variant = "neutral",
  className= ""}: {
    children: React.ReactNode;
    variant?: Variant;
    className?: string;
  })
  {
  return(
    <div className={`chip chip-${variant} ${className}`}>
      <p>
        {children}
      </p>
    </div>
  )
}
