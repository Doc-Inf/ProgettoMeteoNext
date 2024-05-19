<?php     
        require_once 'functions.php';
        $lastDataDay = getLastDay($db);
        $res = getData($db, $lastDataDay);
        echo json_encode($res);
        //$endDate = $lastDataDay;
       
    ?>    
