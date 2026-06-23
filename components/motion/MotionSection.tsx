type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function MotionSection({
  children,
  className = "",
}: MotionSectionProps) {
  return <section className={className}>{children}</section>;
}