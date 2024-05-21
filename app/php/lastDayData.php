<?php     
        require_once 'functions.php';
        $lastDataDay = getLastDay($db);
        $res = getData($db, $lastDataDay);

        header('Content-type: application/json');
        echo json_encode($res);
       
    ?>    
