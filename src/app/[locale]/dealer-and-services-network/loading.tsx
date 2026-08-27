/**
 * The network page is dynamic (it reads a `region` search param), so it can
 * suspend. This keeps the frame in place instead of flashing an empty screen.
 */
export default function Loading() {
  return (
    <div className="shell pt-20">
      <div className="h-3 w-24 animate-pulse bg-surface" />
      <div className="mt-8 h-12 w-2/3 animate-pulse bg-surface" />
      <div className="mt-16 h-[320px] animate-pulse bg-surface lg:h-[520px]" />
    </div>
  );
}
