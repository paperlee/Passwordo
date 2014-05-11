var Key = require("key");
var fb = require('facebook');

//Master View Component Constructor
function MasterView() {
	var key = new Key();
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(){
		var TokenResponse = this.responseText;
		var TokenArray = TokenResponse.split('=');
		var token = TokenArray[1];
		if (token != ''){
			// TODO:Read public feed by using token
			//Ti.API.log('token: '+token);
			getFeed(token);
		}
	};
	
	xhr.open('GET','https://graph.facebook.com/oauth/access_token?client_id='+key.appid+'&client_secret='+key.appsid+'&grant_type=client_credentials');
	xhr.send();
	
	
	
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});

	//some dummy data for our table view
	var tableData = [
		{title:'Apples', price:'1.25', hasChild:true, color: '#000'},
		{title:'Grapes', price:'1.50', hasChild:true, color: '#000'},
		{title:'Oranges', price:'2.50', hasChild:true, color: '#000'},
		{title:'Bananas', price:'1.50', hasChild:true, color: '#000'},
		{title:'Pears', price:'1.40', hasChild:true, color: '#000'},
		{title:'Kiwis', price:'1.00', hasChild:true, color: '#000'}
	];

	var table = Ti.UI.createTableView({
		data:tableData
	});
	self.add(table);

	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			price:e.rowData.price
		});
	});
	
	function getFeed(token){
		fb.requestWithGraphPath(''+key.pageid+'/feed',{access_token:token},'GET',function(e){
			if (e.success){
				Ti.API.log('Read FB page success: '+e.result);
			} else {
				if (e.error){
					alert(e.error);
				} else {
					alert('Unknown error');
				}
			}
		});
	}
	
	return self;
};

module.exports = MasterView;