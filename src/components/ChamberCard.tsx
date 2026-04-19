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

const getGoogleMapsLink = (chamber: { googleMapsLink?: string; mapQuery: string }) => {
  if (chamber.googleMapsLink?.trim()) {
    return chamber.googleMapsLink.trim();
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(chamber.mapQuery)}`;
};

interface ChamberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  chamber: Chamber;
}

export default function ChamberCard({ chamber, className }: ChamberCardProps) {
  return (
    <Card className={cn("flex flex-col", className)} key={chamber.id}>
      <div className="relative w-full aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {chamber.embedMapLink ? (
          <>
            <a
              href={getGoogleMapsLink(chamber)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${chamber.name} in Google Maps`}
              className="absolute inset-0 z-10"
            />
            <iframe
              src={chamber.embedMapLink}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full absolute top-0 left-0"
            ></iframe>
          </>
        ) : (
          <Building className="w-16 h-16 text-muted-foreground" />
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-4 min-h-16">{chamber.name}</h3>
        <div className="space-y-3 mb-6 text-muted-foreground flex-grow">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
            <span>{chamber.address}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
            <div className="flex flex-col">
              {chamber.schedule.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
          {(chamber.phones?.length || 0) > 0 && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
              <div className="flex flex-col">
                {chamber.phones?.map((phone) => (
                  <a key={phone} href={`tel:${phone}`}>
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          )}
          {chamber.hotline && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
              <a href={`tel:${chamber.hotline}`}>
                <span className="font-bold">Hotline: {chamber.hotline}</span>
              </a>
            </div>
          )}
          {chamber.website && (
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 mt-1 flex-shrink-0" />
              <a
                href={chamber.website}
                target="_blank"
                className="hover:underline flex items-center gap-1"
              >
                {chamber.website.replace(/^(https?:\/\/)?(www\.)?/, "")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
          {chamber.facebook && (
            <div className="flex items-start gap-3">
              <Facebook className="w-5 h-5 mt-1 flex-shrink-0" />
              <a
                href={chamber.facebook}
                target="_blank"
                className="hover:underline"
              >
                Facebook Page
              </a>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-auto">
          <Button asChild className="w-full">
            <Link href="/appointment">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Link>
          </Button>
          <Button asChild className="w-full" variant="outline">
            <a href={getGoogleMapsLink(chamber)} target="_blank" rel="noopener noreferrer">
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
