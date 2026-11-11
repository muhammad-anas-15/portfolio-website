import { FiMapPin } from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import Timeline from "../components/Timeline";
import { education } from "../data/portfolio";

const EducationBody = (edu) => (
  <div className="card p-6 sm:p-8">
    <h4 className="font-display text-xl font-bold text-cream sm:text-2xl">{edu.degree}</h4>
    <p className="mt-1 text-accent-bright">{edu.school}</p>
    <p className="label mt-2 flex items-center gap-1.5">
      <FiMapPin /> {edu.location}
    </p>
    {edu.details && <p className="mt-4 leading-relaxed text-soft/90">{edu.details}</p>}
  </div>
);

const Education = () => (
  <section id="education" className="relative py-24 sm:py-32">
    <div className="container-page">
      <SectionHeading
        title="Where I’ve"
        accent="studied"
        subtitle="The academic foundation behind my work."
      />
      <Timeline items={education} renderBody={EducationBody} />
    </div>
  </section>
);

export default Education;
