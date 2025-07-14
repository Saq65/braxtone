import Image from "next/image";

interface ServiceHeaderProps {
  image?: string;
  heading?: string;
  paragraph: string;
}

const ServiceHeader = ({ image, heading, paragraph }: ServiceHeaderProps) => {
  return (
    <div className="text-center mb-14 mt-8">
      {image && (
        <div className="flex justify-center mb-6">
          <Image
            src={image}
            alt="Dania"
            width={100}
            height={100}
            className="rounded-full object-cover border-2 border-white shadow"
          />
        </div>
      )}
      {heading && (
        <h1 className="text-2xl md:text-4xl font-semibold text-[#1a1a1a] mb-3 mt-10">
          {heading}
        </h1>
      )}
      <p className="text-base md:text-lg text-gray-600">{paragraph}</p>
    </div>
  );
};

export default ServiceHeader;
