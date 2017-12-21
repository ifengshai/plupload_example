<?php 
	session_start();
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<title>Plupload - Form dump</title>
</head>
<body style="font: 13px Verdana; background: #eee; color: #333">
<?php 
$images_list = '';
if(count($_POST['imgSort']) > 0) { 
	array_multisort($_POST['imgSort'],$_POST['imgText'],$_POST['imgSrc']);
	for($i=0;$i<count($_POST['imgSrc']);$i++){
		$_POST['imgSrc'][$i]=str_replace('../uploadfile/products/','',$_POST['imgSrc'][$i]);
		if($_POST['mainpic']){
			$_POST['mainpic']=str_replace('../uploadfile/products/','',$_POST['mainpic']);
			if($_POST['imgSrc'][$i]==$_POST['mainpic']){
				$products_image=$_POST['imgSrc'][$i];
			}
		}else{
			if($i==0){
				$products_image=$_POST['imgSrc'][$i];
			}
		}
		$imgtext=$_POST['imgText'][$i];
		$imgurl=$_POST['imgSrc'][$i];
		$img_sort=$_POST['imgSort'][$i];
		$images_list .= "$imgtext::$imgurl::$img_sort||";
	}
}

?>
<h1>Post dump</h1>

<p><?php echo $images_list;?></p>

<pre>
<?php var_dump($_POST); echo "<hr>";?>
</pre>
<table>
	<tr>
		<th>Name</th>
		<th>Value</th>
	</tr>
	<?php $count = 0; foreach ($_POST as $name => $value) { ?>
	<tr class="<?php echo $count % 2 == 0 ? 'alt' : ''; ?>">
		<td><?php echo htmlentities(stripslashes($name)) ?></td>
		<td><?php echo nl2br(htmlentities(stripslashes($value))) ?></td>
	</tr>
	<?php } ?>
</table>
<?php ?>
</body>
</html>
