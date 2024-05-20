# ProgettoMeteoNext

Note per l'installazione:

Da terminale digitare:
1)  npm i
  comando necessario per installare tutte le dipendenze
2)  Modificare i seguenti link:
    components/archive/archive-form.tsx (ln: 53), in php/datiStorico.php?giorno=${format(date, "yyyy-MM-dd")}`
    components/hero/complete-page.tsx (ln: 25), in "php/datiHome.php"
    components/report/report-table-month.tsx (ln: 24) in php/datiReport.php?anno=${new Date().getFullYear()}&mese=${month}`    
    components/report/report-table-year.tsx (ln: 24) in php/datiReport.php?anno=${year}`

    Non modificare il link components/report/report-table-more.tsx (ln: 20)  servirebbe relativo: "php/datiReport.php", ma rimane server side, quindi non toccare il link assoulto
4)  compilare utilizzando:
    npx next build
5)  Modificare tutti i link assoulti in relativi modificando tutte le occorrenze 'src="/' in 'src="./'
6)  Rinominare e spostare la cartella out
7)  Inserire la cartella del repository app/php dentro out
8)  Inserire il contenuto della cartella font-dir dentro la cartella out/_next/static/css
9)  Prima di caricare su Aruba, modificare di conseguenza il file di configurazione dentro la cartella PHP
   
