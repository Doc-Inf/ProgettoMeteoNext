import Image from "next/image";

export default function SchoolInfo() {
  return (
    <div className="flex flex-col xl:grid xl:grid-cols-2 xl:space-x-8">
      <h2 className="order-1 pb-6 text-4xl font-normal tracking-tight text-center md:text-6xl scroll-m-20 first:mt-0 xl:col-span-2">
        La nostra scuola
      </h2>
      <h4 className="order-3 col-span-2 mt-6 mb-8 text-xl font-medium tracking-tight text-justify xl:order-2 lg:px-40 md:text-center scroll-m-20">
        La scuola viene istituita nell&lsquo; A. S. 1960 /61 come succursale
        dell&lsquo;I.T.I.S. &quot;E. Fermi&quot; di Roma all&lsquo;epoca
        esistevano solo tre sezioni: la sezione A di 37 alunni la sezione B di
        37 alunni la sezione C di 39 alunni le quali erano seguite dal Prof.
        Diana Umberto.
      </h4>
      <div className="order-3 text-justify ">
        <p className="leading-6 [&:not(:first-child)]:mt-4 text-pretty text-foreground/95">
          Il quale è stato il coordinatore con la partecipazione dell&lsquo;
          I.T.I.S. E. Fermi di Roma per l&lsquo; avvio e la gestione iniziale
          della scuola. Tutti i comuni a sud di Roma come ad esempio i Castelli
          , Colleferro ecc. insieme ad alcuni comuni della provincia di Latina,
          fino a giungere a Terracina, rappresentano il bacino d &lsquo;utenza
          dell&lsquo; attuale I.T.I.S. &quot;Giancarlo Vallauri&quot; di
          Velletri. Inizialmente l&lsquo;Istituto si appoggiò presso l&lsquo;
          I.T.C.G. &quot;Cesare Battisti&quot; , per passare poi dal palazzo
          comunale ad una villetta non troppo distante l&lsquo;ospedale di
          Velletri. Nel mese di novembre dell&lsquo;anno 1965 l&lsquo;I.T.I.S.
          Vallauri, si trasferì definitivamente presso la sede attuale di via
          Salvo D&lsquo; Acquisto. Nell&lsquo; A. S. 1968 / 69 divenne istituto
          autonomo e prese per l&lsquo;appunto il nome dell&lsquo; ingegnere
          &quot;Giancarlo Vallauri&quot;.
        </p>
        <p className="leading-6 [&:not(:first-child)]:mt-4 text-pretty text-foreground/95">
          Dalla sua autonomia ad oggi, più di cinquemila sono stati gli studenti
          diplomati. Questo perché il numero delle sezioni e degli alunni è
          progressivamente cresciuto nel corso del tempo; fino a raggiungere, un
          numero complessivo di 53 classi, 14 di esse sono state ospitate nella
          sede staccata di via Paolina a Velletri.
        </p>
        <p className="leading-6 [&:not(:first-child)]:mt-4 text-pretty text-foreground/95">
          La scuola dispone inoltre di diversi laboratori, dove gli alunni
          possono predisporre numerose esperienze. Al tempo stesso, dopo
          l&lsquo;entrata in vigore dei bacini di utenza, (DISTRETTO N°39/42) si
          è precisata e definita l&lsquo;area geografica dell&lsquo;I.T.I.S.
          &quot;G. Vallauri&quot;: gli allievi provengono ,infatti,
          prevalentemente da Lariano, Genzano, Albano, Ariccia, Lanuvio,
          Cecchina, S.Maria delle Mole, Castel Gandolfo, Ciampino, Cisterna e
          Artena oltre che , come ovvio, dalla stessa Velletri.
        </p>
        <p className="leading-6 [&:not(:first-child)]:mt-4 text-pretty text-foreground/95">
          Alla iniziale specializzazione in Elettronica Industriale si sono
          affiancati, più di recente nuovi corsi (INFORMATICA e LICEO
          SCIENTIFICO TECNOLOGICO), ciò nell&lsquo;intento di rispondere con
          sempre maggiore efficacia alla domanda e alle legittime esigenze del
          mondo del lavoro che, alla scuola chiede un continuo sforzo di
          aggiornamento per adeguare i futuri periti all&lsquo;apprendimento e
          all&lsquo;uso delle nuove tecnologie.
        </p>
      </div>
      <div className="flex flex-col self-center order-2 align-items-center *:m-auto space-y-8 xl:order-3">
        <Image
          src="https://statics.cedscdn.it/photos/MED_HIGH/47/45/5794745_1122_luciano_sciurba_1.jpg"
          className="rounded-sm shadow-md lg:w-8/12 shadow-primary"
          width={0}
          height={0}
          alt="Giancarlo Vallauri Velletri"
        />
        <Image
          src="https://www.itisvallauri.net/meteo/img/scuola1.jpg"
          className="hidden w-6/12 rounded-sm shadow-md xl:block shadow-primary"
          width={0}
          height={0}
          alt="Giancarlo Vallauri Velletri"
        />
      </div>
    </div>
  );
}
