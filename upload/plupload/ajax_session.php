<?php

session_start();

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");

@set_time_limit(7 * 60);
$back_info='';
$upload_files=array();

	if(($_SERVER['REQUEST_METHOD'] == "GET"))
    {
		if(isset($_GET['num'])&&($_GET['num']!=0)){
			$index_numbers=sizeof($_SESSION['upload_file_path'])-(int)$_GET['num'];
			
			for($i=$index_numbers;$i<sizeof($_SESSION['upload_file_path']);$i++){
				$upload_files[]=$_SESSION['upload_file_path'][$i];
			}
			$back_info=implode(',',$upload_files);
			$back_info=str_replace('../','',$back_info);
			$back_info=str_replace('\\','/',$back_info);
		}elseif(isset($_GET['del'])){ 
				$result = @unlink ('../'.$_GET['del']); 
				if($result == true){
				$back_info="删除成功";
				}
				else{
				$back_info="删除失败";
				}
		}else{
		
			$back_info="ajax_session error!";
		}
	}else{
			$back_info="no upload_file_path ajax_session error!";
		}
echo $back_info;