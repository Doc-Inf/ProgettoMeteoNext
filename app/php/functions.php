<?php
    session_start();
      
    ini_set ('display_errors', 1);
    ini_set ('display_startup_errors', 1);
    error_reporting (E_ALL);  
    require_once __DIR__ . "/DB/DB.php";
        
    $config = getConfig();
    
    if($config->database->dbLibrary === "pdo"){
        require_once __DIR__ . "/DB/PdoConnection.php";
        $db = new PdoConnection($config->database->hostname,$config->database->username,$config->database->password,$config->database->port,$config->database->dbname,$config->database->dbmsName);
    }else{
        if($config->database->dbLibrary === "mysqli"){
            require_once __DIR__ . "/DB/MySqliConnection.php";
            $db = new MySqliConnection($config->database->hostname,$config->database->username,$config->database->password,$config->database->dbname,$config->database->port);
        }else{
            die("Errore configurazione: la libreria specificata nel file di configurazione, per connettersi al DBMS non è valida");
        }
    }
    
      
    function getConfig(string $PathToConfigJson =__DIR__ . "/config.json") {        
        for($i=0; $i<10; $i++){
            $confData = file_get_contents($PathToConfigJson);
            if(!$confData){
                $PathToConfigJson = "../" . $PathToConfigJson;
            }else{
                break;
            }
        }       
        return json_decode($confData);
    }
  
    function redirect(string $path_to_page) {
        header("Location: $path_to_page");
        die();
    }

    function redirect_post_data(string $path_to_page, array $data) {
        $formName = rand(1, 9999999);
        echo "<form id='$formName' action='$path_to_page' method='post'>";
        foreach ($data as $a => $b) {
            echo '<input type="hidden" name="'.htmlentities($a).'" value="'.htmlentities($b).'">';
        }
        echo "</form><script type='text/javascript'>document.getElementById('$formName').submit();</script>";
    }

    function extractDate($datetime){
        $date = explode(" ",$datetime)[0];
        $dataInfo = explode("-",$date);
        return $dataInfo[2] . "-" . $dataInfo[1] . "-" . $dataInfo[0];
    }

    function formatDate($date){
        $data = new DateTime($date);
        return $data->format("d-m-Y") . " ore: " . $data->format("H:i:s"); 
    }

    function closeTab(){
        echo "<script>window.close()</script>";
    }

    function getLastDay($db){
        $date = new DateTime(date('Y/m/d H:i:s'));
        $year = $date->format("Y");
        $result = $db->query("SELECT MAX(data) as'ultimoGiornoRilevazioni' FROM y$year");
        if(count($result) == 0 ){
            do{
                --$year;
                $result = $db->query("SELECT MAX(data) as'ultimoGiornoRilevazioni' FROM y$year");
            }while(count($result) == 0);            
        }else{
            if($result[0]["ultimoGiornoRilevazioni"] == ""){
                --$year;
                $result = $db->query("SELECT MAX(data) as'ultimoGiornoRilevazioni' FROM y$year");
            }     
        }
        return $result[0]['ultimoGiornoRilevazioni'];
    }
    
    function getData($db, $giorno){
        $dataOraSelezionata = new DateTime($giorno);
        $year = $dataOraSelezionata->format("Y");
        $data = $dataOraSelezionata->format("Y-m-d");

        $sql = <<<q
        SELECT  t2.data,
                t2.ora,
                t2.temperaturaUltimaRilevazione,
                t2.umiditaUltimaRilevazione,
                t2.pressioneUltimaRilevazione,
                t2.direzioneVentoUltimaRilevazione,
                t2.velocitaVentoUltimaRilevazione,
                DATE(t1.data) as 'data', 
                t1.maxTemperatura,
                t1.minTemperatura,
                t1.temperaturaMedia,
                t1.maxUmidita,
                t1.minUmidita,
                t1.umiditaMedia,
                t1.maxPressione,
                t1.minPressione,
                t1.pressioneMedia,
                t1.maxVelocitaVento,
                t1.minVelocitaVento,
                t1.mediaVelocitaVento,
                t1.pioggiaGiornaliera
        FROM (  SELECT DATE(data) as 'data', 
                    MAX(tempOut) as 'maxTemperatura', 
                    MIN(tempOut) as 'minTemperatura', 
                    ROUND(AVG(tempOut),1) as 'temperaturaMedia', 
                    MAX(outHum) as 'maxUmidita', 
                    MIN(outHum) as 'minUmidita', 
                    ROUND(AVG(outHum),1) as 'umiditaMedia', 
                    MAX(bar) as 'maxPressione', 
                    MIN(bar) as 'minPressione', 
                    ROUND(AVG(bar),1) as 'pressioneMedia', 
                    MAX(windSpeed) as 'maxVelocitaVento', 
                    MIN(windSpeed) as 'minVelocitaVento', 
                    ROUND(AVG(windSpeed),1) as 'mediaVelocitaVento', 
                    SUM(rain) as 'pioggiaGiornaliera' 
                FROM y$year
                WHERE DATE(data) = '$data'
                GROUP BY DATE(data)) as t1, 
            (   SELECT  DATE(data) as 'data', 
                        TIME(data) as 'ora',
                        tempOut as 'temperaturaUltimaRilevazione',
                        outHum as 'umiditaUltimaRilevazione',
                        bar as 'pressioneUltimaRilevazione',
                        windDir as 'direzioneVentoUltimaRilevazione',
                        windSpeed as 'velocitaVentoUltimaRilevazione'
                FROM y$year
                WHERE data >=all(   SELECT data
                                    FROM y$year
                                    WHERE DATE(data) = '$data')
            ) as t2
  
        q;
               
        $result = $db->query($sql);
        return $result[0];       
    }
    /* OLD AND SLOW però con orari di minime e massime
    function getData($db, $giorno){
        $date = new DateTime($giorno);
        $year = $date->format("Y");
        $db->beginTransaction();
        $db->dmlCommand("SET @dataOraUltimaRilevazione = '$giorno'");
        $db->dmlCommand("SET @temperaturaUltimaRilevazione = (SELECT tempOut FROM y$year WHERE data=@dataOraUltimaRilevazione)");
        $db->dmlCommand("SET @umiditaUltimaRilevazione = (SELECT outHum FROM y$year WHERE data=@dataOraUltimaRilevazione)");
        $db->dmlCommand("SET @pressioneUltimaRilevazione = (SELECT bar FROM y$year WHERE data=@dataOraUltimaRilevazione)");
        $db->dmlCommand("SET @direzioneVentoUltimaRilevazione = (SELECT windDir FROM y$year WHERE data=@dataOraUltimaRilevazione)");
        $db->dmlCommand("SET @velocitaVentoUltimaRilevazione = (SELECT windSpeed FROM y$year WHERE data=@dataOraUltimaRilevazione)");
        $db->dmlCommand("SET @dataUltimaRilevazione = DATE(@dataOraUltimaRilevazione)");
        $db->dmlCommand("CREATE TEMPORARY TABLE IF NOT EXISTS ultimeMisurazioni SELECT DATE(data) as 'data', TIME(data) as 'ora',tempOut, bar,outHum,windDir as 'direzioneVento',windSpeed as 'velocitaVento', rain FROM y$year WHERE DATE(data) = @dataUltimaRilevazione;");

        $db->dmlCommand("SET @maxTemperatura = (SELECT MAX(tempOut) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @oraMaxTemperatura = (SELECT ora FROM ultimeMisurazioni WHERE tempOut=@maxTemperatura LIMIT 1)");
        $db->dmlCommand("SET @minTemperatura = (SELECT MIN(tempOut) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @oraMinTemperatura = (SELECT ora FROM ultimeMisurazioni WHERE tempOut=@minTemperatura LIMIT 1)");
        $db->dmlCommand("SET @mediaTemperatura = (SELECT AVG(tempOut) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @maxUmidita = (SELECT MAX(outHum) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @oraMaxUmidita = (SELECT ora FROM ultimeMisurazioni WHERE outHum=@maxUmidita LIMIT 1)");
        $db->dmlCommand("SET @minUmidita = (SELECT MIN(outHum) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @oraMinUmidita = (SELECT ora FROM ultimeMisurazioni WHERE outHum=@minUmidita LIMIT 1)");
        $db->dmlCommand("SET @mediaUmidita = (SELECT AVG(outHum) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @maxPressione = (SELECT MAX(bar) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @oraMaxPressione = (SELECT ora FROM ultimeMisurazioni WHERE bar=@maxPressione LIMIT 1)");
        $db->dmlCommand("SET @minPressione = (SELECT MIN(bar) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @oraMinPressione = (SELECT ora FROM ultimeMisurazioni WHERE bar=@minPressione LIMIT 1)");
        $db->dmlCommand("SET @mediaPressione = (SELECT AVG(bar) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @maxVelocitaVento = (SELECT MAX(velocitaVento) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @oraMaxVelocitaVento = (SELECT ora FROM ultimeMisurazioni WHERE velocitaVento=@maxVelocitaVento LIMIT 1)");
        $db->dmlCommand("SET @minVelocitaVento = (SELECT MIN(velocitaVento) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @oraMinVelocitaVento = (SELECT ora FROM ultimeMisurazioni WHERE velocitaVento=@minVelocitaVento LIMIT 1)");
        $db->dmlCommand("SET @mediaVelocitaVento = (SELECT AVG(velocitaVento) FROM ultimeMisurazioni)");
        $db->dmlCommand("SET @direzioneMaxVento = (SELECT direzioneVento FROM ultimeMisurazioni WHERE velocitaVento=@maxVelocitaVento LIMIT 1)");
        
        $db->dmlCommand("SET @pioggiaGiornaliera = (SELECT SUM(rain) FROM ultimeMisurazioni)");
        
        $db->dmlCommand("DROP TEMPORARY TABLE IF EXISTS ultimeMisurazioni");
        
        $result =  $db->query("SELECT @dataOraUltimaRilevazione as'dataOraUltimaRilevazione', @temperaturaUltimaRilevazione as 'temperaturaUltimaRilevazione', @umiditaUltimaRilevazione as 'umiditaUltimaRilevazione', @pressioneUltimaRilevazione as 'pressioneUltimaRilevazione', @direzioneVentoUltimaRilevazione as 'direzioneVentoUltimaRilevazione', @velocitaVentoUltimaRilevazione as 'velocitaVentoUltimaRilevazione', @dataUltimaRilevazione as'data', @maxTemperatura as 'maxTemperatura', @oraMaxTemperatura as 'oraMaxTemperatura', @minTemperatura as 'minTemperatura', @oraMinTemperatura as 'oraMinTemperatura', FORMAT(@mediaTemperatura,1) as 'temperaturaMedia', @maxUmidita as 'maxUmidita', @oraMaxUmidita as 'oraMaxUmidita', @minUmidita as 'minUmidita', @oraMinUmidita as 'oraMinUmidita', FORMAT(@mediaUmidita,1) as 'umiditaMedia', @maxPressione as 'maxPressione', @oraMaxPressione as 'oraMaxPressione', @minPressione as 'minPressione', @oraMinPressione as 'oraMinPressione', FORMAT(@mediaPressione,1) as 'pressioneMedia', @maxVelocitaVento as 'maxVelocitaVento', @oraMaxVelocitaVento as 'oraMaxVelocitaVento', @minVelocitaVento as 'minVelocitaVento', @oraMinVelocitaVento as 'oraMinVelocitaVento', FORMAT(@mediaVelocitaVento,1) as `mediaVelocitaVento`, @direzioneMaxVento as 'direzioneMaxVento', @pioggiaGiornaliera as 'pioggiaGiornaliera';");
        $db->commit();

        return $result[0];
    }*/

    function getWeekData($db, $giorno){
        $dataSelezionata = new DateTime($giorno);
        $year = $dataSelezionata->format("Y");
        $endDate = $dataSelezionata->format('Y-m-d');
        $stessoGiornoSettimanaPrecedente = $dataSelezionata->sub(DateInterval::createFromDateString("7 day"));
        $startDate = $stessoGiornoSettimanaPrecedente->format('Y-m-d');

        $sql = <<<q
        SELECT  d.data, 
                MAX(d.tempOut) as 'maxTemperatura', 
                MIN(d.tempOut) as 'minTemperatura', 
                ROUND(AVG(d.tempOut),1) as 'temperaturaMedia', 
                MAX(d.outHum) as 'maxUmidita', MIN(outHum) as 'minUmidita', 
                ROUND(AVG(d.outHum),1) as 'umiditaMedia', 
                MAX(d.bar) as 'maxPressione', MIN(bar) as 'minPressione', 
                ROUND(AVG(d.bar),1) as 'pressioneMedia', 
                MAX(d.windSpeed) as 'maxVelocitaVento', 
                MIN(d.windSpeed) as 'minVelocitaVento', 
                ROUND(AVG(d.windSpeed),1) as 'mediaVelocitaVento', 
                SUM(d.rain) as 'pioggiaGiornaliera' 
        FROM (
            SELECT DATE(data) as 'data', tempOut, outHum, bar, windSpeed, rain
            FROM y$year
            WHERE DATE(data) >= '$startDate' AND DATE(data) <=  '$endDate'
        ) as d
        GROUP BY d.data 
        ORDER BY d.data ASC;
        q;

        $result = $db->query($sql);

        $rilevazioni = [];
        $dataCorrente = new DateTime($startDate);
        $indice = 0;
        for($i=0; $i<8; ++$i){
            if(isset($result[$indice]) && ($result[$indice]['data'] == $dataCorrente->format('Y-m-d')) ){
                $rilevazioni[] = $result[$indice];
                ++$indice;
            }else{
                $rilevazioni[] = [
                    'data'=>$dataCorrente->format('Y-m-d'),
                    'maxTemperatura'=>null, 
                    'minTemperatura'=>null, 
                    'temperaturaMedia'=>null, 
                    'maxUmidita'=>null,
                    'minUmidita'=>null, 
                    'umiditaMedia'=>null, 
                    'maxPressione'=>null,
                    'minPressione'=>null, 
                    'pressioneMedia'=>null, 
                    'maxVelocitaVento'=>null, 
                    'minVelocitaVento'=>null, 
                    'mediaVelocitaVento'=>null, 
                    'pioggiaGiornaliera'=>null            
                ];
            }
            $dataCorrente->modify('+1 day');
            
            if( !isset($rilevazioni[$i]) ){
                echo "La riga $i non esiste<br>";
            }
            
        }

        return $rilevazioni;
    }

    function getRilevazioniGiornaliere($db, $giorno){
        $date = new DateTime($giorno);
        $year = $date->format("Y");
        $result =  $db->query("SELECT * FROM y$year WHERE DATE(data)='" . $date->format('Y-m-d') . "'");
        return $result;
    }

    function getLast30DayData($db, $giorno){

        $dataSelezionata = new DateTime($giorno);
        $endDate = $dataSelezionata->format('Y-m-d');
        $year = $dataSelezionata->format("Y");
        $rilevazioni = [];
        
        $trentaGiorniPrima = $dataSelezionata->sub(DateInterval::createFromDateString("30 day"));
        $startDate = $trentaGiorniPrima->format('Y-m-d');

        $sql = <<<q
        SELECT  d.data, 
                MAX(d.tempOut) as 'maxTemperatura', 
                MIN(d.tempOut) as 'minTemperatura', 
                ROUND(AVG(d.tempOut),1) as 'temperaturaMedia', 
                MAX(d.outHum) as 'maxUmidita', MIN(outHum) as 'minUmidita', 
                ROUND(AVG(d.outHum),1) as 'umiditaMedia', 
                MAX(d.bar) as 'maxPressione', MIN(bar) as 'minPressione', 
                ROUND(AVG(d.bar),1) as 'pressioneMedia', 
                MAX(d.windSpeed) as 'maxVelocitaVento', 
                MIN(d.windSpeed) as 'minVelocitaVento', 
                ROUND(AVG(d.windSpeed),1) as 'mediaVelocitaVento', 
                SUM(d.rain) as 'pioggiaGiornaliera' 
        FROM (
            SELECT DATE(data) as 'data', tempOut, outHum, bar, windSpeed, rain
            FROM y$year
            WHERE DATE(data) >= '$startDate' AND DATE(data) <=  '$endDate'
        ) as d
        GROUP BY d.data 
        ORDER BY d.data ASC;
        q;

        $result = $db->query($sql);
        
        $dataCorrente = new DateTime($startDate);
        $indice = 0;
        for($i=0; $i<31; ++$i){
            if(isset($result[$indice]) && ($result[$indice]['data'] == $dataCorrente->format('Y-m-d')) ){
                $rilevazioni[] = $result[$indice];
                ++$indice;
            }else{
                $rilevazioni[] = [
                    'data'=>$dataCorrente->format('Y-m-d'),
                    'maxTemperatura'=>null, 
                    'minTemperatura'=>null, 
                    'temperaturaMedia'=>null, 
                    'maxUmidita'=>null,
                    'minUmidita'=>null, 
                    'umiditaMedia'=>null, 
                    'maxPressione'=>null,
                    'minPressione'=>null, 
                    'pressioneMedia'=>null, 
                    'maxVelocitaVento'=>null, 
                    'minVelocitaVento'=>null, 
                    'mediaVelocitaVento'=>null, 
                    'pioggiaGiornaliera'=>null            
                ];
            }
            $dataCorrente->modify('+1 day');
            
            if( !isset($rilevazioni[$i]) ){
                echo "La riga $i non esiste<br>";
            }
            
        }
        return $rilevazioni;
    }

    function getMonthData($db, $year, $month){
        
        $oggi = new DateTime();
        $rilevazioni = [];
        $giorniMese = -1;
        if((int)($oggi->format('Y')) == $year && (int)($oggi->format('m')) == $month){
            $giorniMese = (int)($oggi->format('d'));
        }else{
            switch($month){
                case 11:
                case 4:
                case 6:
                case 9:{
                    $giorniMese = 30;
                    break;
                }
                case 2:{
                    $giorniMese = 28;
                    break;
                }
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:{
                    $giorniMese = 31;
                    break;
                }    
                default:{
                    die("Errore critico nel calcolo dei giorni del mese corrente");
                }
            }          
        }
        
        $endDate = (new DateTime("$year-$month-$giorniMese"))->format('Y-m-d');
        $rilevazioni = [];
        
        $primoDelMese = new DateTime("$year-$month-1");
        $startDate = $primoDelMese->format('Y-m-d');

        $sql = <<<q
        SELECT  d.data, 
                MAX(d.tempOut) as 'maxTemperatura', 
                MIN(d.tempOut) as 'minTemperatura', 
                ROUND(AVG(d.tempOut),1) as 'temperaturaMedia', 
                MAX(d.outHum) as 'maxUmidita', MIN(outHum) as 'minUmidita', 
                ROUND(AVG(d.outHum),1) as 'umiditaMedia', 
                MAX(d.bar) as 'maxPressione', MIN(bar) as 'minPressione', 
                ROUND(AVG(d.bar),1) as 'pressioneMedia', 
                MAX(d.windSpeed) as 'maxVelocitaVento', 
                MIN(d.windSpeed) as 'minVelocitaVento', 
                ROUND(AVG(d.windSpeed),1) as 'mediaVelocitaVento', 
                SUM(d.rain) as 'pioggiaGiornaliera' 
        FROM (
            SELECT DATE(data) as 'data', tempOut, outHum, bar, windSpeed, rain
            FROM y$year
            WHERE DATE(data) >= '$startDate' AND DATE(data) <=  '$endDate'
        ) as d
        GROUP BY d.data 
        ORDER BY d.data ASC;
        q;

        $result = $db->query($sql);
        
        $dataCorrente = new DateTime($startDate);
        $indice = 0;
        for($i=0; $i<$giorniMese; ++$i){
            if(isset($result[$indice]) && ($result[$indice]['data'] == $dataCorrente->format('Y-m-d')) ){
                $rilevazioni[] = $result[$indice];
                ++$indice;
            }else{
                $rilevazioni[] = [
                    'data'=>$dataCorrente->format('Y-m-d'),
                    'maxTemperatura'=>null, 
                    'minTemperatura'=>null, 
                    'temperaturaMedia'=>null, 
                    'maxUmidita'=>null,
                    'minUmidita'=>null, 
                    'umiditaMedia'=>null, 
                    'maxPressione'=>null,
                    'minPressione'=>null, 
                    'pressioneMedia'=>null, 
                    'maxVelocitaVento'=>null, 
                    'minVelocitaVento'=>null, 
                    'mediaVelocitaVento'=>null, 
                    'pioggiaGiornaliera'=>null            
                ];
            }
            $dataCorrente->modify('+1 day');
            
            if( !isset($rilevazioni[$i]) ){
                echo "La riga $i non esiste<br>";
            }
            
        }
        return $rilevazioni;
        
    }

    function getYearsReport($db, $year){
        $rilevazioni = [];
        $years = [$year, $year-1, $year-2, $year-3, $year-4];
        $sql = "";
        $result = [];
        for($i=0; $i<count($years); ++$i){
            $sql = <<<q
            SELECT  d.year as 'anno', 
                    MAX(d.tempOut) as 'maxTemperatura', 
                    MIN(d.tempOut) as 'minTemperatura', 
                    ROUND(AVG(d.tempOut),1) as 'temperaturaMedia', 
                    MAX(d.outHum) as 'maxUmidita', MIN(outHum) as 'minUmidita', 
                    ROUND(AVG(d.outHum),1) as 'umiditaMedia', 
                    MAX(d.bar) as 'maxPressione', MIN(bar) as 'minPressione', 
                    ROUND(AVG(d.bar),1) as 'pressioneMedia', 
                    MAX(d.windSpeed) as 'maxVelocitaVento', 
                    MIN(d.windSpeed) as 'minVelocitaVento', 
                    ROUND(AVG(d.windSpeed),1) as 'mediaVelocitaVento', 
                    SUM(d.rain) as 'pioggiaGiornaliera' 
            FROM (
                SELECT YEAR(data) as 'year', tempOut, outHum, bar, windSpeed, rain
                FROM y$years[$i]
            ) as d
            GROUP BY d.year;        
            q;
            try{
                $reportAnno = $db->query($sql);                
                //print_r($reportAnno[0]);
                $result[] = $reportAnno[0];
            }catch(PDOException $e){
                // CODICE: La tabella richiesta non esiste!
                //echo "Exception code: " . $e->getCode();
                if($e->getCode() == "42S02"){
                    $result[] = [
                        'anno'=> $years[$i],
                        'maxTemperatura'=>null, 
                        'minTemperatura'=>null, 
                        'temperaturaMedia'=>null, 
                        'maxUmidita'=>null,
                        'minUmidita'=>null, 
                        'umiditaMedia'=>null, 
                        'maxPressione'=>null,
                        'minPressione'=>null, 
                        'pressioneMedia'=>null, 
                        'maxVelocitaVento'=>null, 
                        'minVelocitaVento'=>null, 
                        'mediaVelocitaVento'=>null, 
                        'pioggiaGiornaliera'=>null            
                    ];
                }else{
                    echo $e->getMessage();
                }
            }
            
        }      
              
        return $result;
        
        
    }


    function getYearReport($db, $year){
        $rilevazioni = [];
        $sql = <<<q
            SELECT  d.year as 'anno',
                    d.month as 'mese', 
                    MAX(d.tempOut) as 'maxTemperatura', 
                    MIN(d.tempOut) as 'minTemperatura', 
                    ROUND(AVG(d.tempOut),1) as 'temperaturaMedia', 
                    MAX(d.outHum) as 'maxUmidita', MIN(outHum) as 'minUmidita', 
                    ROUND(AVG(d.outHum),1) as 'umiditaMedia', 
                    MAX(d.bar) as 'maxPressione', MIN(bar) as 'minPressione', 
                    ROUND(AVG(d.bar),1) as 'pressioneMedia', 
                    MAX(d.windSpeed) as 'maxVelocitaVento', 
                    MIN(d.windSpeed) as 'minVelocitaVento', 
                    ROUND(AVG(d.windSpeed),1) as 'mediaVelocitaVento', 
                    SUM(d.rain) as 'pioggiaGiornaliera' 
            FROM (
                SELECT YEAR(data) as 'year', MONTH(data) as 'month', tempOut, outHum, bar, windSpeed, rain
                FROM y$year
            ) as d
            GROUP BY d.year, d.month;        
            q;
        try{
            $rilevazioni = $db->query($sql);                
            //print_r($reportAnno[0]);            
        }catch(PDOException $e){
            // CODICE: La tabella richiesta non esiste!
            //echo "Exception code: " . $e->getCode();
            if($e->getCode() == "42S02"){
                $rilevazioni = [
                    'anno'=> $year,
                    'tableNotExists'=>true         
                ];
            }else{
                echo $e->getMessage();
            }
        }
             
        return $rilevazioni;
        
        
    }


?>
