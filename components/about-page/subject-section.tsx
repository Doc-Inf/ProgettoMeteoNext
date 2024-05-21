import SubjCard from "../cards/subj-card";

export default function SubjectSection() {
  return (
    <>
      {/* ABOUT US */}
      <h2 className="pb-2 text-4xl md:text-6xl font-medium tracking-tight scroll-m-20 first:mt-0 drop-shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] mb-8 text-center">
        Informazioni su di noi
      </h2>
      {/* SUBJECTS*/}
      <div className="mb-32 space-y-10">
        <SubjCard
          title="Informatica"
          src="https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          par="Il Diplomato in Informatica e Telecomunicazioni ha competenze specifiche nel campo dei sistemi informatici, dell’elaborazione dell’informazione, delle applicazioni e tecnologie Web, delle reti e degli apparati di comunicazione.Ha competenze e conoscenze che si rivolgono all’analisi, progettazione, installazione e gestione di sistemi informatici, basi di dati, reti di sistemi di elaborazione, sistemi multimediali e apparati di trasmissione e ricezione dei segnali"
        />
        <SubjCard
          title="Elettronica e Robotica"
          src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          par="Il Diplomato in Elettronica ed Elettrotecnica ha competenze specifiche nel campo dei materiali e delle tecnologie costruttive dei sistemi elettrici, elettronici e delle macchine elettriche, della generazione, elaborazione e trasmissione dei segnali elettrici ed elettronici, dei sistemi per la generazione, conversione e trasporto dell’energia elettrica e dei relativi impianti di distribuzione.
          Collabora nella progettazione, costruzione e collaudo di sistemi elettrici ed elettronici di impianti elettrici e sistemi di automazione."
        />
        <SubjCard
          title="Scientifico"
          src="https://images.unsplash.com/photo-1564325724739-bae0bd08762c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          par="Il percorso di formazione Liceale è quello classico della formazione liceale-scientifica della tradizione italiana, con un occhio di riguardo agli elementi applicativi delle conoscenze scientifiche, a partire sin dal primo anno.
          In tale percorso, infatti, la scelta dell’opzione di “Scienze Applicate” avviene già dal primo giorno, e dura per l’intero quinquennio. "
        />
      </div>
    </>
  );
}
