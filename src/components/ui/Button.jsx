const base =
  'inline-flex h-11 items-center justify-center gap-2 border px-6 text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50'

const variants = {
  ink: 'border-foreground bg-foreground text-background hover:-translate-y-0.5 hover:bg-foreground/85',
  paper:
    'border-foreground bg-background text-foreground hover:-translate-y-0.5 hover:bg-muted',
  outline:
    'border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:border-foreground hover:bg-muted',
  ghost:
    'border-transparent bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
  filter:
    'h-8 rounded-full border-border bg-transparent px-4 text-xs text-muted-foreground hover:border-foreground hover:text-foreground data-[active=true]:border-foreground data-[active=true]:bg-foreground data-[active=true]:text-background',
}

const sizes = {
  default: 'h-11 px-6',
  sm: 'h-9 px-4 text-xs',
  lg: 'h-12 px-7',
  icon: 'size-11 px-0',
}

function Button({
  as: Component = 'button',
  variant = 'ink',
  size = 'default',
  className = '',
  ...props
}) {
  const sizing = variant === 'filter' ? sizes.sm : sizes[size] ?? sizes.default
  return (
    <Component
      className={`${base} ${variants[variant] ?? variants.ink} ${sizing} ${className}`.trim()}
      {...props}
    />
  )
}

export default Button
