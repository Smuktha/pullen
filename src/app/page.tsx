import Image from "next/image";
import Link from 'next/link';
import Navbar from "@/app/components/Navbar";

export default function Page() {
  return (
    <>
      
      {/* rest of your page JSX */}
   
 


<section
  id="hero"
  className="relative h-[80vh] flex items-center justify-center text-center max-w"
>
  <div
    className="absolute inset-0 bg-cover bg-center brightness-40"
    style={{ backgroundImage: "url('/head.jpg')" }}
  ></div>

  <div className="relative z-10 flex flex-col items-center">
    <Image
      src="/logo-header.png"
      alt="BrightSmile Dental Logo"
      width={300}
      height={60}
      className="mb-4"
    />

    <Link
      href="/appointment"
      className="bg-[#f58220] text-white px-6 py-3 rounded-lg hover:bg-[#e57210] transition duration-300"
    >
      Book Appointment
    </Link>
  </div>
</section>


    
      {/* 2. About Section */}
<section
  id="about"
  className="py-12 max-w bg-white text-center scroll-mt-20"
>
 
  {/* Extended About Info */}
  <div className="my-12">
    <h2 className="text-lg uppercase tracking-wide text-gray-600">Enhance Your Smile</h2>
    <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">At Pullen Dental</h3>

    <p className="text-gray-700 max-w-3xl mx-auto">
     DISCOVER EASY, EXCELLENT CARE AT<strong> PULLEN DENTAL </strong>
      With a high level of care and attention to your oral health needs, 
      we provide patients with high quality treatment in a safe and compassionate environment.
       With the latest in technology and equipment, you can rest assured you're getting the best in dental care.
    </p>

    <p className="text-gray-700 max-w-3xl mx-auto mt-4">
      Enjoy accessible, comprehensive services under one roof. We provide complete care
      solutions for every stage of life. Our practice has proudly been serving families
      in the community for several years.
    </p>

    <div className="mt-8 flex justify-center">
      <Image
        src="/partners.png"
        alt="Health Insurance Partners"
        width={800}
        height={200}
        className="rounded shadow"
      />
    </div>
  </div>
</section>


     {/* 3. Appointment Section */}
<section
  id="services"
  className="py-12 max-w bg-[#e6f4f3] text-center scroll-mt-20"
>
  <h2 className="text-3xl font-bold text-[#007a87] mb-4">
    Make an Appointment
  </h2>
  <p className="text-[#444] mb-6">
    Schedule your dental visit with us in just a click.
  </p>
  <Link
    href="/appointment"
    className="bg-[#007a87] text-white px-6 py-3 rounded-lg hover:bg-[#006066] transition"
  >
    Book Now
  </Link>
</section>
      {/* 4. Our Dentists Section */}
      <section className="py-12 max-w bg-white text-center">
        <h2 className="text-3xl font-bold text-[#007a87] mb-4">OUR DENTISTS</h2>
        <p className="max-w-4xl mx-auto text-[#333] mb-6">
         
          Maryborough dentists Dr Jason Phan and Dr James Chien, and the entire practice team are excited to welcome you to Pullen Dental! 
          Whether it's having your toddler receive their first gentle cleaning from our highly qualified staff, or you're an adult enjoying retirement and want a new smile to accompany your next phase of life, we've been here in the community for more than 30 years. 
          Everyone deserves to have a brilliant smile, and we can make it happen!
        </p>
        <a
          href="#meet-the-dentists"
          className="text-[#007a87] font-medium underline hover:text-[#005f66] transition"
        >
          Meet Our Dentists &gt;
        </a>
      </section>

      {/* 5. Meet the Dentists Section */}
      <section
        id="meet-the-dentists"
        className="py-12 max-w bg-[#e6f4f3] text-center"
      >
        <h3 className="text-3xl font-bold text-[#007a87] mb-8">
          MEET THE DENTISTS
        </h3>

        <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
          {/* Dr. Karen Silva */}
          <div className="bg-white border border-[#b2dad9] rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row text-left">
            <div className="md:w-1/2 w-full h-64 md:h-auto">
              <Image
                src="/dr-james1.jpg"
                alt="DR JAMES CHIEN"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-center">
              <h4 className="text-xl font-semibold text-[#007a87] mb-2">
               DR JAMES CHIEN
              </h4>
              <p className="text-[#444]">
                James has been providing care for the community for 7 years.
                 A very friendly clinician who will make you feel very comfortable in the clinic.
                  James' strengths lie in oral surgery. 
                  A man of fitness, James loves to stay active and push his body to the physical limit. 
                You may run into him at Maryborough Cross Fit.
              </p>
            </div>
          </div> 
          {/* Dr. Stefano Burti */}
          <div className="bg-white border border-[#b2dad9] rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row text-left">
            <div className="md:w-1/2 w-full h-64 md:h-auto">
              <Image
                src="/dr-jason1.jpg"
                alt="Dr. Stefano Burti"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-center">
              <h4 className="text-xl font-semibold text-[#007a87] mb-2">
                DR JASON PHAN 
              </h4>
              <p className="text-[#444]">
               Graduating from the University of Queensland, Jason moved to the Wide Bay region where he spent some time working at the hospital in Hervey Bay. 
               He has since moved to Pullen Dental in Maryborough and enjoys the lifestyle that the region provides. 
               Jason is very interested in both fixed and removable prosthodontics.
                Jason endeavours to make sure you have a comfortable 
              </p>
            </div>
          </div>
        </div>

        <p className="max-w-4xl mx-auto text-[#444] mt-8 text-center">
          Whether you need general dentistry services or want to enhance your
          smile's appearance, our dentists possess the knowledge and skills to
          help you achieve your goals!
        </p>
      </section>

      {/* 6. Contact / Map Section */}
      <section
        id="contact"
        className="py-12 max-w bg-[#e6f4f3] text-center scroll-mt-20"
      >
        <h2 className="text-3xl font-bold text-[#007a87] mb-4">Find Us</h2>
        <div className="flex justify-center">
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26474.236479591782!2d152.703984!3d-25.541835!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6beb6716b935fc9f%3A0x5771122d3bb2393e!2sPullen%20Dental!5e1!3m2!1sen!2sus!4v1748269915296!5m2!1sen!2sus"
  width="100%"
  height="350"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

        </div>
      </section>

      {/* 7. Footer */}
{/* Footer */}
<footer className="bg-gray-800 text-white py-8 max-w">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-4">
    
    {/* Logo */}
    <div className="w-full md:w-auto flex justify-center md:justify-start">
      <img 
        src="/logo-header.png" 
        alt="Dental Clinic Logo" 
        className="h-12 md:h-14 object-contain"
      />
    </div>

    {/* Address & Phone */}
    <div>
      <p className="text-lg font-medium">
       Pullen Dental
24B Ellena Street
Maryborough, QLD 4650
 |{" "}
        <a href="Phone: (07) 4763 7698" className="text-white hover:underline font-bold">
         (07)47637687
        </a>
      </p>
      
      <p className="mt-4 text-sm text-gray-400">
        © 2025 Pullen Dental. All rights reserved.
      </p>
    </div>
  </div>
</footer>


</>
 );
}