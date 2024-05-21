<?php
    require_once 'functions.php';

    $giorno = "";
    $dati = [];

    if(isset($_GET['giorno'])){
        $giorno = $_GET['giorno'];
    }else{
        $giorno = getLastDay($db);        
    }
    
    $dayBefore = getDayBefore($giorno);

    $rilevazioniGiornaliere = getRilevazioniGiornaliere($db, $giorno);

    $rilevazioniUltimi30Giorni = getLast30DayData($db, $giorno);

    $giornoMeseAnno = explode('-',$giorno); 
    $rilevazioniMese = getMonthData($db, $giornoMeseAnno[0], $giornoMeseAnno[1]);

    $dati = [
        "rilevazioniGiornaliere" => $rilevazioniGiornaliere,
        "rilevazioniUltimi30Giorni" => $rilevazioniUltimi30Giorni,
        "rilevazioniMese" => $rilevazioniMese
    ];
    
    header('Content-type: application/json');
    echo json_encode($dati);

    function getDayBefore(string $day): string {
        $interval = DateInterval::createFromDateString('1 day');
        $phpDate = new DateTime($day);
        $phpDayBefore = $phpDate->sub($interval);
        return $phpDayBefore->format('Y-m-d H:i:s');
    }

    
?>