var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : 'pickfiles', // 选择文件id标签...
		container: document.getElementById('container'), // ... or DOM Element itself
		url : 'plupload/upload.php',
		flash_swf_url : 'plupload/js/Moxie.swf',
		silverlight_xap_url : 'plupload/js/Moxie.xap',
		
		filters : {
			max_file_size : '777mb',
			mime_types: [
				{title : "Image files", extensions : "jpg,gif,png"},
				{title : "Zip files", extensions : "zip"}
			]
		},
		//是否重命名
		rename: true,
		unique_names:true,

		init: {//以下是各种监听事件
			PostInit: function() {
				document.getElementById('filelist').innerHTML = '';

				document.getElementById('uploadfiles').onclick = function() {
					uploader.start();
					return false;
				};
			},

			FilesAdded: function(up, files) {
				plupload.each(files, function(file) {
					document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
				});
				uploader.start();//开启上传进程
			},

			UploadProgress: function(up, file) {
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			},
			//上传完成之后
			UploadComplete: function(up, file) {
				//删除上传记录
				var f = document.getElementById("filelist"); 
				var childs = f.childNodes; 
				for(var i = childs.length - 1; i >= 0; i--) 
				{  
					f.removeChild(childs[i]); 
				}
				//增加成功记录
				var showImage='';
				for(var i in file){
					showImage+='<div id="' + file.id + '">'+file[i].name+'</div>';
				}
				i=Number(i)+1;
				//ajax获取上传之后文件信息.
				var ajax_response='';
				if (window.XMLHttpRequest)
				  {// code for IE7+, Firefox, Chrome, Opera, Safari
				  xmlhttp=new XMLHttpRequest();
				  }
				else
				  {// code for IE6, IE5
				  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				  }
				xmlhttp.onreadystatechange=function()
				  {
				  if (xmlhttp.readyState==4 && xmlhttp.status==200)
					{
					ajax_response=xmlhttp.responseText.split(',');
					//alert(ajax_response);
					showUploadFile(ajax_response);
					}
				  }
				xmlhttp.open("GET","plupload/ajax_session.php?num="+i,true);
				xmlhttp.send();
				
				function showUploadFile(imgSrc){
					var outputHtml='<div style="width:785px;">';
					for(var k=0;k<imgSrc.length;k++){
						outputHtml+='<div style="width:170px;margin:20px 0 0 20px;float:left;border-style:groove;" id="'+imgSrc[k]+'"><div style="margin:10px;text-align:center;"><img src="'+imgSrc[k]+'" style="max-width:150px;max-height:150px;min-height:150px;"/></div><p style="display:none;"><input type="text" name="imgSrc[]" value="'+imgSrc[k]+'"></p><p style="font-size:10px;text-align:center;margin: 3px 0;">备注:<input type="text" name="imgText[]" size="11"/></p><p style="font-size:10px;text-align:center;margin: 3px 0;">排序:<input type="text" name="imgSort[]" size="11" value="7"/></p><p style="font-size:10px;text-align:center;margin: 3px 0;"><input name="mainpic" type="radio" value="'+imgSrc[k]+'" />主图 <input type="button" name="'+imgSrc[k]+'" onclick="delImg(this)" value="删除"></p></div>';
					}
					outputHtml+='</div><div class="clear"></div><br>';
					
					document.getElementById('filelist').innerHTML+=outputHtml;
					document.getElementById('filelist').innerHTML+='<div style="float:left;">'+i+'个文件已上传完成</div></br>';
				}
			},

			Error: function(up, err) {
				document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
			}
		}
	});
	function delImg(deldiv){
		
		var ajax_response='';
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			ajax_response=xmlhttp.responseText;
			alert(ajax_response);
			}
		  }
		xmlhttp.open("GET","plupload/ajax_session.php?del="+deldiv.name,true);
		xmlhttp.send();
		
		div=deldiv.parentNode.parentNode;
		while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
		{
			div.removeChild(div.firstChild);
		}
		var _parentElement = div.parentNode;
		 if(_parentElement){
		  _parentElement.removeChild(div); 
		 }
		}
	uploader.init();