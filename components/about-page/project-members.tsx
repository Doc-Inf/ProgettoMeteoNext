import PeopleCard from "../cards/people-card";

export default function ProjectMembers() {
  return (
    <>
      <h2 className="pb-2 text-4xl md:text-6xl font-medium tracking-tight scroll-m-20 first:mt-0 drop-shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] mb-8 text-center">
        Partecipanti al progetto
      </h2>
      {/* PROF */}
      <PeopleCard
        title="Professori"
        people={[
          { name: "Bonifazi Andrea", subj: "Informatica" },
          { name: "Rispoli Maria", subj: "Informatica" },
        ]}
        single={true}
      />
      {/* STUDENTS */}
      <div className="mt-8 mb-96 md:mb-40 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-4 h-[40vh]">
        <PeopleCard
          title="Professori"
          people={[
            { name: "Bonifazi Andrea", subj: "Informatica" },
            { name: "Rispoli Maria", subj: "Informatica" },
          ]}
          className="hidden lg:block"
        />
        <PeopleCard
          title="Studenti Informatica"
          people={[
            { name: "Boaretto Lorenzo", subj: "Informatica" },
            { name: "Cipolla Emilio", subj: "Informatica" },
            { name: "Crespi Mirko", subj: "Informatica" },
            { name: "Fonti Luca", subj: "Informatica" },
            { name: "Fruncillo Carmine", subj: "Informatica" },
            { name: "Giardino Leonardo", subj: "Informatica" },
            { name: "Imbastari Riccardo", subj: "Informatica" },
            { name: "Pietrosanti Francesco", subj: "Informatica" },
            { name: "Rossi Jonathan", subj: "Informatica" },
            { name: "Somma Francesco", subj: "Informatica" },
          ].sort()}
        />
        <PeopleCard
          title="Studenti Scientifico"
          people={[
            { name: "Bastianelli Tommaso", subj: "Scientifico" },
            { name: "Crespi Edoardo", subj: "Scientifico" },
            { name: "Masi Gabriele", subj: "Scientifico" },
          ]}
        />
      </div>
    </>
  );
}
