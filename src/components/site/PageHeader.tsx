import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

/** The kicker / headline / lede block that opens every inner page. */
export default function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="shell pt-20">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-[26px] max-w-[22ch] text-[34px] leading-tight font-extralight tracking-[0.01em] text-pretty text-ink lg:text-[56px]">
        {title}
      </h1>
      {intro && (
        <p className="mt-7 max-w-[56ch] text-[17px] leading-[2] text-pretty text-body">
          {intro}
        </p>
      )}
      {children}
    </section>
  );
}
