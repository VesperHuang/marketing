Marketing.CollectList=(function(){
    var viewModel = kendo.observable({
      branch:"",
			childrenAge:"",
			childrenName:"",
			childrenSex:"M",
			mobile:$("#collectlist-mobile").val(),
			verifycode:"",
			typeverifycode:$("#collectlist-typeverifycode").val(),
			message:"",
			isMessageClearn:false,
			getverifycode:function()
			{
				if($("#collectlist-mobile").val()!= ""){
  				var options = {
          	 //20151013 Monica 验证手机 以学校为单位  
          	 //url: Marketing.configuration.marketingUrl + "getVerifyCode/" + this.mobile,
          	 url: Marketing.configuration.marketingUrl + "getVerifyCode/" + $("#collectlist-branch_id").val() + "|" + this.mobile,
             requestType: "GET",
             dataType: "JSON",
             callBack: this.fnGetCodeCallBack				
  				};
  				Marketing.dataAccess.callService(options);					
				}
				else{
          viewModel.set("message", "请填手机号码！！");
          $("#collectlist-message").data("kendoMobileModalView").open();						
				}
			},
		
      onSelect: function(e) {
          var buttonGroup = e.sender;
          var index = buttonGroup.current().index();
          
          if(index == 0){
						viewModel.set("childrenSex", "M");
          }
          else{
						viewModel.set("childrenSex", "F");
          }
      },			

      //method for user login
      fnGetCodeCallBack: function (result) {
          if (result.success === true) {
              viewModel.set("verifycode", result.data.VerifyCode);
              viewModel.set("message", result.data.Message);
          } else {
              viewModel.set("verifycode", "");
              viewModel.set("message", result.data.Message);
          }
          viewModel.set("isMessageClearn", false); 
					$("#collectlist-message").data("kendoMobileModalView").open();	
      },
			ClearnViewModel:function()
			{
  				viewModel.set("childrenAge", "");
  				viewModel.set("childrenName", "");
  				viewModel.set("childrenSex", "M");
  				viewModel.set("mobile", "");
  				viewModel.set("verifycode", "");
  				viewModel.set("typeverifycode", "");
  				viewModel.set("message", "");
  				viewModel.set("isMessageClearn", false);				
			},

      fnPostCallBack: function (result) {
          if (result.data.Message === "true") {
              $("#collectlist-lufylegend").data("kendoMobileModalView").open();	
          } else {
              viewModel.set("message", "储存失败！！");
              $("#collectlist-message").data("kendoMobileModalView").open();	
          }	
      },
      
      submit:function(){
      	var sex = viewModel.get("childrenSex");
      	
      	console.log("collectlist-childrenSex:" + sex);
      	
      	
				 var msg="";
         var validatable = $("#myform").kendoValidator({
            rules: {
               customRule1: function(input){
               return $.trim(input.val()) !== "";
              }       
            },
            messages: {
               customRule1: "All fields are required"          
            },
            errorTemplate: "<span style='color:red'>※必填</span>"
          }).data("kendoValidator");
  
  				var flag = validatable.validate()
  				
  				if(flag === true){
           		this.verifycod = viewModel.get("verifycod");
            	this.typeverifycode = viewModel.get("typeverifycode");
            	
            	$("#myform").removeClass("invalid");
  						$("#myform").addClass("valid");
            	
            	console.log("branch:" + viewModel.get("branch"));
            	
            	if(this.verifycode == this.typeverifycode){
            			var options = {
                   	  url: Marketing.configuration.marketingUrl + "CollectListInsert/",
                      requestType: "POST",
                      dataType: "JSON",
                      data: {
                     		Branch: $("#collectlist-branch_id").val(),
                       	ChildrenAge: viewModel.get("childrenAge"),
                       	ChildrenName: viewModel.get("childrenName"),
                       	ChildrenSex: viewModel.get("childrenSex"),
                       	Mobile: viewModel.get("mobile")                     	
                       },                   
                       callBack: this.fnPostCallBack				
            			};          	
              		Marketing.dataAccess.callService(options);
            	}
            	else{
      					viewModel.set("message", "验证码不符!!");
      					$("#collectlist-message").data("kendoMobileModalView").open();	
            	}
            	viewModel.set("isMessageClearn", true);          	
  				}
  				else{
  				    $("#myform").removeClass("valid");
  						$("#myform").addClass("invalid");
  				}
      }
    });
    return {
        viewModel: viewModel
    }
})();
