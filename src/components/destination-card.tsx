import Link from "next/link";

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    country: string;
    slug: string;
    image_url: string;
    description: string;
  };
}

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`}>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

        <div className="overflow-hidden">
          <img
            src={destination.image_url}
            alt={destination.name}
            className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-6">
          <p className="text-sm uppercase tracking-widest text-blue-600">
            {destination.country}
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {destination.name}
          </h3>

          <p className="mt-4 line-clamp-2 text-gray-600">
            {destination.description}
          </p>

          <button className="mt-6 font-semibold text-blue-600">
            Explore →
          </button>
        </div>
      </div>
    </Link>
  );
}