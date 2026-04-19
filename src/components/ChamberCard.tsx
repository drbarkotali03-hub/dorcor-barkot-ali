import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chamber } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Globe,
  MapPin,
  Phone,
  Calendar,
  Clock,
  Building,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

type ChamberCardProps = {
  chamber: Chamber;
  className?: string;
};

function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("88")) {
    return `+${cleaned}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return `+88${cleaned}`;
  }
  return phone;
}

export function ChamberCard({ chamber, className }: ChamberCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border-2 border-gray-100 shadow-lg transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1",
        className
      )}
    >
      {chamber.embedMapLink && (
        <a
          href={chamber.googleMapsLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block aspect-video overflow-hidden border-b-2 cursor-pointer group"
          aria-label={`View ${chamber.name} on Google Maps`}
        >
          <div className="relative w-full h-full">
            <iframe
              src={chamber.embedMapLink}
              className="w-full h-full pointer-events-none" // Prevents iframe from capturing clicks
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-colors duration-300 flex items-center justify-center">
              <div className="p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 transform">
                <ExternalLink className="text-gray-800" size={24} />
              </div>
            </div>
          </div>
        </a>
      )}

      <div className="flex-1 p-6 bg-white">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-800 mb-3">
          <Building size={24} className="text-primary" />
          {chamber.name}
        </h3>
        <div className="space-y-4 text-gray-600">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
            <p>{chamber.address}</p>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 mt-1 text-gray-400 flex-shrink-0" />
            <div>
              {chamber.schedule.map((line, index) => (
                <p key={index} className="leading-snug">{line}</p>
              ))}
            </div>
          </div>

          {chamber.hotline && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <Link
                href={`tel:${formatPhoneNumber(chamber.hotline)}`}
                className="font-semibold text-primary hover:underline"
              >
                Hotline: {chamber.hotline}
              </Link>
            </div>
          )}

          <div className="flex flex-wrap gap-4 pt-2">
            {chamber.website && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={chamber.website} target="_blank">
                  <Globe size={16} /> Website
                </Link>
              </Button>
            )}
            {chamber.facebook && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href={chamber.facebook} target="_blank">
                  <Facebook size={16} /> Facebook
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      {(chamber.phones?.length ?? 0) > 0 && (
        <div className="border-t-2 bg-gray-50 px-6 py-4">
          <p className="text-sm font-semibold text-gray-500 mb-2">For Serial:</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {chamber.phones.map((phone) => (
              <Link
                href={`tel:${formatPhoneNumber(phone)}`}
                key={phone}
                className="text-base font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                {phone}
              </Link>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
