"use client";

import AboutHeading from "@/components/headings/about-heading";
import SubjectSection from "@/components/about-page/subject-section";
import SchoolInfo from "@/components/about-page/school-info";
import Timeline from "@/components/about-page/timeline";
import ProjectMembers from "@/components/about-page/project-members";
import ProgressBar from "@/components/progress-bar";

export default function About() {
  return (
    <>
      <ProgressBar />
      {/* MAIN CONTAINER */}
      <div className="px-5 overflow-x-hidden md:px-20">
        <AboutHeading />

        <SubjectSection />
        <SchoolInfo />
        <Timeline />
        <ProjectMembers />
        {/* LOCATION */}
        <h2 className="pb-2 mt-96 pt-40 md:pt-0 md:mt-20 text-4xl md:text-6xl font-medium tracking-tight scroll-m-20 first:mt-0 drop-shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] mb-8 text-center">
          Dove ci troviamo
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2980.041446606841!2d12.772633392988878!3d41.676448303931465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13259d347813ad7d%3A0x973948516bf1e19f!2sITIS%20Giancarlo%20Vallauri!5e0!3m2!1sit!2sit!4v1709122165121!5m2!1sit!2sit"
          style={{ border: "0" }}
          className="m-auto w-[80%] lg:w-[40%] aspect-square"
          allowFullScreen={false}
          loading="lazy"
          title="posizione scuola"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
