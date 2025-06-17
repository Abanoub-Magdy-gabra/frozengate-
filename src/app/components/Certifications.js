const CertificationsSection = () => {
    const certifications = [
      { src: "/images/Food_and_Drug_Administration_logo 1.png", alt: "FDA Logo" },
      { src: "/images/ISO-01 1.png", alt: "ISO 9001:2015" },
      { src: "/images/Global-Gap 1.png", alt: "GLOBALG.A.P Logo" },
      { src: "/images/sedex-information-exchange-limited-logo-vector 1.png", alt: "Sedex Logo" },
      { src: "/images/ISO-22000.png", alt: "ISO 22000 Logo" },
      { src: "/images/BRCGS_CERT_FOOD_LOGO 1.png", alt: "BRCGS Food Safety Logo" },
      { src: "/images/Layer_1.png", alt: "Kosher Logo" }
    ];
  
    return (
      <div className="max-w-[1200px] mx-auto my-[50px] p-5 text-center">
        <h2 className="font-['Montserrat'] text-[35px] leading-[48.76px] font-bold mb-5">
          Our Certifications
        </h2>
        <div className="flex justify-center items-center gap-[5px] flex-wrap">
          {certifications.map((cert, index) => (
            <img
              key={index}
              src={cert.src}
              alt={cert.alt}
              className="h-20 w-[130px] object-contain"
            />
          ))}
        </div>
      </div>
    );
  };
  export default CertificationsSection;