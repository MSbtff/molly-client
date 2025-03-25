import Image from "next/image";

interface ProductImageProps {
  url: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export function ProductImage({
  url,
  alt,
  width,
  height,
  priority = true,
}: ProductImageProps) {
  return (
    <div
      className="flex-shrink-0 bg-gray-50"
      style={{ width: width, height: height }}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`}
        alt={alt || "상품"}
        width={width}
        height={height}
        priority={priority}
        quality={80}
        fetchPriority="high"
        unoptimized={true}
      />
    </div>
  );
}
