export function ArrowLabel({
  x,
  y,
  textAnchor = 'middle',
  children,
}: {
  x: number;
  y: number;
  textAnchor?: 'start' | 'middle' | 'end';
  children: React.ReactNode;
}) {
  return (
    <text x={x} y={y} textAnchor={textAnchor} fontSize="13" fontWeight="700" fill="#111827">
      {children}
    </text>
  );
}
