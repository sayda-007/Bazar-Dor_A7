import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        {/* Left side: Hero content */}
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-brand-light px-4 py-2 text-sm font-semibold text-brand">
            <span
              className="h-2 w-2 rounded-full bg-brand"
              aria-hidden="true"
            />
            আপনার নিত্যপ্রয়োজনীয় বাজারের সঙ্গী
          </div>

          <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            প্রতিদিনের
            <span className="mt-2 block text-brand">
              বাজার দর
            </span>
            জানুন এক নজরে
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-text-muted sm:text-lg">
            চাল, ডাল, তেল, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের দাম
            দেখুন এক জায়গায়। বাজারের দামের পরিবর্তন সম্পর্কে
            থাকুন সবসময় সচেতন।
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#all-products"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-base"
            >
              আজকের বাজারদর দেখুন
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="mt-5 text-sm text-text-muted">
            সহজে তুলনা করুন · সচেতনভাবে বাজার করুন
          </p>
        </div>

        {/* Right side: Provided hero image */}
        <div className="relative mx-auto flex w-full max-w-xl items-center justify-center">
          <div
            className="absolute inset-6 rounded-full bg-brand-light blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex min-h-[280px] w-full items-center justify-center rounded-[2rem] bg-brand-light/70 p-5 sm:min-h-[380px] sm:p-8 lg:min-h-[440px]">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
              width={900}
              height={700}
              priority
              className="h-auto max-h-[420px] w-full object-contain drop-shadow-sm"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}