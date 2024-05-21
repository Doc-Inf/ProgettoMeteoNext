<?php
    require_once 'functions.php';
    
    $dati = [];

    if(isset($_GET['anno'])){
        $annoRichiesto = $_GET['anno'];
        $yearsReport = getYearsReport($db, $annoRichiesto);
        $yearReport = getYearReport($db, $annoRichiesto);
        if(isset($_GET['mese'])){
            $meseRichiesto = $_GET['mese'];
            $rilevazioniMese = getMonthData($db, $annoRichiesto, $meseRichiesto);
            $dati = [
                "reportAnnuali" => $yearsReport,
                "rilevazioniAnnualiPerMese" => $yearReport,
                "rilevazioniMese" => $rilevazioniMese
            ];
        }else{
            $rilevazioniMese = getMonthData($db, $annoRichiesto, 1);
            $dati = [
                "reportAnnuali" => $yearsReport,
                "rilevazioniAnnualiPerMese" => $yearReport,
                "rilevazioniMese" => $rilevazioniMese
            ];
        }
    }else{        
        $lastDataDay = getLastDay($db);
        $giornoMeseAnno = explode('-',$lastDataDay); 
        $yearsReport = getYearsReport($db, $giornoMeseAnno[0]);
        $yearReport = getYearReport($db, $giornoMeseAnno[0]);
        $rilevazioniMese = getMonthData($db, $giornoMeseAnno[0], $giornoMeseAnno[1]);
        
        $dati = [
            "reportAnnuale" => $yearsReport,
            "rilevazioniAnnualiPerMese" => $yearReport,
            "rilevazioniMese" => $rilevazioniMese
        ];
    }  
    
    header('Content-type: application/json');
    echo json_encode($dati);
    
?>