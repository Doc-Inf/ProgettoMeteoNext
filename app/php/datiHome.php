<?php     
    require_once 'functions.php';

    $lastDataDay = getLastDay($db);
    $dayBeforeLastDataDay = getDayBefore($lastDataDay);
       
    $ultimaRilevazione = getData($db, $lastDataDay);
    $rilevazioneGiornoPrecedenteUltima = getData($db, $dayBeforeLastDataDay);
    $rilevazioniGiornaliere = getRilevazioniGiornaliere($db, $lastDataDay);
    
    $endDate = new DateTime($lastDataDay);
    $startDate = (new DateTime($endDate->format("Y-m-d H:i:s")))->modify("-7 day");
    $giorniSettimanaCorrente = [];
    $temperaturaSettimanale = [];
    $umiditaSettimanale = [];
    $pressioneSettimanale = [];
    $pioggiaSettimanale = [];
    $maxTemperaturaSettimanale = [];
    $minTemperaturaSettimanale = [];
    $maxUmiditaSettimanale = [];
    $minUmiditaSettimanale = [];
    $maxPressioneSettimanale = [];
    $minPressioneSettimanale = [];
    $res= getWeekData($db,$endDate->format("Y-m-d H:i:s"));
    //print_r($res);
    
    for($i=0;$i<8;++$i){
        if(isset($res[$i])){
            $giorniSettimanaCorrente[] = $res[$i]['data'];
            $temperaturaSettimanale[] = $res[$i]['temperaturaMedia'];
            $umiditaSettimanale[] = $res[$i]['umiditaMedia'];
            $pressioneSettimanale[] = $res[$i]['pressioneMedia'];
            $pioggiaSettimanale[] = $res[$i]['pioggiaGiornaliera'];
            $maxTemperaturaSettimanale[] = $res[$i]['maxTemperatura'];
            $minTemperaturaSettimanale[] = $res[$i]['minTemperatura'];
            $maxUmiditaSettimanale[] = $res[$i]['maxUmidita'];
            $minUmiditaSettimanale[] = $res[$i]['minUmidita'];
            $maxPressioneSettimanale[] = $res[$i]['maxPressione'];
            $minPressioneSettimanale[] = $res[$i]['minPressione'];
        }else{
            if(!isset($giorniSettimanaCorrente[$i-1])){
                $giorniSettimanaCorrente[] = null;
            }else{
                $nextDay = new DateTime($giorniSettimanaCorrente[$i-1]);
                $giorniSettimanaCorrente[] = $nextDay->modify("+1 day")->format("Y-m-d");
            }
            $temperaturaSettimanale[] = null;
            $umiditaSettimanale[] = null;
            $pressioneSettimanale[] = null;
            $pioggiaSettimanale[] = null; 
            $maxTemperaturaSettimanale[] = null;
            $minTemperaturaSettimanale[] = null;
            $maxUmiditaSettimanale[] = null;
            $minUmiditaSettimanale[] = null;
            $maxPressioneSettimanale[] = null;
            $minPressioneSettimanale[] = null;
        }
        
    }
    
    $dati = ["ultimaRilevazione"=>$ultimaRilevazione, 
             "rilevazioneGiornoPrimaUltima"=>$rilevazioneGiornoPrecedenteUltima,
             "rilevazioniGiornaliere" => $rilevazioniGiornaliere,
             "giorniSettimanaCorrente" => $giorniSettimanaCorrente,
             "temperaturaSettimanale" => $temperaturaSettimanale,
             "umiditaSettimanale" => $umiditaSettimanale,
             "pressioneSettimanale" => $pressioneSettimanale,
             "pioggiaSettimanale" => $pioggiaSettimanale,
             "maxTemperaturaSettimanale" => $maxTemperaturaSettimanale,
             "minTemperaturaSettimanale" => $minTemperaturaSettimanale,
             "maxUmiditaSettimanale" => $maxUmiditaSettimanale,
             "minUmiditaSettimanale" => $minUmiditaSettimanale,
             "maxPressioneSettimanale" => $maxPressioneSettimanale,
             "minPressioneSettimanale" => $minPressioneSettimanale,
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
