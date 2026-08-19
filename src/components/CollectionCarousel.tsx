import { Link } from "@tanstack/react-router";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { formatPrice } from "@/data/products";
import { useCarouselProducts, useSettings } from "@/stores/admin";
import { ArrowRight } from "lucide-react";

export function CollectionCarousel() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const items = useCarouselProducts();
  const settings = useSettings();

  return (
    <section className="bg-muted/30 py-24">
      <div className="container-luxe">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">{settings.carouselSubtitle}</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">{settings.carouselTitle}</h2>
          </div>
          <Link to="/colecoes" className="text-sm font-medium underline-offset-4 hover:underline">Ver todas as peças</Link>
        </div>

        <Carousel opts={{ align: "start", loop: true }} plugins={[autoplay.current]} className="w-full">
          <CarouselContent className="-ml-4">
            {items.map((p) => (
              <CarouselItem key={p.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                <Link to="/produto/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-background">
                    <img
                      src={p.image}
                      alt={`${p.name} — coleção ${p.collection}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-secondary/90 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
                      {p.collection}
                    </span>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl leading-tight">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                    </div>
                    <p className="whitespace-nowrap font-semibold">{formatPrice(p.price)}</p>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gold opacity-0 transition-opacity group-hover:opacity-100">
                    Comprar <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
