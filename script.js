jQuery(document).ready(function($) {
	var iduser=null;
	$("#ok").click(function(){
		var nameuser=$('#name').val();
		var ageuser=$('#age').val();
		var salaryuser=$('#salary').val();
		var obj={
			name:nameuser,
			age:ageuser,
			salary:salaryuser
		}
		if($(this).val()=='update user')
		obj.id=iduser;

		$.post('/send',obj,function(data){
		$("#name").val("");
		$("#age").val("");
		$("#salary").val("");
		console.log(data);
		getUsers();
		
		})
		$(this).val("Send")
	});

	function createTable(mas,container){
		$(container).empty();
		$("<table>").addClass("table").appendTo(container);
		$("<tr class='headtr'>").appendTo('.table');
		// $("<td class='headtd'>").text("Id").appendTo('.headtr');
		$("<td class='headtd'>").text("Name").appendTo('.headtr');
		$("<td class='headtd'>").text("Age").appendTo('.headtr');
		$("<td class='headtd'>").text("Salary").appendTo('.headtr');
		$("<td class='headtd'>").appendTo('.headtr');
		$("<td class='headtd'>").appendTo('.headtr');
		// $("<td class='headtd'>").appendTo('.headtr');
		for(var i=0; i<mas.length;i++){
			$("<tr class='tr'>").appendTo(".table");
			for(var key in mas[i]){
				$("<td class='td'>").appendTo('.tr:last').text(mas[i][key]);


			}
			for(var j=1; j<=2;j++){
				$("<td>").appendTo('.tr:last');
				var btn=$("<button>");
				if(j==1){
					btn.text("Delete").addClass("delete");
						}
				else{
					btn.text("Update").addClass("update");
				}
				$(".table .tr td:last").append(btn)

			};
			$(".tr:last").find('.td').first().hide();
			$(".tr:last").find('.td').eq(4).hide();
			
		}
		$(".delete").click(function(){
			var id=$(this).parent().parent().children(":first").text();
			console.log(id);
			var obj={id:id};
			$.post('/delete', obj,function(data){
				console.log(data)
			})
			getUsers();
		});
		$(".update").click(function(){
			var tds=$(this).parent().parent().children();
			var name=$(tds[1]).text();
			$("#name").val(name);
			var age=$(tds[2]).text();
			$("#age").val(age);
			var salary=$(tds[3]).text();
			$("#salary").val(salary);
			$("#ok").val('update user')
			iduser=$(tds[0]).text()
			console.log(iduser);
			

			
			
			

		})
		$(".headtr").click(function(event){
		var targetval=$(event.target).text().toLowerCase();
		console.log(targetval);
		sort(mas,targetval);

		createTable(mas,"#mastable");

		
		})
		}
	function sort(data,prop){
		data.sort(function(a,b){
			if(a[prop]<b[prop])
				return 1;
			    return -1;
		})
	}

	function getUsers(){
		$.get('/allusers', function(data){
			console.log(data);
			// var container=$("#mastable")
			createTable(data,"#mastable");
		})
	};
	getUsers();
});