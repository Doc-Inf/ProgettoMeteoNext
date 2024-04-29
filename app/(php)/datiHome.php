<?php     
        require_once 'functions.php';
        $lastDataDay = getLastDay($db);
        $dayBeforeLastDataDay = getDayBefore($lastDataDay);
        
        $ultimaRilevazione = getData($db, $lastDataDay);
        $rilevazioneGiornoPrecedenteUltima = getData($db, $dayBeforeLastDataDay);
        
        $endDate = new DateTime($lastDataDay);
        $startDate = (new DateTime($endDate->format("Y-m-d H:i:s")))->modify("-7 day");
        $giorniSettimanaCorrente = [];
        $temperaturaSettimanale = [];
        $umiditaSettimanale = [];
        $pressioneSettimanale = [];
        $pioggiaSettimanale = [];
        $maxTemperaturaSettimanale = [];
        $minTemperaturaSettimanale = [];

        for($i=6;$i>=0;--$i){
            $currentDay = (new DateTime($endDate->format("Y-m-d H:i:s")))->modify("-$i day");
            $res= getData($db,$currentDay->format("Y-m-d H:i:s"));
            $giorniSettimanaCorrente[] = $currentDay->format("Y-m-d");
            $temperaturaSettimanale[] = $res['temperaturaMedia'];
            $umiditaSettimanale[] = $res['umiditaMedia'];
            $pressioneSettimanale[] = $res['pressioneMedia'];
            $pioggiaSettimanale[] = $res['pioggiaGiornaliera'];
            $maxTemperaturaSettimanale[] = $res['maxTemperatura'];
            $minTemperaturaSettimanale[] = $res['minTemperatura'];
        }

        $dati = ["ultimaRilevazione"=>$ultimaRilevazione, 
                 "rilevazioneGiornoPrimaUltima"=>$rilevazioneGiornoPrecedenteUltima,
                 "giorniSettimanaCorrente" => $giorniSettimanaCorrente,
                 "temperaturaSettimanale" => $temperaturaSettimanale,
                 "umiditaSettimanale" => $umiditaSettimanale,
                 "pressioneSettimanale" => $pressioneSettimanale,
                 "pioggiaSettimanale" => $pioggiaSettimanale,
                 "maxTemperaturaSettimanale" => $maxTemperaturaSettimanale,
                 "minTemperaturaSettimanale" => $minTemperaturaSettimanale
                ];
        echo json_encode($dati);

        function getDayBefore(string $day): string {
            $interval = DateInterval::createFromDateString('1 day');
            $phpDate = new DateTime($day);
            $phpDayBefore = $phpDate->sub($interval);
            return $phpDayBefore->format('Y-m-d H:i:s');
        }
       
    ?>    
