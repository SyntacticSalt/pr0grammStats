<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>>_ pr0gramm Tag Statistiken</title>
<link type="text/css" rel="stylesheet" href="style.css">
</head>

<body>
<h1>
<span>pr0gramm</span> Tag Statistiken
</h1>
<h2>
v. 0.15
</h2>
<form action="/pr0gramm/" method="get">
<fieldset>
<input type="radio" id="tags" class="radio" name="search" value="tags" <?php if($_GET['search'] != "user"){ echo "checked";}?>><label for="tags">Tags</label>
<input type="radio" id="user" class="radio" name="search" value="user" <?php if($_GET['search'] == "user"){ echo "checked";}?>><label for="user">User</label>
</fieldset>
<input type="text" maxlength="256" name="tag" placeholder="wörk, kevin, kadse, kefer, etc." value="<?php if(!empty($_GET['tag'])){ echo $_GET['tag']; }?>" class="searchbox">
<input type="submit" value="Tag suchen" class="submit">
</form>
<script>
var upTotal= 0;
var downTotal= 0;
var promoted=0;
</script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<?php
$tag = $_GET['tag'];
$getStats = function($tag)
{
	
	$tagData = file_get_contents('http://pr0gramm.com/api/items/get?tags='.$tag); 
	if(settype($tagData, "string")){
		$trimmed_start= preg_replace('/\{\".*"items":\[(.*)\],"ts".*/',"$1", $tagData, 1);
		$trimmed_both = preg_replace('/\],"ts"(.*)/',"", $trimmmed_start, 1);
     if(!empty($trimmed_start)){
		return $trimmed_start;
}else{
  $notfound = 'ZOMG 404';
  return $notfound;
}
	}else{
		echo "Error converting var";
	}
};
if(!empty($tag)){
$replaced = str_replace("},{", "} #*cut*# {" , $getStats($tag));
if($replaced!='ZOMG 404'){
$arrays = explode("#*cut*#", $replaced);
echo '<script>';
$counter = 0;
for($i=0;$i<=count($arrays)-1;$i++)
{
   
	echo 'var tagData'. $i . ' = ' . $arrays[$i] . ';';
	echo "\n";
	echo 'upTotal += tagData'. $i . '["up"];';
	echo 'downTotal += tagData'. $i . '["down"];';
	$counter++;
echo 'if(tagData'. $i .'["promoted"] !== 0){
             promoted++;
            }';
	//echo 'document.write(tagData'.$i.'.up + "<br>");';
	//echo "\n";
}
echo "\n";
echo 'var countOfArrays ='. $counter. ';';
echo "\n";
echo '</script>';
}
}

?>
<script src="jsonParse.min.js"></script>
<script src="stats.js">
</script>
<br/>
<a href="/pr0gramm/technik/">Wie berechnen wir diese Werte?</a>
</body>
</html>
