import Link from "next/link";

interface PackageCardProps {
  pkg: {
    id: string;
    title: string;
    slug: string;
    duration_days: number;
    duration_nights: number;
    base_price: number;
    featured_image: string;
  };
}

export default function PackageCard({
  pkg,
}: PackageCardProps) {
  return (
    <Link href={`/packages/${pkg.slug}`}>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={pkg.featured_image}
            alt={pkg.title}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
              Featured
            </span>

            <span className="text-sm text-gray-500">
              {pkg.duration_days}D / {pkg.duration_nights}N
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold">
            {pkg.title}
          </h3>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Starting From
              </p>

              <h4 className="text-3xl font-bold text-blue-600">
                ₹{pkg.base_price}
              </h4>
            </div>

            <button className="rounded-full bg-black px-5 py-2 text-white transition hover:bg-blue-600">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}