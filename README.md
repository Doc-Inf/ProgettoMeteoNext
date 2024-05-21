# ProgettoMeteoNext

## Note per l'installazione:

Da terminale digitare:

1.  `npm i`
    comando necessario per installare tutte le dipendenze
2.  Modificare i seguenti link:

- `components/archive/archive-form.tsx` (ln: 53), in `php/datiStorico.php?giorno=${format(date, "yyyy-MM-dd")}`
- `components/hero/complete-page.tsx` (ln: 25), in `php/datiHome.php`
- `components/report/report-table-month.tsx` (ln: 24) in `php/datiReport.php?anno=${new Date().getFullYear()}&mese=${month}`
- `components/report/report-table-year.tsx` (ln: 24) in `php/datiReport.php?anno=${year}`

**Modificare** il link in `components/report/report-table-more.tsx` (ln: 20) in "https://www.itisvallauri.net/meteo/php/datiReport.php". Servirebbe relativo: "php/datiReport.php", ma rimane server side, quindi non toccare il link assoluto

3.  compilare utilizzando: `npx next build`
4.  Modificare tutti i link assoulti in relativi modificando tutte le occorrenze `src="/` in `src="./`
5.  Rinominare e spostare la cartella out
6.  Inserire la cartella del repository `app/php` dentro out
7.  Inserire il contenuto della cartella `font-dir` dentro la cartella `out/\_next/static/css`
8.  Prima di caricare su Aruba, modificare di conseguenza il file di configurazione dentro la cartella PHP

## Overview del fetch nei componenti

Potete trovare il flusso di esecuzione dei componenti che eseguono data fetching, in questo <a href="https://excalidraw.com/#json=NkrJY23BssgJlhXDNZQ6i,Ht33e5AZ9yO4WXX46BPpAA">grafico,</a> oppure potete seguire le immagini sottostanti.

### Pagina Home

Contiene le rilevazioni del giorno corrente, i grafici giornalieri e le rilevazioni della settimana.

<p align="center" style="margin-bottom: 50px margin-top: 30px">
<img src="excalidraw/home.png?raw=true"  alt="Pagina home" width="80%"/>
</p>

### Pagina Report

Grafici per i componenti presenti nella pagina report

- **Report ultimi 5 anni,** contiene le rilevazioni degli ultimi 5 anni in formato di tabella.

<p align="center" style="margin-bottom: 50px margin-top: 30px">
<img src="excalidraw/report-more.png?raw=true"  alt="Pagina report ultimi 5 anni" width="70%" object-fit="contain"/>
</p>

- **Report annuale,** contiene le rilevazioni dei mesi dell'anno in formato di tabella. Permette di selezionare l'anno di cui visualizzare le rilevazioni.

<p align="center" style="margin-bottom: 50px margin-top: 30px">
<img src="excalidraw/report-year.png?raw=true"  alt="Pagina report mesi" width="70%" object-fit="contain"/>
</p>

- **Report mensile,** contiene le rilevazioni dei giorni del mese in formato di tabella. Permette di selezionare il mese di cui visualizzare le rilevazioni.

<p align="center" style="margin-bottom: 50px margin-top: 30px">
<img src="excalidraw/report-month.png?raw=true"  alt="Pagina report giorni" width="70%" object-fit="contain"/>
</p>

### Pagina storico

Permette di cercare le rilevazioni in due modalità:

- _mensile,_ che mostra le rilevazioni del mese prima della data selezionata
- _giornaliera,_ che mostra la rilevazione giornaliera della data selezionata

<p align="center" style="margin-block: 50px">
<img src="excalidraw/archive.png?raw=true"  alt="Pagina archivio" width="80%" object-fit="contain"/>
</p>
