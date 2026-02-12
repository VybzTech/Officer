import { OptimizedImage } from "./Optimizedimage";

// Example usage in your components
export default function ImageGalleryExample() {
  return (
    <div className="p-8 space-y-8">
      {/* Basic usage */}
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Description of image"
        width={400}
        height={300}
      />

      {/* With custom styling */}
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Rounded image"
        width={300}
        height={300}
        className="rounded-lg shadow-lg"
        objectFit="cover"
      />

      {/* With custom loader styling */}
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="Custom loader"
        width={500}
        height={400}
        loaderClassName="bg-blue-100"
      />

      {/* With custom error fallback */}
      <OptimizedImage
        src="https://example.com/broken-image.jpg"
        alt="Image with error"
        width={400}
        height={300}
        errorFallback={<div className="text-red-500">❌5Custom error message</div>}
      />

      {/* Priority loading (for above-the-fold images) */}
      <OptimizedImage
        src="https://example.com/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority={true}
        className="w-full h-auto"
      />

      {/* Different object-fit options */}
      <div className="grid grid-cols-3 gap-4">
        <OptimizedImage
          src="https://example.com/image.jpg"
          alt="Contain"
          width={200}
          height={200}
          objectFit="contain"
          className="border"
        />
        <OptimizedImage
          src="https://example.com/image.jpg"
          alt="Cover"
          width={200}
          height={200}
          objectFit="cover"
          className="border"
        />
        <OptimizedImage
          src="https://example.com/image.jpg"
          alt="Scale down"
          width={200}
          height={200}
          objectFit="scale-down"
          className="border"
        />
      </div>

      {/* Responsive with Tailwind */}
      <OptimizedImage
        src="../src/assets/images/pexels-3.jpg"
        alt="Responsive"
        width={800}
        height={600}
        className="w-full h-auto max-w-[20vh] mx-auto rounded-xl"
      />
    </div>
  );
}
