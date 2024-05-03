import SubjCard from "../cards/subj-card";

export default function Timeline() {
  return (
    <div className="my-24 grid gap-4 lg:grid-cols-3">
      <SubjCard
        title="Fondazione scuola"
        par="La scuola viene istituita nell' A. S. 1960 /61 come succursale dell'I.T.I.S. `E. Fermi` di Roma all'epoca esistevano solo tre sezioni."
        sub="Settembre 1960"
      />
      <SubjCard
        title="Trasferimento sede"
        par="Nel mese di novembre dell'anno 1965 l'I.T.I.S. Vallauri, si trasferì definitivamente presso la sede attuale di via Salvo D' Acquisto."
        sub="Novembre 1965"
      />
      <SubjCard
        title="Ridenominazione istituto"
        par="Nell' A. S. 1968 / 69 divenne istituto autonomo e prese per l'appunto il nome dell' ingegnere `Giancarlo Vallauri`."
        sub="Settembre 1968"
      />
    </div>
  );
}
