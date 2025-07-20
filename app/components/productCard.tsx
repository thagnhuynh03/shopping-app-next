import Image from "next/image";

export default function ProductCard({ title, price, salePrice, image }: { title: string; price: string; salePrice: string; image: string }) {
    return (
        <div className="flex flex-col gap-2">
          <Image
            src={image}
            alt="Product image"
            width={300}
            height={500}
            className="bg-cover rounded-xl aspect-square"
            />
          <div>
            <p className="text-base font-medium leading-normal overflow-hidden line-clamp-2">{title}</p>
            <p className="text-[#8a745c] text-sm font-normal leading-normal">{price}</p>
            <del className="text-gray-400 text-sm font-normal">{salePrice}</del>
          </div>
        </div>
      );
}